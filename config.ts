import axios from 'axios';

export const Backend = {
  baseURL: 'https://api-engtalk.sonetstudio.org',
  socketURL: 'wss://api-engtalk.sonetstudio.org',

  get signinURL() {
    return `${this.baseURL}/user/signin`;
  },
  get signupURL() {
    return `${this.baseURL}/user/signup`;
  },
  get searchURL() {
    return `${this.baseURL}/user/search`;
  },

  get updateProfileURL() {
    return `${this.baseURL}/user/update`;
  },
  get userInfo() {
    return `${this.baseURL}/user/info`;
  },
  get statURL() {
    return `${this.baseURL}/stat`;
  },
  get premiumCallURL() {
    return `${this.baseURL}/stat/premiumcall`;
  },

  get userPost() {
    return `${this.baseURL}/post/userpost`;
  },
  get followUserURL() {
    return `${this.baseURL}/user/follow`;
  },
  get allPost() {
    return `${this.baseURL}/post/allpost`;
  },
  get leaderBoard() {
    return `${this.baseURL}/user/leaderboard`;
  },
  get uploadPost() {
    return `${this.baseURL}/post/upload`;
  },

  get instaCall() {
    return `${this.socketURL}/instaCall`;
  },
  get notificationSocket() {
    return `${this.socketURL}/notification`;
  },

  get iceServerURL() {
    return `${this.baseURL}/iceserver`;
  },
  get public() {
    return `${this.baseURL}/public`;
  },
  get sendMessageURL() {
    return `${this.baseURL}/message/send`;
  },
  get inboxURL() {
    return `${this.baseURL}/message/inbox`;
  },
  get conversationURL() {
    return `${this.baseURL}/message/conversation`;
  },
};

export const getIcServer = async (authToken: string) => {
  try {
    const res = await axios(Backend.iceServerURL, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
