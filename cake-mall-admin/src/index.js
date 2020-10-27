import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './store/index'
// 全局样式
import './style/index.scss';
import App from './App';
// antd 配置文件
import {ConfigProvider} from 'antd';
import config from './config/antd.config'

// 性能检测
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider {...config}>
      <App/>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
