import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";

import Button from "../Button";

const Sort = ({
  children,
  onHandle,
  sortKey,
  activeSortKey,
  isSortReverse
}) => {
  const activeStatus = sortKey === activeSortKey;
  const arrow = isSortReverse ? faSortUp : faSortDown;
  const sortClass = classNames("button-inline", {
    "button-active": activeStatus
  });

  return (
    <Button className={sortClass} onHandle={() => onHandle()}>
      {children}
      <span> </span>
      {activeStatus ? <FontAwesomeIcon icon={arrow} /> : null}
    </Button>
  );
};

export default Sort;
