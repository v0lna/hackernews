import React, { Component } from "react";
import PropTypes from "prop-types";
import { sortBy } from "lodash";

import Sort from "../Sort";
import Button from "../Button";

const largeColumn = {
  width: "40%"
};
const midColumn = {
  width: "20%"
};
const smallColumn = {
  width: "13.3%"
};

const SORT = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, "title"),
  AUTHOR: (list) => sortBy(list, "author"),
  NUM_COMMENTS: (list) => sortBy(list, "num_comments").reverse(),
  POINTS: (list) => sortBy(list, "points").reverse()
};

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: "NONE",
      isSortReverse: false
    };
  }
  onSortKeyChange(key) {
    const { sortKey, isSortReverse } = this.state;
    const sortReverse = sortKey === key && !isSortReverse;
    this.setState({ sortKey: key, isSortReverse: sortReverse });
  }
  render() {
    const { list, onDismiss } = this.props;
    const { isSortReverse, sortKey } = this.state;
    const sortedList = SORT[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;
    return (
      <div className="table">
        <div className="table-header">
          <span style={largeColumn}>
            <Sort
              sortKey="TITLE"
              activeSortKey={sortKey}
              onHandle={() => this.onSortKeyChange("TITLE")}
              isSortReverse={isSortReverse}
            >
              Название
            </Sort>
          </span>
          <span style={midColumn}>
            <Sort
              sortKey="AUTHOR"
              activeSortKey={sortKey}
              onHandle={() => this.onSortKeyChange("AUTHOR")}
              isSortReverse={isSortReverse}
            >
              Автор
            </Sort>
          </span>
          <span style={smallColumn}>
            <Sort
              sortKey="NUM_COMMENTS"
              activeSortKey={sortKey}
              onHandle={() => this.onSortKeyChange("NUM_COMMENTS")}
              isSortReverse={isSortReverse}
            >
              Комментарии
            </Sort>
          </span>
          <span style={smallColumn}>
            <Sort
              sortKey="POINTS"
              activeSortKey={sortKey}
              onHandle={() => this.onSortKeyChange("POINTS")}
              isSortReverse={isSortReverse}
            >
              Очки
            </Sort>
          </span>
          <span style={smallColumn}>Архив</span>
        </div>
        {reverseSortedList.map((item) => (
          <div key={item.objectID} className="table-row">
            <span style={largeColumn}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={midColumn}>{item.author}</span>
            <span style={smallColumn}>{item.num_comments}</span>
            <span style={smallColumn}>{item.points}</span>
            <span style={smallColumn}>
              <Button
                typeBtn="button"
                className="button-inline"
                onHandle={() => onDismiss(item.objectID)}
              >
                Отбросить
              </Button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}
Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      url: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ),
  onDismiss: PropTypes.func.isRequired
};
