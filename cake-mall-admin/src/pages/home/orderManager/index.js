/**
 * @author tanxin
 * @date $
 * @Description:
 */
import React from 'react';

import style from "./index.module.scss";

// 订单管理页面
class OrderManagerPage extends React.Component {

  componentWillUnmount() {
    this.setState = () => false;
  }

  render() {
    return <div style={{fontSize: '20px'}} className={style['order-manager-page-content']}>
      订单管理页面
    </div>
  }
}

export default OrderManagerPage;
