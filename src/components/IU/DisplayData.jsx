import styles from "./DisplayData.module.css";

function DisplayData({ data, title, className }) {
  const finalClassName = className ? className : styles.dash__sum;
  return (
    <div className={finalClassName}>
      <span className={styles.dash__sum_title}>{title}</span>
      <p className={styles.dash__sum_num}>{Number(data)}$</p>
    </div>
  );
}

export default DisplayData;
