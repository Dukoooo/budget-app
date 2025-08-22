import styles from "./Header.module.css";

function Header({ currentUser, onSignOut }) {
  return (
    <header className={styles.dash__header}>
      <aside className={styles.dash__header_info}>
        <h1 className={styles.dash__title}>
          Hello {currentUser?.name || "User"},
        </h1>
        <p className={styles.dash__sub_title}>
          summary of your financial status
        </p>
      </aside>

      <button
        type="submit"
        onClick={onSignOut}
        className={styles.dash__logOut_btn}
      >
        Log out
      </button>
    </header>
  );
}

export default Header;
