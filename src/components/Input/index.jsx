/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

import styles from "./index.module.css";

function ClearButton({ onClick }) {
  return (
    <button type="button" className={styles.clearButton} onClick={onClick}>
      <FontAwesomeIcon icon={faTimesCircle} />
    </button>
  );
}
ClearButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default function Input({
  supportText,
  pattern,
  value,
  setInput,
  setError,
  name,
  label,
  maxLength,
  multiline,
  fontSize,
  placeholder,
  required,
}) {
  const isValidInput = (url) => (!pattern ? true : pattern.test(url));

  const onChange = (event) => {
    const { currentTarget } = event; // Persistir en llamada asíncrona setInput

    setInput((prevInput) => ({
      ...prevInput,
      [name]: currentTarget.value,
    }));
    setError((prevError) => {
      const validInput = isValidInput(currentTarget.value);
      const hasError = prevError[name];

      // Quitando error si el input es válido
      if (validInput && hasError)
        return {
          ...prevError,
          [name]: "",
        };

      // Agregando error si el input no es válido
      if (!validInput && !hasError)
        return {
          ...prevError,
          [name]: "Input no válido",
        };

      return prevError;
    });
  };

  const clear = () => {
    setInput((prevInput) => ({
      ...prevInput,
      [name]: "",
    }));
    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  const style = { fontSize };

  const elementProps = {
    id: `input-${name}`,
    value,
    onChange,
    maxLength,
    style,
    placeholder,
    required,
    pattern: pattern?.toString().slice(1, -1),
  };

  return (
    <div className={styles.container}>
      <label htmlFor={elementProps.id}>{label}</label>
      {value && <ClearButton onClick={clear} />}
      {multiline ? <textarea {...elementProps} /> : <input {...elementProps} />}
      <div className={styles.helperText}>
        <span>{supportText}</span>
        <span>
          {value?.length || 0}/{maxLength}
        </span>
      </div>
    </div>
  );
}
Input.propTypes = {
  supportText: PropTypes.string,
  pattern: PropTypes.instanceOf(RegExp),
  value: PropTypes.string,
  setInput: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  multiline: PropTypes.bool,
  fontSize: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};
Input.defaultProps = {
  supportText: "",
  pattern: null,
  value: "",
  label: "Label",
  maxLength: 300,
  multiline: false,
  fontSize: "medium",
  placeholder: "",
  required: false,
};
