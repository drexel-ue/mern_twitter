import { connect } from "react-redux";
import { fetchTweets } from "../../actions/tweet_actions";
import Tweets from "./tweets";

const mapStateToProps = ({ entities }) => {
  return {
    tweets: Object.values(entities.tweets.all)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTweets: () => dispatch(fetchTweets())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tweets);
