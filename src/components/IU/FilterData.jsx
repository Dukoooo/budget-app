import styles from "./FilterData.module.css";

function FilterData({ filterType, onFilterChange, onCategoryChange }) {
  return (
    <div className={styles.filter__container}>
      <label htmlFor="selectData" className={styles.filter__label}>
        Sort by:
      </label>
      <select
        id="selectData"
        value={filterType}
        onChange={(e) => onFilterChange(e.target.value)}
        className={styles.filter__select}
      >
        <option value="">-- use filter --</option>
        <option value="category">Category</option>
        <option value="big">Value - small to big</option>
        <option value="small">Value - big to small</option>
        <option value="alpha">Alphabetically</option>
      </select>

      {filterType === "category" && (
        <div className={styles.filter__category}>
          <label htmlFor="catSelect" className={styles.filter__label}>
            Choose category:
          </label>
          <select
            id="catSelect"
            onChange={(e) => onCategoryChange(e.target.value)}
            className={styles.filter__select}
          >
            <option value="">-- Select category --</option>
            <option value="home">Home</option>
            <option value="food">Food</option>
            <option value="hobby">Hobby</option>
            <option value="vehicle">Vehicle</option>
            <option value="fee">Fee</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default FilterData;
