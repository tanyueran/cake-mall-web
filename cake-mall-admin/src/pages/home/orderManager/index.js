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
  Input,
  Select,
  Button,
  Table,
  Tag,
} from "antd";

import {connect} from 'react-redux';

import {
  pageQueryList,
} from "../../../api/order.js";

import style from "./index.module.scss";

// 订单管理页面
class OrderManagerPage extends React.Component {
  static stateToProps(state) {
    return {
      user: state.userReducer
    }
  }

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
      }
    },
    {
      title: '订单情况',
      width: 180,
      render(data) {
        return `${data.price}(元/个) * ${data.number}个 = ${data.totalPrice}元`;
      }
    },
    {
      title: '购买人',
      dataIndex: 'buyUser',
      key: 'buyUser',
      render(data) {
        return `${data.nickname}(${data.userName})`;
      }
    },
    {
      title: '操作人',
      dataIndex: 'actionUser',
      key: 'actionUser',
      render(data) {
        if (data) {
          return `${data.nickname}(${data.userName})`;
        } else {
          return "-"
        }
      }
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(data) {
        return <Tag>
          {
            data === 0 ? '已下单，未付款' :
              data === 5 ? '未付款，订单取消' :
                data === 10 ? '已付款，待发货' :
                  data === 15 ? '已拒单，订单取消' :
                    data === 20 ? '已接单，待配货' :
                      data === 30 ? '已配送，待收货' :
                        data === 40 ? '已收货，完成订单' : '数据有问题'
          }
        </Tag>;
      }
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
      width: 200,
      render(data) {
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
        return <div>
          {
            data.status === 10 ? <><Button>接受订单</Button><Button>拒绝订单</Button></> :
              data.status === 20 ? <Button>发货</Button> :
                data.status === 30 ? <Button>完成订单</Button> : ''
          }
        </div>;
      }
    }
  ];

  state = {
    loading: false,
    dataSource: [],
    status: '',
    pagination: {
      pageSize: 10,
      current: 1,
    },
  };

  componentWillUnmount() {
    this.setState = () => false;
  }

  componentDidMount() {
    this.query();
  }

  query = () => {
    this.setState({
      loading: true,
    });
    let data = {
      status: this.state.status,
      page: this.state.pagination.current,
      size: this.state.pagination.pageSize,
    };
    pageQueryList(data).then(data => {
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

  changeHandler = () => {

  };

  render() {
    return <div className={style['order-manager-page-content']}>
      <Row style={{marginBottom: '10px'}}>
        <Col span={24}>
          <Form layout={"inline"}
                onFinish={(val) => {
                  console.log(val);
                  this.setState(state => {
                    return {
                      status: val.status || '',
                      pagination: {
                        ...state.pagination,
                        current: 1,
                      }
                    }
                  }, () => {
                    this.query();
                  })
                }}
                name="basic">
            <Form.Item name={"status"} label={"状态"}>
              <Select allowClear placeholder={"请选择"} style={{width: '220px'}}>
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
              <Button htmlType="submit" type={"primary"}>查询</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Table
        rowKey="id"
        scroll={{x: '120%', scrollToFirstRowOnChange: true,}}
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
        columns={this.columns}/>
    </div>
  }
}

export default connect(OrderManagerPage.stateToProps)(OrderManagerPage);
