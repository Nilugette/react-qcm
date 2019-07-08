import React from "react";
import PropTypes from "prop-types";

/**
 * Un composant qui sert à wrapper l'élement input de type radio
 */
class InputRadio extends React.Component {
  render() {
    const { label, name, checked, value, onChange, disabled } = this.props;
    return (
      <label className="d-block">
        <input
          type="radio"
          name={name}
          checked={checked}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {label}
      </label>
    );
  }
}

InputRadio.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

InputRadio.defaultProps = {
  disabled: false
};

export default InputRadio;
