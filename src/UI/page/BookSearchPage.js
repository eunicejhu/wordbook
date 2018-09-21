import React, { Component } from "react";
import SearchPanelContainer from "../../containers/SearchPanelContainer";
import ResultPanel from "../organisms/ResultPanel";

import "./BookSearchPage.css";

class BookSearchPage extends Component {
  render() {
    return (
      <div className="book-search-page">
        <SearchPanelContainer />
        <ResultPanel />
      </div>
    );
  }
}

export default BookSearchPage;
