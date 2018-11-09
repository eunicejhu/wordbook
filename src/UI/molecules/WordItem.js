import React, { Component } from "react";
import ReactImageFallback from "react-image-fallback";
import { IMG_FAILURE_LOADING } from "../../constants";
import "./WordItem.css";

class WordItem extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    let { index } = this.props;
    setTimeout(() => {
      this.setState({
        show: true
      });
    }, index * 100);
  }

  render() {
    let { show } = this.state;
    let { word, oxford_dic, label } = this.props.item;
    let { showImage, showCategory } = this.props;
    return (
      <a
        href={oxford_dic.link}
        target="_blank"
        title={word}
        className={`item-wrapper ${show ? "show" : ""}`}
      >
        <div className="word">{word}</div>
      </a>
    );
  }
}

export default WordItem;
