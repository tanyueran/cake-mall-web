/**
 * @author tanxin
 * @date $
 * @Description:
 */
import React from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Tabs,
  Upload,
  message,
} from 'antd'
import {PlusOutlined} from '@ant-design/icons';

import {connect} from 'react-redux';

import style from "./index.module.scss";

import {updateUserInfo, updatePwd} from '../../../api/user';
import {previewFile, uploadFile} from "../../../api/commom";

import {pullUserInfo} from "../../../store/user/action"

import md5 from 'js-md5';

// 个人中心
class PersonInfoPage extends React.Component {

  static stateToProps(state) {
    return {
      user: state.userReducer
    }
  }

  state = {
    form: React.createRef(),
    form2: React.createRef(),
    loading: false,
    // 头像
    fileList: [],
    userInfo: {
      userCode: '',
      userName: '',
      nickname: '',
    },
  };

  componentDidMount() {
    this.setState({
      fileList: this.props.user.userInfo.data.headImg ? [
        {
          name: '头像',
          status: 'donw',
          uid: this.props.user.userInfo.data.headImg,
          url: previewFile(this.props.user.userInfo.data.headImg)
        }
      ] : [],
    });
    this.state.form.current.setFieldsValue({
      userCode: this.props.user.userInfo.data.userCode,
      userName: this.props.user.userInfo.data.userName,
      nickname: this.props.user.userInfo.data.nickname,
    })
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  // 删除头像
  removeImgHandler = (data) => {
    message.info("头像修改后，需要”保存“才生效");
    this.setState({
      fileList: [],
    });
  };

  // 更新
  updateHandler = (data) => {
    data.headImg = this.state.fileList.length === 0 ? '' : this.state.fileList[0].uid;
    data.id = this.props.user.userInfo.data.id;
    this.setState({
      loading: true,
    });
    updateUserInfo(data).then(res => {
      if (res) {
        message.success("保存成功");
        this.props.dispatch(pullUserInfo());
      }
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      this.setState({
        loading: false,
      })
    });
  };

  // 上传图片
  uploadImgHandler = (data) => {
    let formData = new FormData();
    formData.append("file", data.file);
    this.setState({
      fileList: [
        {
          name: '头像',
          uid: new Date().getTime(),
          status: 'uploading',
        }
      ]
    });
    uploadFile(formData).then(res => {
      this.setState({
        fileList: [
          {
            name: '头像',
            status: 'done',
            uid: res,
            url: previewFile(res)
          }
        ]
      });
    }).catch(err => {

    });
  };

  // 更新账号密码
  updatePwdHandler = (data) => {
    this.setState({
      loading: true,
    });
    data.id = this.props.user.userInfo.data.id;
    data.newUserPwd = md5(data.newUserPwd);
    data.newUserPwd2 = md5(data.newUserPwd2);
    data.oldUserPwd = md5(data.oldUserPwd);
    updatePwd(data).then(res => {
      if (res) {
        message.success('更新成功');
        this.state.form2.current.resetFields();
      } else {
        message.error("更新失败，请确认旧密码是否正确");
      }
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      this.setState({
        loading: false,
      })
    })
  };

  render() {
    const uploadButton = (
      <div>
        <PlusOutlined/>
      </div>
    );

    return <div className={style['person-info-page-content']}>
      <Tabs defaultActiveKey="1" onChange={() => {
      }}>
        <Tabs.TabPane tab="个人信息" key="1">
          <Row>
            <Col span={24} offset={6}>
              <Form
                {...{
                  labelCol: {span: 2},
                  wrapperCol: {span: 8},
                }}
                ref={this.state.form}
                onFinish={this.updateHandler}>
                <Form.Item label={"头像"}>
                  <Upload
                    customRequest={this.uploadImgHandler}
                    listType="picture-card"
                    onRemove={this.removeImgHandler}
                    fileList={this.state.fileList}
                  >
                    {this.state.fileList.length === 1 ? null : uploadButton}
                  </Upload>
                </Form.Item>
                <Form.Item
                  label={"账号"}
                  name={"userCode"}
                  rules={[{required: true, message: '账号不可为空！'}]}>
                  <Input
                    autoComplete={"off"}
                    placeholder="账号"
                  />
                </Form.Item>
                <Form.Item
                  label={"姓名"}
                  name={'userName'}>
                  <Input
                    autoComplete={"off"}
                    placeholder="姓名"
                  />
                </Form.Item>
                <Form.Item
                  label={"昵称"}
                  name={'nickname'}>
                  <Input
                    autoComplete={"off"}
                    placeholder="昵称"
                  />
                </Form.Item>
                <Row>
                  <Col span={10} className={"text-center"}>
                    <Button
                      loading={this.state.loading} type="primary"
                      htmlType="submit">
                      保存
                    </Button>
                  </Col>
                </Row>

              </Form>
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="密码修改" key="2">
          <Row>
            <Col span={24} offset={6}>
              <Form
                {...{
                  labelCol: {span: 2},
                  wrapperCol: {span: 8},
                }}
                ref={this.state.form2}
                onFinish={this.updatePwdHandler}>
                <Form.Item
                  label={"旧的密码"}
                  name={"oldUserPwd"}
                  rules={[{required: true, message: '请输入！'}]}>
                  <Input.Password
                    autoComplete={"off"}
                    placeholder="请输入"
                  />
                </Form.Item>
                <Form.Item
                  label={"新的密码"}
                  name={'newUserPwd'}
                  rules={[{required: true, message: '请输入！'}]}>
                  <Input.Password
                    autoComplete={"off"}
                    placeholder="请输入"
                  />
                </Form.Item>
                <Form.Item
                  label={"确认密码"}
                  name={'newUserPwd2'}
                  rules={[
                    {required: true, message: '请再次输入新密码！'},
                    ({getFieldValue}) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('newUserPwd') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject('两次输入不一致!');
                      },
                    }),]}>
                  <Input.Password
                    autoComplete={'off'}
                    placeholder="请输入"
                  />
                </Form.Item>
                <Row>
                  <Col span={10} className={"text-center"}>
                    <Button
                      loading={this.state.loading} type="primary"
                      htmlType="submit">
                      保存
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Tabs.TabPane>
      </Tabs>

    </div>
  }
}

export default connect(PersonInfoPage.stateToProps)(PersonInfoPage);
