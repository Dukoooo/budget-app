import styles from "./DisplayData.module.css";

function DisplayData({ data, title }) {
  return (
    <div className={styles.dash__sum}>
      <span className={styles.dash__sum_title}>{title}</span>
      <p className={styles.dash__sum_num}>{Number(data)}$</p>
    </div>
  );
}

export default DisplayData;
