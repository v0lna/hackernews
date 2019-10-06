import React, { Component } from "react";
import "./App.css";
import axios from "axios";

import Search from "./components/Search";
import Table from "./components/Table";
import Button from "./components/Button";
import WithLoading from "./components/WithLoading HOC";

const PATH_BASE = "https://hn.algolia.com/api/v1",
  PATH_SEARCH = "/search",
  PARAM_SEARCH = "query=",
  PARAM_PAGE = "page=",
  PARAM_HPP = "hitsPerPage=",
  DEFAULT_HPP = 4,
  DEFAULT_QUERY = "redux";

class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: "",
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false
    };
    // this.setSearchTopStories = this.setSearchTopStories.bind(this);
  }

  onDismiss = (id) => {
    const { searchKey, results } = this.state;
    const { page } = results[searchKey];
    const isNotId = (item) => item.objectID !== id;
    const updatedState = results[searchKey].hits.filter(isNotId);
    this.setState({
      results: { ...results, [searchKey]: { hits: updatedState, page } }
    });
  };

  onTermChange = (inputText) => {
    this.setState({ searchTerm: inputText });
  };

  setSearchTopStories(res) {
    const { hits, page } = res;
    const { results, searchKey } = this.state;
    const oldHits = page !== 0 ? results[searchKey].hits : [];

    const updatedHits = [...oldHits, ...hits];
    // this.setState(() => {
    //   return { results: { hits: updatedHits, page } };
    // });
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  fetchSearch(searchText, page = 0) {
    const url =
      PATH_BASE +
      PATH_SEARCH +
      "?" +
      PARAM_SEARCH +
      searchText +
      "&" +
      PARAM_PAGE +
      page +
      "&" +
      PARAM_HPP +
      DEFAULT_HPP;
    this.setState({ isLoading: true });
    axios(url)
      .then((res) => this._isMounted && this.setSearchTopStories(res.data))
      .then((res) => setTimeout(() => this.setState({ isLoading: false }), 350))
      .catch((err) => this._isMounted && this.setState({ error: err }));
  }
  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearch(searchTerm);
  }

  onSearchSubmit(e) {
    e.preventDefault();
    const { searchTerm, results } = this.state;
    const page = results[searchTerm] ? results[searchTerm].page : 0;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearch(searchTerm, page);
    }
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      results,
      searchTerm,
      searchKey,
      error,
      isLoading,
      sortKey
    } = this.state;
    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;
    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search
            searchTerm={searchTerm}
            onTermChange={this.onTermChange}
            onSearchSubmit={(e) => this.onSearchSubmit(e)}
            children="Поиск"
          />
        </div>

        {error ? (
          <div>
            <p>
              Something went wrong, error message is "<em>{error.message}</em>"
            </p>
          </div>
        ) : (
          <Table list={list} onDismiss={this.onDismiss} sortKey={sortKey} />
        )}
        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            typeBtn="button"
            onHandle={() => this.fetchSearch(searchKey, page + 1)}
          >
            Больше историй
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

const ButtonWithLoading = WithLoading(Button);

export default App;
