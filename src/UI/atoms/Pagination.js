import React, { Component } from "react";
import PropTypes from "prop-types";
import ArrowLeft from "../atoms/ArrowLeft";
import ArrowRight from "../atoms/ArrowRight";
import "./Pagination.css";

import { initArrayByLength } from "../../utils/initArrayByLength";

const MAX_VISIBLE_PAGES = 8;
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.current,
      pages: props.pages
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps });
  }

  getVisiblePages = () => {
    let { current, pages } = this.state;
    var visiblePages;
    if (pages < MAX_VISIBLE_PAGES) {
      visiblePages = initArrayByLength(pages).map((item, index) => index);

      return visiblePages;
    }

    if (current <= MAX_VISIBLE_PAGES / 2) {
      visiblePages = initArrayByLength(MAX_VISIBLE_PAGES).map(
        (item, index) => index
      );
    } else if (current > pages - MAX_VISIBLE_PAGES / 2 - 1) {
      visiblePages = initArrayByLength(MAX_VISIBLE_PAGES)
        .map((item, index) => pages - 1 - index)
        .reverse();
    } else {
      let precedentIncludeCurrentArray, latterExcludeCurrentArray;
      precedentIncludeCurrentArray = initArrayByLength(
        MAX_VISIBLE_PAGES / 2 + 1
      )
        .map((item, index) => current - index)
        .reverse();
      latterExcludeCurrentArray = initArrayByLength(
        MAX_VISIBLE_PAGES / 2 - 1
      ).map((item, index) => current + index + 1);

      visiblePages = precedentIncludeCurrentArray.concat(
        latterExcludeCurrentArray
      );
    }
    return visiblePages;
  };

  onClickPrevHandler = () => {
    let { action } = this.props;

    this.setState(prevState => {
      action(prevState.current - 1);
      return { current: prevState.current - 1 };
    });
  };

  onClickNextHandler = () => {
    let { action } = this.props;

    this.setState(prevState => {
      action(prevState.current + 1);
      return { current: prevState.current + 1 };
    });
  };

  onClickPageHandler = page => {
    let { action } = this.props;
    console.log("onClickPageHandler", { page });
    this.setState(prevState => {
      action(page);
      return { current: page };
    });
  };

  render() {
    let { pages, action } = this.props;
    let { current } = this.state;
    var renderVisiblePages, hasPrevious, hasNext;

    renderVisiblePages = this.getVisiblePages().map((page, index) => (
      <a
        key={index}
        onClick={
          current != page
            ? () => {
                this.onClickPageHandler(page);
              }
            : () => {}
        }
        className={`page ${current === page ? "current" : ""}`}
      >
        {page + 1}
      </a>
    ));

    hasPrevious = pages > MAX_VISIBLE_PAGES && current > 0;
    hasNext = pages > MAX_VISIBLE_PAGES && current < pages - 1;

    return (
      <div className="pagination-wrapper">
        {hasPrevious && (
          <div className="arrow" onClick={this.onClickPrevHandler}>
            {" "}
            <ArrowLeft />
          </div>
        )}
        <div className="pages-wrapper">{renderVisiblePages}</div>
        {hasNext && (
          <div className="arrow" onClick={this.onClickNextHandler}>
            <ArrowRight />
          </div>
        )}
      </div>
    );
  }
}
export default Pagination;

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired
};
