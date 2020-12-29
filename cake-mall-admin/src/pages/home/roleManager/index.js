/**
 * @author tanxin
 * @date $
 * @Description:
 */
import React from 'react';
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
} from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

import style from './index.module.scss';

import {
  addRole,
  queryRolesByPage,
  deleteRole,
  editRole,
} from '../../../api/role';
import { getKey } from '../../../api/commom';

// 角色管理
class RoleManagerPage extends React.Component {
  columns = [
    {
      title: '角色编号',
      dataIndex: 'roleCode',
      key: 'roleCode',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      align: 'center',
      render: (data) => (
        <div>
          <Popconfirm
            title="您确定删除该角色吗?"
            onConfirm={() => {
              deleteRole(data.id).then((res) => {
                if (res) {
                  message.success('操作成功');
                  this.query();
                }
              });
            }}
            onCancel={() => {
            }}
            okText="确定"
            cancelText="取消">
            <Button danger icon={<DeleteOutlined />} size="small">删除</Button>
          </Popconfirm>

          <Button
            onClick={() => {
              this.setState((state) => ({
                modalObj: {
                  ...state.modalObj,
                  show: true,
                  edit: true,
                  initObj: {
                    ...data,
                  },
                },
              }), () => {
                this.state.form.current.resetFields();
              });
            }}
            style={{ marginLeft: '10px' }}
            icon={<EditOutlined />}
            size="small">
            编辑
          </Button>
        </div>
      ),
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
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
      // 表格数据
      dataSource: [],
      // 模态框ref
      form: React.createRef(),
      // 模态框对象
      modalObj: {
        show: false,
        // 是否编辑
        edit: false,
        initObj: {
          id: '',
          roleCode: '',
          roleName: '',
          remark: '',
        },
      },
    };
  }

  componentDidMount() {
    this.query();
    this.getPrimaryKey();
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  // 表格分页改变
  changeHandler = (page, pageSize) => {
    console.log(this.state.pagination);
    this.setState((state) => ({
      pagination: {
        ...state.pagination,
        current: page,
        pageSize,
      },
    }), () => {
      this.query();
    });
  };

  // 获取主键
  getPrimaryKey = () => {
    getKey(1).then((data) => {
      this.setState({
        id: data[0],
      });
    }).catch(() => {
    });
  };

  // 查询
  query = () => {
    this.setState({
      loading: true,
    });
    const data = {
      keyword: this.state.keyword,
      page: this.state.pagination.current,
      size: this.state.pagination.pageSize,
    };
    queryRolesByPage(data).then((d) => {
      this.setState((state) => ({
        pagination: {
          ...state.pagination,
          total: d.total,
        },
        dataSource: data.records,
      }));
    }).catch(() => {

    }).finally(() => {
      this.setState({
        loading: false,
      });
    });
  };

  // 模态框保存回调
  modalOkHandler = () => {
    this.state.form.current.validateFields().then((data) => {
      if (this.state.modalObj.edit === false) {
        data.id = this.state.id;
        addRole(data).then((res) => {
          if (res) {
            message.success('保存成功');
            this.setState(() => ({
              id: '',
            }), () => {
              this.modalCancelHandler();
              this.getPrimaryKey();
              this.query();
            });
          }
        }).catch(() => {

        });
      } else {
        data.id = this.state.modalObj.initObj.id;
        editRole(data).then((res) => {
          if (res) {
            message.success('保存成功');
            this.setState(() => ({
              id: '',
            }), () => {
              this.modalCancelHandler();
              this.getPrimaryKey();
              this.query();
            });
          }
        }).catch(() => {

        });
      }
    }).catch(() => {

    });
  };

  // 模态框取消回调
  modalCancelHandler = () => {
    this.setState((state) => ({
      modalObj: {
        ...state.modalObj,
        show: false,
        edit: false,
        initObj: {
          id: '',
          roleCode: '',
          roleName: '',
          remark: '',
        },
      },
    }), () => {
      this.state.form.current.resetFields();
    });
  };

  render() {
    return (
      <div className={style['role-manager-page-content']}>
        <Row className={style['search-wrapper']}>
          <Col span={16}>
            <Form
              layout="inline"
              name="basic"
              onFinish={(data) => {
                this.setState({
                  keyword: data.keyword,
                }, () => {
                  this.query();
                });
              }}>
              <Form.Item
                label="关键字"
                name="keyword">
                <Input autoComplete="off" placeholder="请输入" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={8} className="text-right">
            <Button onClick={() => {
              this.setState((state) => ({
                modalObj: {
                  ...state.modalObj,
                  show: true,
                  edit: false,
                },
              }));
            }}>
              添加角色
            </Button>
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
            current: this.state.pagination.current,
            onChange: this.changeHandler,
          }}
          columns={this.columns} />

        {/* 编辑、新增的模态框 */}
        <Modal
          title={this.state.modalObj.edit ? '角色信息编辑' : '添加角色'}
          visible={this.state.modalObj.show}
          onOk={this.modalOkHandler}
          onCancel={this.modalCancelHandler}>
          <Form
            {
              ...{
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
              }}
            initialValues={this.state.modalObj.initObj}
            name="form"
            ref={this.state.form}>
            <Form.Item
              label="角色编号"
              name="roleCode"
              rules={[{ required: true, message: '角色编号不可为空' }]}>
              <Input autoComplete="off" placeholder="请输入" />
            </Form.Item>
            <Form.Item
              label="角色名称"
              name="roleName"
              rules={[{ required: true, message: '角色名称不可为空' }]}>
              <Input autoComplete="off" placeholder="请输入" />
            </Form.Item>
            <Form.Item
              label="备注"
              name="remark">
              <Input autoComplete="off" placeholder="请输入" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default RoleManagerPage;
