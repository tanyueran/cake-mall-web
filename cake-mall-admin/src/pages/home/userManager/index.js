/**
 * @author tanxin
 * @date $
 * @Description:
 */
import React from 'react';
import {connect} from 'react-redux'
import {
  Table,
  Form,
  Input,
  Button,
  Row,
  Col,
  Modal,
  message,
  Popconfirm,
  Checkbox,
  Select,
  Tag,
} from 'antd';

import {
  BgColorsOutlined,
  EditOutlined,
} from "@ant-design/icons";

import {
  getUsersByPage,
  freezeUser,
  unfreezeUser,
  addUser,
  editUser,
  allRole,
  initPwd,
} from "../../../api/user"
import {getKey} from "../../../api/commom";

import style from "./index.module.scss";

// 用户管理页面
class UserManagerPage extends React.Component {

  componentWillUnmount() {
    this.setState = () => false;
  }

  static stateToProps(state) {
    return {
      user: state.userReducer
    }
  }

  columns = [
    {
      title: '用户账号',
      dataIndex: 'userCode',
      key: 'userCode',
    },
    {
      title: '用户姓名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(data) {
        return data === 0 ? <Tag color="success">激活</Tag> : <Tag color="error">禁用</Tag>;
      }
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      render(data) {
        return data ? data : "-"
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: "160px",
      key: 'createTime',
    },
    {
      title: '操作',
      align: 'center',
      width: '300px',
      render: (data) => {
        return this.props.user.userInfo.data.id !== data.id && <div>
          {
            data.status === 0 ? <Popconfirm
                title="您确定冻结该用户吗?"
                onConfirm={() => {
                  freezeUser(data.id).then(res => {
                    if (res) {
                      message.success("操作成功");
                      this.query();
                    }
                  })
                }}
                onCancel={() => {
                }}
                okText="确定"
                cancelText="取消"
              >
                <Button danger icon={<BgColorsOutlined/>} size={"small"}>冻结</Button>
              </Popconfirm> :
              <Popconfirm
                title="您确定解冻该用户吗?"
                onConfirm={() => {
                  unfreezeUser(data.id).then(res => {
                    if (res) {
                      message.success("操作成功");
                      this.query();
                    }
                  })
                }}
                onCancel={() => {
                }}
                okText="确定"
                cancelText="取消"
              >
                <Button danger icon={<BgColorsOutlined/>} size={"small"}>解冻</Button>
              </Popconfirm>
          }


          <Popconfirm
            title="您确定初始化该账号的密码吗?"
            onConfirm={() => {
              initPwd(data.id).then(res => {
                if (res) {
                  message.success("操作成功");
                }
              })
            }}
            onCancel={() => {
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button style={{marginLeft: '10px'}} icon={<BgColorsOutlined/>} size={"small"}>密码初始化</Button>
          </Popconfirm>

          <Button onClick={() => {
            this.setState(state => {
              return {
                modalObj: {
                  ...state.modalObj,
                  show: true,
                  edit: true,
                  initObj: {
                    ...data,
                  }
                }
              }
            }, () => {
              this.state.form.current.resetFields();
            })
          }} style={{marginLeft: '10px'}} icon={<EditOutlined/>} size={"small"}>编辑</Button>
        </div>
      }
    }
  ];

  state = {
    loading: false,
    // 新增的主键
    id: '',
    // 分页相关
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
    // 关键字
    keyword: '',
    // 状态
    status: [],
    // 表格数据
    dataSource: [],
    // 模态框ref
    form: React.createRef(),
    // 模态框对象
    modalObj: {
      loading: false,
      show: false,
      // 是否编辑
      edit: false,
      initObj: {
        id: '',
        cakeUserRoleId: null,
        nickname: '',
        userName: '',
        userCode: '',
        remark: '',
      },
    },
    // 所有的角色
    allRole: [],
  };

  // 表格分页改变
  changeHandler = (page, pageSize) => {
    console.log(this.state.pagination);
    this.setState(state => {
      return {
        pagination: {
          ...state.pagination,
          current: page,
          pageSize: pageSize,
        }
      }
    }, () => {
      this.query();
    });
  };

  // 获取主键
  getPrimaryKey = () => {
    getKey(1).then(data => {
      this.setState({
        id: data[0]
      })
    }).catch(err => {
    });
  };

  // 查询所有的角色
  getAllRoles = () => {
    allRole().then(res => {
      this.setState({
        allRole: res,
      })
    }).catch(err => {

    })
  };

  // 查询
  query = () => {
    this.setState({
      loading: true,
    });
    let data = {
      keyword: this.state.keyword,
      status: this.state.status,
      page: this.state.pagination.current,
      size: this.state.pagination.pageSize,
    };
    getUsersByPage(data).then(data => {
      this.setState(state => {
        return {
          pagination: {
            ...state.pagination,
            total: data.total,
          },
          dataSource: data.records,
        }
      });
    }).catch(err => {

    }).finally(() => {
      this.setState({
        loading: false,
      });
    });
  };

  // 模态框保存回调
  modalOkHandler = () => {
    this.setState(state => {
      return {
        modalObj: {
          ...state.modalObj,
          loading: true,
        }
      }
    });
    this.state.form.current.validateFields().then(data => {
      if (this.state.modalObj.edit === false) {
        data.id = this.state.id;
        addUser(data).then(res => {
          if (res) {
            message.success("保存成功");
            this.setState(state => {
              return {
                id: '',
              }
            }, () => {
              this.modalCancelHandler();
              this.getPrimaryKey();
              this.query();
            })
          }
        }).catch(err => {
          console.log(err);
        }).finally(() => {
          this.setState(state => {
            return {
              modalObj: {
                ...state.modalObj,
                loading: false,
              }
            }
          });
        })
      } else {
        data.id = this.state.modalObj.initObj.id;
        editUser(data).then(res => {
          if (res) {
            message.success("保存成功");
            this.setState(state => {
              return {
                id: '',
              }
            }, () => {
              this.modalCancelHandler();
              this.getPrimaryKey();
              this.query();
            })
          }
        }).catch(err => {

        }).finally(() => {
          this.setState(state => {
            return {
              modalObj: {
                ...state.modalObj,
                loading: false,
              }
            }
          });
        })
      }
    }).catch(err => {

    })
  };

  // 模态框取消回调
  modalCancelHandler = () => {
    this.setState(state => {
      return {
        modalObj: {
          ...state.modalObj,
          show: false,
          edit: false,
          initObj: {
            id: '',
            cakeUserRoleId: null,
            nickname: '',
            userName: '',
            userCode: '',
            remark: '',
          }
        }
      }
    }, () => {
      this.state.form.current.resetFields();
    })
  };

  componentWillUnmount() {
    this.setState = () => false;
  }

  componentDidMount() {
    this.query();
    this.getPrimaryKey();
    this.getAllRoles();
  }

  render() {
    return <div className={style['user-manager-page-content']}>
      <Row className={style['search-wrapper']}>
        <Col span={16}>
          <Form
            layout={"inline"}
            name="basic"
            onFinish={(data) => {
              this.setState({
                keyword: data.keyword,
                status: data.status,
              }, () => {
                this.query();
              });
            }}
          >
            <Form.Item
              label="关键字"
              name="keyword"
            >
              <Input autoComplete={"off"} placeholder={"请输入"}/>
            </Form.Item>
            <Form.Item
              label="状态"
              name="status"
            >
              <Checkbox.Group>
                <Checkbox value="0">
                  激活
                </Checkbox>
                <Checkbox value="1">
                  冻结
                </Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={8} className={"text-right"}>
          <Button onClick={() => {
            this.setState(state => {
              return {
                modalObj: {
                  ...state.modalObj,
                  show: true,
                  edit: false,
                }
              }
            })
          }}>添加用户</Button>
        </Col>
      </Row>
      <Table
        rowKey="id"
        bordered
        loading={this.state.loading}
        dataSource={this.state.dataSource}
        pagination={{
          defaultPageSize: this.state.pagination.pageSize,
          defaultCurrent: this.state.pagination.current,
          total: this.state.pagination.total,
          pageSizeOptions: [10, 20, 30, 50],
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: this.changeHandler,
        }}
        columns={this.columns}/>

      {/*编辑、新增的模态框*/}
      <Modal
        confirmLoading={this.state.modalObj.loading}
        title={this.state.modalObj.edit ? "用户信息编辑" : "添加用户"}
        visible={this.state.modalObj.show}
        onOk={this.modalOkHandler}
        onCancel={this.modalCancelHandler}
      >
        <Form
          {
            ...{
              labelCol: {span: 4},
              wrapperCol: {span: 20},
            }}
          initialValues={this.state.modalObj.initObj}
          name="form"
          ref={this.state.form}
        >
          <Form.Item
            label="角色"
            name="cakeUserRoleId"
            rules={[{required: true, message: '请选择角色'}]}
          >
            <Select placeholder="请选择角色" allowClear>
              {
                this.state.allRole.map(data =>
                  <Select.Option
                    key={data.id}
                    value={data.id}>{data.roleName}</Select.Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="用户账号"
            name="userCode"
            rules={[{required: true, message: '用户账号不可为空'}]}
          >
            <Input autoComplete={"off"} placeholder={"请输入"}/>
          </Form.Item>
          <Form.Item
            label="用户昵称"
            name="nickname"
            rules={[{required: true, message: '用户昵称不可为空'}]}
          >
            <Input autoComplete={"off"} placeholder={"请输入"}/>
          </Form.Item>
          <Form.Item
            label="用户姓名"
            name="userName"
            rules={[{required: true, message: '用户姓名不可为空'}]}
          >
            <Input autoComplete={"off"} placeholder={"请输入"}/>
          </Form.Item>
          <Form.Item
            label="备注"
            name="remark"
          >
            <Input autoComplete={"off"} placeholder={"请输入"}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  }
}

export default connect(UserManagerPage.stateToProps)(UserManagerPage);
