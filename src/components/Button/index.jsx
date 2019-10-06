import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const Button = ({ typeBtn, children, className, onHandle }) => (
  <button type={typeBtn} onClick={onHandle} className={className}>
    {children}
  </button>
);
Button.propTypes = {
  onHandle: PropTypes.func,
  children: PropTypes.node,
  typeBtn: PropTypes.string,
  className: PropTypes.string
};
Button.defaultProps = {
  className: "",
  onHandle: null,
  typeBtn: "button"
};

export default Button;
