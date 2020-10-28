/**
 * @author tanxin
 * @date $
 * @Description:
 */
import React from 'react';

import style from "./index.module.scss";

// 角色管理
class RoleManagerPage extends React.Component {

  componentWillUnmount() {
    this.setState = () => false;
  }

  render() {
    return <div style={{fontSize: '20px'}} className={style['role-manager-page-content']}>
      角色管理
    </div>
  }
}

export default RoleManagerPage;
