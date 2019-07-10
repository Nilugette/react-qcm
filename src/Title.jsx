import React from "react";
import PropTypes from "prop-types";
import Badge from "./Badge";

import "./Title.css";

class Title extends React.Component {
  render() {
    const classNames = [
      "Title list-group-item d-flex justify-content-between align-items-center"
    ];
    if (this.props.selected) {
      classNames.push("Title--selected");
    }
    return (
      <li
        className={classNames.join(" ")}
        onClick={() => this.props.onClick(this.props.id)}
      >
        <span>{this.props.title}</span> <Badge value={this.props.badge} />
      </li>
    );
  }
}

Title.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  badge: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func
};

Title.defaultProps = {
  selected: false
};

export default Title;
