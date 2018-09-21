import React, { Component } from "react";
import { connect } from "react-redux";
import WordItem from "../molecules/WordItem";
import Pagination from "../atoms/Pagination";
import "./ResultPanel.css";

class ResultPanel extends Component {
  render() {
    let { words } = this.props;
    let renderSearchResult =
      words &&
      words.map((item, index) => (
        <WordItem key={index} index={index} item={item} />
      ));
    return (
      <div className="resultpanel-wrapper">
        <div className="result">{renderSearchResult}</div>
        <div>{/* <Pagination pages={50} current={1} /> */}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  words: state.reducer.words
});

export default connect(mapStateToProps)(ResultPanel);
