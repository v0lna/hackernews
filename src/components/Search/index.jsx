import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "../Button";
export default class Search extends Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }
  render() {
    const { searchTerm, onTermChange, onSearchSubmit, children } = this.props;
    return (
      <div>
        <form onSubmit={(e) => onSearchSubmit(e)}>
          <input
            type="text"
            onChange={(e) => onTermChange(e.currentTarget.value)}
            value={searchTerm}
            ref={(node) => (this.input = node)}
          />
          <Button typeBtn="submit" className="button-submit">
            {children}
          </Button>
        </form>
      </div>
    );
  }
}
Search.propTypes = {
  searchTerm: PropTypes.string,
  onTermChange: PropTypes.func,
  onSearchSubmit: PropTypes.func,
  children: PropTypes.node
};
