import styles from "./Button.module.css";

function Button({ children, type = "submit", className = "", onClick }) {
  return (
    <button
      type={type}
      className={`${className} ${styles.btn}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
