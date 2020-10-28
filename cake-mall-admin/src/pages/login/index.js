/**
 * @author tanxin
 * @date $
 * @Description: 登录页
 */
import React from 'react';
import {connect} from "react-redux";
import {
  message,
  Form,
  Input,
  Button,
  Typography,
} from 'antd';
import md5 from 'js-md5'

import {
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons'

import './index.scss';

import {
  userLogin
} from '../../store/user/action.js'


class LoginPage extends React.Component {
  static stateToProps(state) {
    return {
      user: state.userReducer
    }
  }

  state = {
    form: React.createRef(),
  };

  loginHandler = values => {
    values.password = md5(values.password);
    this.props.dispatch(userLogin(values, () => {
      message.success('登录成功!');
      this.props.history.replace("/");
    }, () => {
      // 清空账号密码
      this.state.form.current.resetFields();
    }));
  };

  render() {
    return (
      <div className={"login-wrapper"}>
        <div className='login-content'>
          <Typography.Title>
            欢迎，权限DEMO
          </Typography.Title>
          <Form ref={this.state.form} onFinish={this.loginHandler}>
            <Form.Item name={"username"} initialValue={"test01"} rules={[{required: true, message: '请输入登录账号!'}]}>
              <Input
                autoComplete={"off"}
                prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="账号"
              />
            </Form.Item>
            <Form.Item name={'password'} initialValue={"123456"} rules={[{required: true, message: '请输入账号密码!'}]}>
              <Input
                prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <div style={{marginBottom: '8px'}}>
                <a href="/#" className={"right"} onClick={(e) => {
                  e.preventDefault();
                  message.info('请联系管理员')
                }}>
                  忘记密码
                </a>
              </div>
              <Button loading={this.props.user.loading} block type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect(LoginPage.stateToProps)(LoginPage);
