/**
 * @author tanxin
 * @date $
 * @Description:
 */
import React from 'react';

import style from "./index.module.scss";

// 用户管理页面
class UserManagerPage extends React.Component {

  componentWillUnmount() {
    this.setState = () => false;
  }

  render() {
    return <div style={{fontSize: '20px'}} className={style['user-manager-page-content']}>
      用户管理页面
    </div>
  }
}

export default UserManagerPage;
