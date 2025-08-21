import styles from "./FilterData.module.css";

function FilterData({ filterType, onFilterChange, onCategoryChange }) {
  return (
    <div className={styles.filter__container}>
      <label htmlFor="selectData">Sort by: </label>
      <select
        id="selectData"
        value={filterType}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="" selected>
          -- use filter --
        </option>
        <option value="category">Category</option>
        <option value="big">Value - small to big</option>
        <option value="small">Value - big to small</option>
        <option value="alpha">Alphabetically</option>
      </select>

      {filterType === "category" && (
        <>
          <label htmlFor="catSelect">Choose category: </label>
          <select
            id="catSelect"
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">-- Select category --</option>
            <option value="home">Home</option>
            <option value="food">Food</option>
            <option value="hobby">Hobby</option>
            <option value="vehicle">Vehicle</option>
            <option value="fee">Fee</option>
          </select>
        </>
      )}
    </div>
  );
}

export default FilterData;
