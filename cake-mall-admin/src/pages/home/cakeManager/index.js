/**
 * @author tanxin
 * @date $
 * @Description:
 */
import React from 'react';

import style from "./index.module.scss";

// 蛋糕管理页面
class CakeMangerPage extends React.Component {

  componentWillUnmount() {
    this.setState = () => false;
  }

  render() {
    return <div style={{fontSize: '20px'}} className={style['cake-manager-page-content']}>
      蛋糕管理页面
    </div>
  }
}

export default CakeMangerPage;
