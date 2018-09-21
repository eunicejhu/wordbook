import React, { Component } from "react";
import { connect } from "react-redux";
import BookSearchPage from "./UI/page/BookSearchPage";

class App extends Component {
  render() {
    return <BookSearchPage />;
  }
}

export default connect()(App);
