import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';

import { getHomeList } from '../../store/reducer';
import { withStyles } from '../../../src/styles';

// css
import styles from '../../style/home.css';

// home页
function Home(props) {
  const [count, setCount] = useState(1);
  const addCount = useCallback(() => setCount((c) => c + 1), []);
  // 请求数据
  useEffect(() => {
    if (!props.list.length) {
      props.getHomeList();
    }
  }, []);
  return (
    <div className={styles['home-page']}>
      <p>home page</p>
      <p>count: {count}</p>
      <button onClick={addCount}>addCount</button>
      <ul>
        {props.list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
// 静态方法
Home.loadData = (store) => {
  return store.dispatch(getHomeList());
};

export default connect((state) => ({ list: state.home.list }), {
  getHomeList
})(withStyles(styles)(Home));
