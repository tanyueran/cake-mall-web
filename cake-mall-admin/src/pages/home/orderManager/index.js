/**
 * @author tanxin
 * @date $
 * @Description: 订单管理页面组件
 */
import React from 'react';
import {
  Row,
  Col,
  Form,
  Select,
  Button,
  Table,
  Tag,
  Popconfirm,
  message,
} from 'antd';

import { connect } from 'react-redux';

import {
  pageQueryList,
  refuseOrder,
  giveOrder,
  send,
  orderOver,
} from '../../../api/order';

import style from './index.module.scss';

// 订单管理页面
class OrderManagerPage extends React.Component {
  columns = [
    {
      title: '订单标号',
      dataIndex: 'id',
      fixed: 'left',
      width: 170,
      key: 'id',
    },
    {
      title: '蛋糕名称',
      dataIndex: 'cakeProduct',
      key: 'cakeProduct',
      ellipsis: true,
      width: 150,
      render(data) {
        return data.name;
      },
    },
    {
      title: '订单情况',
      width: 180,
      render(data) {
        return `${data.price}(元/个) * ${data.number}个 = ${data.totalPrice}元`;
      },
    },
    {
      title: '购买人',
      dataIndex: 'buyUser',
      key: 'buyUser',
      width: 200,
      render(data) {
        return `${data.nickname}(${data.userName})`;
      },
    },
    /*
    订单状态(
       0、已下单，未付款；
       5、未付款，订单取消；
       10、已付款，待发货；
       15、已拒单，订单取消；
       20、已接单，待配货；
       30、已配送，待收货；
       40、已收货，完成订单)下单后30分未付款，则取消订单；付款后30分钟未接单，则订单取消
       */
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 200,
      render(data) {
        return (
          <>
            {
            data === 0 ? <Tag color="lime">已下单，未付款</Tag>
              : data === 5 ? <Tag color="error">未付款，订单取消</Tag>
                : data === 10 ? <Tag color="green">已付款，待发货</Tag>
                  : data === 15 ? <Tag color="#f50">已拒单，订单取消</Tag>
                    : data === 20 ? <Tag color="processing">已接单，待配货</Tag>
                      : data === 30 ? <Tag color="success">已配送，待收货</Tag>
                        : data === 40 ? <Tag color="#108ee9">已收货，完成订单</Tag> : '数据有问题'
          }
          </>
);
      },
    },
    {
      title: '操作人',
      dataIndex: 'actionUser',
      key: 'actionUser',
      width: 200,
      render(data) {
        if (data) {
          return `${data.nickname}(${data.userName})`;
        }
          return '-';
      },
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 220,
    },
    {
      title: '买家备注',
      dataIndex: 'remark',
      key: 'remark',
      ellipsis: true,
      width: 200,
    },
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      width: 180,
      render: (data) => (
        <div>
          {
            data.status === 10 ? (
              <>
                <Popconfirm
                  title="您确定接受该订单吗?"
                  onConfirm={() => {
                    this.setState({
                      loading: true,
                    });
                    giveOrder({
                      userId: this.props.user.userInfo.data.id,
                      orderId: data.id,
                    }).then((res) => {
                      if (res) {
                        message.success('操作成功');
                        this.query();
                      } else {
                        message.error('操作失败');
                      }
                    }).catch((err) => {
                      console.log(err);
                    }).finally(() => {
                      this.setState({
                        loading: false,
                      });
                    });
                  }}
                  onCancel={() => {
                  }}
                  okText="确定"
                  cancelText="取消">
                  <Button type="primary" size="small">接受订单</Button>
                </Popconfirm>
                &nbsp;
                <Popconfirm
                  title="您确定拒绝该订单吗?"
                  onConfirm={() => {
                    this.setState({
                      loading: true,
                    });
                    refuseOrder(data.id).then((res) => {
                      if (res) {
                        message.success('操作成功');
                        this.query();
                      } else {
                        message.error('操作失败');
                      }
                    }).catch((err) => {
                      console.log(err);
                    }).finally(() => {
                      this.setState({
                        loading: false,
                      });
                    });
                  }}
                  onCancel={() => {
                  }}
                  okText="确定"
                  cancelText="取消">
                  <Button type="danger" size="small">拒绝订单</Button>
                </Popconfirm>
              </>
) : data.status === 20 ? (
  <>
    <Popconfirm
      title="您确定发货吗?"
      onConfirm={() => {
                      this.setState({
                        loading: true,
                      });
                      send({
                        userId: this.props.user.userInfo.data.id,
                        orderId: data.id,
                      }).then((res) => {
                        if (res) {
                          message.success('操作成功');
                          this.query();
                        } else {
                          message.error('操作失败');
                        }
                      }).catch((err) => {
                        console.log(err);
                      }).finally(() => {
                        this.setState({
                          loading: false,
                        });
                      });
                    }}
      onCancel={() => {
                    }}
      okText="确定"
      cancelText="取消">
      <Button type="primary" size="small">发货</Button>
    </Popconfirm>
  </>
)
                : data.status === 30 ? (
                  <>
                    <Popconfirm
                      title="您确定完成订单吗?"
                      onConfirm={() => {
                      this.setState({
                        loading: true,
                      });
                      orderOver({
                        userId: this.props.user.userInfo.data.id,
                        orderId: data.id,
                      }).then((res) => {
                        if (res) {
                          message.success('操作成功');
                          this.query();
                        } else {
                          message.error('操作失败');
                        }
                      }).catch((err) => {
                        console.log(err);
                      }).finally(() => {
                        this.setState({
                          loading: false,
                        });
                      });
                    }}
                      onCancel={() => {
                    }}
                      okText="确定"
                      cancelText="取消">
                      <Button type="primary" size="small">完成订单</Button>
                    </Popconfirm>
                  </>
) : ''
          }
        </div>
),
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: [],
      status: '',
      pagination: {
        pageSize: 10,
        current: 1,
      },
    };
  }

  componentDidMount() {
    this.query();
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  query = () => {
    this.setState({
      loading: true,
    });
    const data = {
      status: this.state.status,
      page: this.state.pagination.current,
      size: this.state.pagination.pageSize,
    };
    pageQueryList(data).then((d) => {
      this.setState((state) => ({
          pagination: {
            ...state.pagination,
            total: d.total,
          },
          dataSource: d.records,
        }));
    }).catch(() => {

    }).finally(() => {
      this.setState({
        loading: false,
      });
    });
  };

  changeHandler = (page, pageSize) => {
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

  render() {
    return (
      <div className={style['order-manager-page-content']}>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={24}>
            <Form
              layout="inline"
              onFinish={(val) => {
                  console.log(val);
                  this.setState((state) => ({
                      status: val.status || '',
                      pagination: {
                        ...state.pagination,
                        current: 1,
                      },
                    }), () => {
                    this.query();
                  });
                }}
              name="basic">
              <Form.Item name="status" label="状态">
                <Select allowClear placeholder="请选择" style={{ width: '220px' }}>
                  <Select.Option value="0">已下单，未付款</Select.Option>
                  <Select.Option value="5">未付款，订单取消</Select.Option>
                  <Select.Option value="10">已付款，待发货</Select.Option>
                  <Select.Option value="15">已拒单，订单取消</Select.Option>
                  <Select.Option value="20">已接单，待配货</Select.Option>
                  <Select.Option value="30">已配送，待收货</Select.Option>
                  <Select.Option value="40">已收货，完成订单</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">查询</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>

        <Table
          rowKey="id"
          scroll={{ x: '120%', y: '50vh', scrollToFirstRowOnChange: true }}
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
      </div>
);
  }
}

export default connect(
  (state) => ({
    user: state.userReducer,
  }),
)(OrderManagerPage);
