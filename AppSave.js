import React, { Component } from "react";
import "./App.css";

const PATH_BASE = "https://hn.algolia.com/api/v1",
  PATH_SEARCH = "/search",
  PARAM_SEARCH = "query=",
  PARAM_PAGE = "page=",
  PARAM_HPP = "hitsPerPage=",
  DEFAULT_HPP = 4,
  DEFAULT_QUERY = "redux";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };
    // this.setSearchTopStories = this.setSearchTopStories.bind(this);
  }

  onDismiss = (id) => {
    const isNotId = (item) => item.created_at_i !== id;
    const updatedState = this.state.result.hits.filter(isNotId);
    this.setState({ result: { ...this.state.result, hits: updatedState } });
  };

  onTermChange = (inputText) => {
    this.setState({ searchTerm: inputText });
  };

  setSearchTopStories(res) {
    const { hits, page } = res;

    const oldHits = page !== 0 ? this.state.result.hits : [];

    const updatedHits = [...oldHits, ...hits];
    // this.setState(() => {
    //   return { result: { hits: updatedHits, page } };
    // });
    this.setState({ result: { hits: updatedHits, page } });
    console.log(this.state);
  }

  fetchSearch(searchText, page = 0) {
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchText}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then((res) => res.json())
      .then((res) => this.setSearchTopStories(res))
      .catch((err) => console.error(err));
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearch(searchTerm);
  }

  onSearchSubmit(e) {
    e.preventDefault();
    const { searchTerm } = this.state;
    this.fetchSearch(searchTerm);
  }

  render() {
    const { result, searchTerm } = this.state;

    const page = (result && result.page) || 0;

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
        {result && <Table list={result.hits} onDismiss={this.onDismiss} />}
        <div className="interactions">
          <Button
            typeBtn="button"
            onHandle={() => this.fetchSearch(searchTerm, page + 1)}
          >
            Больше историй
          </Button>
        </div>
      </div>
    );
  }
}

const Search = ({ searchTerm, onTermChange, onSearchSubmit, children }) => (
  <div>
    <form onSubmit={(e) => onSearchSubmit(e)}>
      <input
        type="text"
        onChange={(e) => onTermChange(e.currentTarget.value)}
        value={searchTerm}
      />
      <Button typeBtn="submit" className="button-submit">
        {children}
      </Button>
    </form>
  </div>
);

const largeColumn = {
  width: "40%"
};
const midColumn = {
  width: "30%"
};
const smallColumn = {
  width: "10%"
};

const Table = ({ list, onDismiss }) => (
  <div className="table">
    {list.map((item) => (
      <div key={item.created_at_i} className="table-row">
        <span style={largeColumn}>
          <a href={item.url}></a>
          {item.title}
        </span>
        <span style={midColumn}>{item.author}</span>
        <span style={smallColumn}>{item.num_comments}</span>
        <span style={smallColumn}>{item.points}</span>
        <span style={smallColumn}>
          <Button
            typeBtn="button"
            className="button-inline"
            onHandle={() => onDismiss(item.created_at_i)}
          >
            Отбросить
          </Button>
        </span>
      </div>
    ))}
  </div>
);

const Button = ({ typeBtn, children, className = "", onHandle = null }) => (
  <button type={typeBtn} onClick={onHandle} className={className}>
    {children}
  </button>
);

export default App;
