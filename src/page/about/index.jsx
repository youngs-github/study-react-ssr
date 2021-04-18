import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getAboutList } from '../../store/reducer';

// about页面
function About(props) {
  // 请求数据
  useEffect(() => {
    if (!props.list.length) {
      props.getAboutList();
    }
  }, []);
  return (
    <div>
      <p>about page</p>
      <ul>
        {props.list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
// 静态方法
About.loadData = (store) => {
  return store.dispatch(getAboutList());
};

export default connect((state) => ({ list: state.about.list }), {
  getAboutList
})(About);
