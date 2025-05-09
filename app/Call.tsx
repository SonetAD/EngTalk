import React, { useEffect, useState, useRef, useCallback } from 'react';
import FullScreenView from '@/components/FullScreenView';
import {
  RTCPeerConnection,
  mediaDevices,
  RTCIceCandidate,
  RTCSessionDescription,
  MediaStream,
} from 'react-native-webrtc';
import Socket from '@/libs/Socket';
import SearchingPartner from '@/components/SearchingPartner';
import FoundPartner from '@/components/FoundPartner';
import getUserInfo from '@/libs/api/userInfo';
import StartConversation from '@/components/StartConversation';
import { router } from 'expo-router';
import ErrorAlert from '@/components/ErrorAlert';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import getIcServer from '@/libs/api/getIceServer';
import { useKeepAwake } from 'expo-keep-awake';

const Call = () => {
  useKeepAwake();
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
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const timerRef = useRef(0);
  const findMatchIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const targetUserSocketIdRef = useRef<string | null>(null);
  const pendingIceCandidatesRef = useRef<RTCIceCandidate[]>([]);

  const createPeerConnection = async () => {
    const { iceServers } = await getIcServer(token);
    const pc = new RTCPeerConnection({ iceServers });

    pc.addEventListener('icecandidate', (event) => {
      if (event.candidate) {
        Socket.emit('iceCandidate', {
          targetSocketId: targetUserSocketIdRef.current,
          candidate: event.candidate,
        });
      }
    });

    pc.addEventListener('track', (event) => {
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
      }
    });

    pc.addEventListener('iceconnectionstatechange', () => {
      if (['failed', 'disconnected'].includes(pc.iceConnectionState)) {
        endCall();
      }
    });

    return pc;
  };

  const startLocalStream = async () => {
    try {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      localStreamRef.current = stream;
      stream.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, stream);
      });
    } catch (error) {
      console.error('Error starting local stream:', error);
    }
  };

  const initiateCall = async (targetSocketId: string, role: string) => {
    if (!peerConnectionRef.current || role !== 'caller') return;
    const offer = await peerConnectionRef.current.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: false,
      voiceActivityDetection: true,
    });
    await peerConnectionRef.current.setLocalDescription(offer);
    Socket.emit('offer', { targetSocketId, offer });
  };

  const fetchUser = async (matcheduserId: string, matchedSocketId: string) => {
    try {
      const user = await getUserInfo(matcheduserId);
      user.targetSocketId = matchedSocketId;
      setMatchedUserData(user);
    } catch (err) {
      setErrorMessage('Network Error');
      setShowErrorAlert(true);
    }
  };

  const searchPartner = useCallback(() => {
    findMatchIntervalRef.current = setInterval(() => {
      Socket.emit('findMatch', { userId, preferredGender: filteredGender });
    }, 500);

    const matchHandler = async ({ matcheduserId, matchedSocketId }: any) => {
      if (findMatchIntervalRef.current) {
        clearInterval(findMatchIntervalRef.current);
        findMatchIntervalRef.current = null;
      }
      await fetchUser(matcheduserId, matchedSocketId);
    };

    Socket.on('matchFound', matchHandler);

    return () => {
      if (findMatchIntervalRef.current) {
        clearInterval(findMatchIntervalRef.current);
      }
      Socket.off('matchFound', matchHandler);
    };
  }, [userId, filteredGender]);

  const acceptCall = () => {
    setIsLoading(true);
    Socket.emit('acceptCall');
  };

  const skipCall = () => {
    Socket.emit('rejectCall');
  };

  const cancelCall = () => {
    Socket.emit('rejectCall');
    Socket.emit('cancelCall');
    router.replace('/Home');
  };

  const stopSearching = () => {
    router.replace('/Home');
  };

  const endCall = () => {
    setUserStat(timerRef.current);
    Socket.emit('callEnd', { targetSocketId: matchedUserData?.targetSocketId });

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }

    router.replace('/Home');
  };

  const toggleMuteState = () => {
    const audioTrack = localStreamRef.current?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
    }
  };

  const toggleLoudSpeaker = (isLoudSpeaker: boolean) => {
    const audioTrack = remoteStream?.getAudioTracks()[0];
    if (audioTrack && typeof (audioTrack as any)._setVolume === 'function') {
      (audioTrack as any)._setVolume(isLoudSpeaker ? 10.0 : 1.0);
    }
  };

  useEffect(() => {
    (async () => {
      peerConnectionRef.current = await createPeerConnection();
    })();

    return () => {
      if (findMatchIntervalRef.current) {
        clearInterval(findMatchIntervalRef.current);
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        localStreamRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    Socket.emit('join', { userId, gender });

    const handleIceCandidate = async ({ candidate }: any) => {
      if (candidate) {
        try {
          const iceCandidate = new RTCIceCandidate(candidate);
          if (peerConnectionRef.current?.remoteDescription?.type) {
            await peerConnectionRef.current?.addIceCandidate(iceCandidate);
          } else {
            pendingIceCandidatesRef.current.push(iceCandidate);
          }
        } catch (error) {
          console.error('Error adding received ICE candidate:', error);
        }
      }
    };

    const handleOffer = async ({ offer, from }: any) => {
      if (!peerConnectionRef.current) {
        peerConnectionRef.current = await createPeerConnection();
      }
      targetUserSocketIdRef.current = from;
      await startLocalStream();
      await peerConnectionRef.current?.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      for (const candidate of pendingIceCandidatesRef.current) {
        try {
          await peerConnectionRef.current?.addIceCandidate(candidate);
        } catch (error) {
          console.error('Error adding pending ICE candidate:', error);
        }
      }
      pendingIceCandidatesRef.current = [];
      const answer = await peerConnectionRef.current?.createAnswer();
      await peerConnectionRef.current?.setLocalDescription(answer);
      Socket.emit('answer', { targetSocketId: from, answer });
    };

    const handleAnswer = async ({ answer }: any) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(answer)
        );

        for (const candidate of pendingIceCandidatesRef.current) {
          try {
            await peerConnectionRef.current?.addIceCandidate(candidate);
          } catch (error) {
            console.error('Error adding pending ICE candidate:', error);
          }
        }
        pendingIceCandidatesRef.current = [];
      }
    };

    const handleRejectCall = () => {
      setMatchedUserData(null);
      setCallAccepted(false);
      setIsLoading(false);
      searchPartner();
    };

    const handleCallAccepted = async ({ matchedSocketId, role }: any) => {
      targetUserSocketIdRef.current = matchedSocketId;
      await startLocalStream();
      await initiateCall(matchedSocketId, role);
      setCallAccepted(true);
    };

    const handleCallEnd = () => {
      endCall();
    };

    const cleanupSearch = searchPartner();

    Socket.on('iceCandidate', handleIceCandidate);
    Socket.on('offer', handleOffer);
    Socket.on('answer', handleAnswer);
    Socket.on('callRejected', handleRejectCall);
    Socket.on('callAccepted', handleCallAccepted);
    Socket.on('callEnd', handleCallEnd);

    return () => {
      cleanupSearch();
      Socket.off('iceCandidate', handleIceCandidate);
      Socket.off('offer', handleOffer);
      Socket.off('answer', handleAnswer);
      Socket.off('callRejected', handleRejectCall);
      Socket.off('callAccepted', handleCallAccepted);
      Socket.off('callEnd', handleCallEnd);
    };
  }, [searchPartner]);

  return (
    <FullScreenView>
      {!matchedUserData && <SearchingPartner onEnd={stopSearching} />}
      {matchedUserData?.user?._id && !callAccepted && (
        <FoundPartner
          name={matchedUserData.user.name}
          isBlueTicked={matchedUserData.user.isBlueTicked}
          level={matchedUserData.user.level}
          location={matchedUserData.user.location}
          avatar={matchedUserData.user.avatar}
          onAccept={acceptCall}
          onEnd={cancelCall}
          onSkip={skipCall}
          isLoading={isLoading}
        />
      )}
      {matchedUserData && remoteStream && callAccepted && (
        <StartConversation
          name={matchedUserData.user.name}
          isBlueTicked={matchedUserData.user.isBlueTicked}
          level={matchedUserData.user.level}
          location={matchedUserData.user.location}
          userId={matchedUserData.user._id}
          avatar={matchedUserData.user.avatar}
          onEnd={endCall}
          remoteStream={remoteStream}
          toggleMute={toggleMuteState}
          toggleSpeaker={toggleLoudSpeaker}
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
