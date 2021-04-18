import React from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from './styles';

// css
import styles from './style/app.css';

function App({ children }) {
  return (
    <>
      <div className={styles.header}>
        <Link to={'/'}>首页</Link>
        <span> </span>
        <Link to={'/about'}>详情页</Link>
        <span> </span>
        <Link to={'/user'}>用户信息</Link>
        <span> </span>
        <Link to={'/404'}>未知页面</Link>
      </div>
      <div className={styles.wrapper}>{children}</div>
    </>
  );
}

export default withStyles(styles)(App);
