import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { getUserList } from '../../store/reducer';
import { withStyles } from '../../styles';

// css
import styles from '../../style/user.css';

// 用户页
function User(props) {
  // 获取数据
  useEffect(() => {
    if (!props.list.length) {
      props.getUserList();
    }
  }, []);
  return props.userinfo ? (
    <div className={'user-page'}>
      <p>user page</p>
      <p>user页面必须要求登录</p>
      <p>user：{props.userinfo ? JSON.stringify(props.userinfo) : '空'}</p>
      <ul>
        {props.list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  ) : (
    <Redirect to={'/'}></Redirect>
  );
}
// 静态方法
User.loadData = (store) => {
  return store.dispatch(getUserList());
};

export default connect(
  (state) => ({ list: state.user.list, userinfo: state.user.userinfo }),
  { getUserList }
)(withStyles(styles)(User));
