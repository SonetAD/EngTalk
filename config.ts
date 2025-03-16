import axios from 'axios';

export const Backend = {
  baseURL: 'https://qcgs8t75-3000.asse.devtunnels.ms',
  get signinURL() {
    return `${this.baseURL}/user/signin`;
  },
  get signupURL() {
    return `${this.baseURL}/user/signup`;
  },
  get userInfo() {
    return `${this.baseURL}/user/info`;
  },
  get statURL() {
    return `${this.baseURL}/stat`;
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
    return `${this.baseURL}/instaCall`;
  },
  get iceServerURL() {
    return `${this.baseURL}/iceserver`;
  },
  get public() {
    return `${this.baseURL}/public`;
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
