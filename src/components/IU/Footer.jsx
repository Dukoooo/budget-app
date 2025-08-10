import Button from "./Button";
import styles from "./Footer.module.css";

function Footer({ onHandleModal, onHanldeIncome }) {
  return (
    <footer className={styles.dash__buttons}>
      <Button onClick={() => onHandleModal(true)}>Add new exp +</Button>
      <Button onClick={() => onHanldeIncome(true)}>Add new income +</Button>
    </footer>
  );
}

export default Footer;
