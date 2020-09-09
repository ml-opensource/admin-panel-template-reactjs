import React, { FC, memo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { iRootState, Dispatch } from "store/store";
import styles from "./Navbar.module.scss";

const Navbar: FC = () => {
  const auth = useSelector((state: iRootState) => state.auth);
  const dispatch = useDispatch<Dispatch>();

  const signOut = (): void => {
    dispatch.auth.signOut();
  };

  return (
    <nav>
      <ul className={styles.navbarList}>
        <li className={styles.navbarListItem}>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.navbarListItem}>
          <Link to="/profile">Profile</Link>
        </li>
        <li className={styles.navbarListItem}>
          {auth.accessToken ? (
            <button type="button" onClick={signOut}>
              Sign out
            </button>
          ) : (
            <Link to="/sign-in">Sign In</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default memo(Navbar);
