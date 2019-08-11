import axios from "axios";

// Request to fetch all tweets.
export const getTweets = () => {
  return axios.get("/api/tweets");
};

// Request to fetch a specified tweet.
export const getTweet = id => {
  return axios.get(`/api/tweets/${id}`);
};

// Request to fetch all tweets of a specific user.
export const getUserTweets = id => {
  return axios.get(`/api/tweets/user/${id}`);
};

// Request to post tweet.
export const writeTweet = data => {
  return axios.post("/api/tweets/", data);
};
