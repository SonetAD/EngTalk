import React, { useEffect, useState, useRef, useCallback } from 'react';
debugger;
import FullScreenView from '@/components/FullScreenView';
import {
  RTCPeerConnection,
  mediaDevices,
  RTCIceCandidate,
  RTCSessionDescription,
  MediaStream,
} from 'react-native-webrtc';
import { getIcServer } from '@/config';

import Socket from '@/libs/Socket';
import SearchingPartner from '@/components/SearchingPartner';
import FoundPartner from '@/components/FoundPartner';
import getUserInfo from '@/libs/api/userInfo';
import StartConversation from '@/components/StartConversation';
import { router } from 'expo-router';
import ErrorAlert from '@/components/ErrorAlert';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';

const Call = () => {
  const { token, userId, gender, filteredGender, setUserStat } =
    useCentralStore(
      useShallow((state) => ({
        token: state.user.token,
        userId: state.user.userInfo.userId,
        gender: state.user.userInfo.gender,
        filteredGender: state.call.filteredGender,
        setUserStat: state.setUserStat,
      }))
    );

  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [matchedUserData, setMatchedUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [skipCount, setSkipCount] = useState(0);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const timerRef = useRef(0);

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const findMatchIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef=useRef<MediaStream | null>(null);

  useEffect(() => {
    (async () => {
      if (!peerConnectionRef.current) {
        const { iceServers } = await getIcServer(token);

        peerConnectionRef.current = new RTCPeerConnection({ iceServers });
      }
      const pc = peerConnectionRef.current;

      pc.addEventListener('track', (event) => {
        if (event.streams && event.streams[0]) {
          console.log('i am remote')
          console.log(event.streams[0].getAudioTracks());
          remoteStreamRef.current=event.streams[0];
          setRemoteStream(event.streams[0]);
        }
      });
    })();
    return () => {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;

      peerConnectionRef.current?.close();
      peerConnectionRef.current = null;
    };
  }, []);

  useEffect(() => {
    Socket.emit('join', { userId, gender });

    const handleIceCandidate = async ({ candidate }: any) => {
      if (candidate) {
        await peerConnectionRef.current?.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      }
    };

    const handleOffer = async ({ offer, from }: any) => {
      await peerConnectionRef.current?.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnectionRef.current?.createAnswer();
      await peerConnectionRef.current?.setLocalDescription(answer);
      Socket.emit('answer', { targetSocketId: from, answer });

      peerConnectionRef.current?.addEventListener('icecandidate', (event) => {
        if (event.candidate) {
          Socket.emit('iceCandidate', {
            targetSocketId: from,
            candidate: event.candidate,
          });
        }
      });
    };

    const handleAnswer = async ({ from, answer }: any) => {
      await peerConnectionRef.current?.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    };
    const handleRejectCall = () => {
      setMatchedUserData(null);
      setCallAccepted(false);
      // setSkipCount((prevCount) => prevCount + 1);
      setIsLoading(false);
      searchPartner();
    };

    const handleCallAccepted = async ({ matchedSocketId, role }: any) => {
      await startLocalStream();
      await initiateCall(matchedSocketId, role);
      setCallAccepted(true);
    };

    const handleEndCall = () => {
      setUserStat(timerRef.current);
      router.replace('/Home');
    };

    searchPartner();

    // Register event listeners
    Socket.on('iceCandidate', handleIceCandidate);
    Socket.on('offer', handleOffer);
    Socket.on('answer', handleAnswer);
    Socket.on('callRejected', handleRejectCall);
    Socket.on('callAccepted', handleCallAccepted);
    Socket.on('callEnd', handleEndCall);

    return () => {
      Socket.emit('callEnd', {
        targetSocketId: matchedUserData?.targetSocketId,
      });
      Socket.off('iceCandidate', handleIceCandidate);
      Socket.off('offer', handleOffer);
      Socket.off('answer', handleAnswer);
      Socket.off('callRejected', handleRejectCall);
    };
  }, []);
  const searchPartner = useCallback(() => {
    findMatchIntervalRef.current = setInterval(() => {
      Socket.emit('findMatch', { userId, preferredGender: filteredGender });
    }, 500);

    const matchHandler = async ({ matcheduserId, matchedSocketId }: any) => {
      if (findMatchIntervalRef.current) {
        clearInterval(findMatchIntervalRef.current);
        findMatchIntervalRef.current = null;
      }

      fetchUser(matcheduserId, matchedSocketId);
    };

    Socket.on('matchFound', matchHandler);

    return () => {
      if (findMatchIntervalRef.current) {
        clearInterval(findMatchIntervalRef.current);
      }
      Socket.off('matchFound', matchHandler);
    };
  }, [matchedUserData]);

  const startLocalStream = async () => {
    try {
      const constraints = { audio: true, video: false };
      const stream = await mediaDevices.getUserMedia(constraints);
      localStreamRef.current = stream;
      stream
        .getTracks()
        .forEach((track) => peerConnectionRef.current?.addTrack(track, stream));
    } catch (error) {
      console.error('Error starting local stream:', error);
    }
  };

  const fetchUser = async (matcheduserId: string, matchedSocketId: string) => {
    try {
      if (matcheduserId) {
        const user = await getUserInfo(matcheduserId);
        user.targetSocketId = matchedSocketId;
        setMatchedUserData(user);
      }
    } catch (err) {
      setErrorMessage('Network Error');
      setShowErrorAlert(true);
    }
  };

  const initiateCall = async (targetSocketId: string, role: string) => {
    if (!peerConnectionRef.current || role !== 'caller') return;
    const sessionConstraints = {
      mandatory: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: false,
        VoiceActivityDetection: true,
      },
    };
    const offer = await peerConnectionRef.current.createOffer(
      sessionConstraints
    );
    await peerConnectionRef.current.setLocalDescription(offer);
    Socket.emit('offer', { targetSocketId, offer });
  };

  const acceptCall = () => {
    setIsLoading(true);
    Socket.emit('acceptCall');
  };

  const skipCall = () => {
    Socket.emit('rejectCall');
  };

  const endCall = () => {
    setUserStat(timerRef.current);
    Socket.emit('callEnd', { targetSocketId: matchedUserData?.targetSocketId });
    router.replace('/Home');
  };

  const stopSearching = () => {
    router.replace('/Home');
  };
  const cancelCall = () => {
    Socket.emit('rejectCall');
    Socket.emit('cancelCall');
    router.replace('/Home');
  };

  const togleMuteState = () => {
    const audioTrack = localStreamRef.current?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
    }
  };

  const togleLoudSpeaker = (isLoudSpeaker: boolean) => {
    const audioTrack = remoteStream?.getAudioTracks()[0];
    if (isLoudSpeaker) {
      audioTrack?._setVolume(5);
    } else {
      audioTrack?._setVolume(1);
    }
  };


  return (
    <FullScreenView>
      {!matchedUserData && <SearchingPartner onEnd={stopSearching} />}
      {matchedUserData?.user?._id && !callAccepted && (
        <FoundPartner
          name={matchedUserData.user.name}
          level={matchedUserData.user.level}
          avatar={matchedUserData.user.avatar}
          onAccept={acceptCall}
          onEnd={cancelCall}
          onSkip={skipCall}
          isLoading={isLoading}
        />
      )}
      {matchedUserData && remoteStreamRef.current && callAccepted && (
        <StartConversation
          name={matchedUserData.user.name}
          level={matchedUserData.user.level}
          userId={matchedUserData.user._id}
          avatar={matchedUserData.user.avatar}
          onEnd={endCall}
          remoteStream={remoteStreamRef.current}
          toggleMute={togleMuteState}
          toggleSpeaker={togleLoudSpeaker}
          matchedUserData={matchedUserData}
          timerRef={timerRef}
        />
      )}
      <ErrorAlert
        message={errorMessage}
        visibility={showErrorAlert}
        setVisibility={setShowErrorAlert}
      />
    </FullScreenView>
  );
};

export default Call;
