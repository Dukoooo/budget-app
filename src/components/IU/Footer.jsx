import Button from "./Button";
import styles from "./Footer.module.css";

function Footer({ onHandleModal }) {
  return (
    <footer className={styles.dash__buttons}>
      <Button onClick={() => onHandleModal(true)}>Add new exp +</Button>
      <Button>Add new income +</Button>
    </footer>
  );
}

export default Footer;
