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

export default function Input({
  supportText,
  pattern,
  value,
  setInput,
  setError,
  name,
  label = "Label",
  maxLength = 300,
  multiline = false,
  fontSize = "medium",
  placeholder = "",
  required = false,
}) {
  const isValidInput = (url) => (!pattern ? true : pattern.test(url));

  const onChange = (event) => {
    setInput((prevInput) => ({
      ...prevInput,
      [name]: event.target.value,
    }));
    setError((prevError) => {
      const validInput = isValidInput(event.target.value);
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

  const style = { fontSize: fontSize };

  const elementProps = {
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
      <label>{label}</label>
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
