/**
 * @author tanxin
 * @date $
 * @Description: 蛋糕管理页面
 */
import React from 'react';

import {
  Table,
  Form,
  Col,
  Row,
  Button,
  Input,
  Checkbox,
  Popconfirm,
  message,
  Image,
  notification,
  Modal,
  Select,
  Upload,
  Tag,
} from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import style from "./index.module.scss";

import {
  getAllCategories,
  getCakesByPage,
  deleteCake,
  updateCake,
  addCake,
} from "../../../api/cake"

import {
  getKey,
  previewFile,
  uploadFile,
} from "../../../api/commom";

// 蛋糕管理页面
class CakeMangerPage extends React.Component {

  componentWillUnmount() {
    this.setState = () => false;
  }

  columns = [
    {
      title: '蛋糕名称',
      dataIndex: 'name',
      key: 'name',
      width: "200px",
      render(data, record) {
        return <Button type={"link"} onClick={() => {
          notification.open({
            message: '蛋糕详情',
            description: record.detail,
          });
        }}>{data}</Button>
      }
    },
    {
      title: '蛋糕图片',
      dataIndex: 'cakeImgs',
      key: 'cakeImgs',
      align: 'center',
      render(data) {
        return <Image
          width={45}
          src={previewFile(data)}
          fallback="data:image/png;base64,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"/>;
      }
    },
    {
      title: '类型',
      dataIndex: 'cakeProductCategories',
      key: 'cakeProductCategories',
      render(data) {
        return data.name;
      }
    },
    {
      title: '是否推荐',
      dataIndex: 'recommendStatus',
      key: 'recommendStatus',
      width: '100px',
      align: 'center',
      render(data) {
        return data === 0 ? <Tag color={""}>不推荐</Tag> : <Tag color={"#f50"}>推荐</Tag>;
      }
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
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
      width: "200px",
    },
    {
      title: '操作',
      align: 'center',
      width: "200px",
      render: (data) => {
        return <div>
          <Popconfirm
            title="您确定删除该类型吗?"
            onConfirm={() => {
              deleteCake(data.id).then(res => {
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
            <Button danger icon={<DeleteOutlined/>} size={"small"}>删除</Button>
          </Popconfirm>

          <Button onClick={() => {
            console.log(data);
            this.setState(state => {
              return {
                fileList: [
                  {
                    name: '蛋糕',
                    status: 'done',
                    uid: data.cakeImgs,
                    url: previewFile(data.cakeImgs)
                  }
                ],
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
    categories: [],
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
    // 分类集合
    categoriesId: [],
    // 表格数据
    dataSource: [],
    // 模态框ref
    form: React.createRef(),
    // 蛋糕
    fileList: [],
    // 模态框对象
    modalObj: {
      show: false,
      // 是否编辑
      edit: false,
      initObj: {
        id: '',
        name: '',
        cakeImgs: '',
        cakeProductCategoriesId: null,
        recommendStatus: '',
        detail: '',
        price: '',
        remark: '',
      },
    }
  };

  componentDidMount() {
    this.getAllCategories();
    this.query();
    this.getPrimaryKey();
  }

  // 获取主键
  getPrimaryKey = () => {
    getKey(1).then(data => {
      this.setState({
        id: data[0]
      })
    }).catch(err => {
    });
  };

  // 查询
  query = () => {
    this.setState({
      loading: true,
    });
    let data = {
      keywords: this.state.keyword,
      categoriesId: this.state.categoriesId,
      page: this.state.pagination.current,
      size: this.state.pagination.pageSize,
    };
    getCakesByPage(data).then(res => {
      this.setState(state => {
        return {
          pagination: {
            ...state.pagination,
            total: res.total,
          },
          dataSource: res.records,
        }
      });
    }).catch(err => {

    }).finally(() => {
      this.setState({
        loading: false,
      });
    });
  };

  getAllCategories = () => {
    getAllCategories().then(res => {
      this.setState({
        categories: res,
      })
    }).catch(err => {
      console.log(err);
    })
  };

  // 模态框保存回调
  modalOkHandler = () => {
    this.state.form.current.validateFields().then(data => {
      if (data.recommendStatus) {
        data.recommendStatus = 1;
      } else {
        data.recommendStatus = 0;
      }
      data.cakeImgs = this.state.fileList[0].uid;
      if (this.state.modalObj.edit === false) {
        data.id = this.state.id;
        addCake(data).then(res => {
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
          } else {
            message.error("操作失败")
          }
        }).catch(err => {
          console.log(err);
        })
      } else {
        data.id = this.state.modalObj.initObj.id;
        updateCake(data).then(res => {
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
          } else {
            message.error("操作失败")
          }
        }).catch(err => {
          console.log(err);
        })
      }
    }).catch(err => {
      console.log(err);
    })
  };

  // 模态框取消回调
  modalCancelHandler = () => {
    this.setState(state => {
      return {
        fileList: [],
        modalObj: {
          ...state.modalObj,
          show: false,
          edit: false,
          initObj: {
            name: '',
            cakeImgs: '',
            cakeProductCategoriesId: null,
            recommendStatus: '',
            detail: '',
            price: '',
            remark: '',
          }
        }
      }
    }, () => {
      this.state.form.current.resetFields();
    })
  };

  // 表格分页改变
  changeHandler = (page, pageSize) => {
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


  // 删除头像
  removeImgHandler = (data) => {
    message.info("图片修改后，需要”保存“才生效");
    this.setState({
      fileList: [],
    });
  };

  // 上传图片
  uploadImgHandler = (data) => {
    let formData = new FormData();
    formData.append("file", data.file);
    this.setState({
      fileList: [
        {
          name: '蛋糕',
          uid: new Date().getTime(),
          status: 'uploading',
        }
      ]
    });
    uploadFile(formData).then(res => {
      this.setState({
        fileList: [
          {
            name: '蛋糕',
            status: 'done',
            uid: res,
            url: previewFile(res)
          }
        ]
      });
    }).catch(err => {

    });
  };

  render() {
    const uploadButton = (
      <div>
        <PlusOutlined/>
      </div>
    );

    return <div className={style['cake-manager-page-content']}>
      <Row className={style['search-wrapper']}>
        <Col span={16}>
          <Form
            layout={"inline"}
            name="basic"
            onFinish={(data) => {
              this.setState(state => {
                return {
                  keyword: data.keyword,
                  categoriesId: data.categoriesId,
                  pagination: {
                    ...state.pagination,
                    current: 1,
                  }
                }
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
            <Form.Item label="种类" name="categoriesId">
              <Checkbox.Group>
                {
                  this.state.categories.map(item => {
                    return <Checkbox key={item.id} value={item.id}>{item.name}</Checkbox>;
                  })
                }
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
          }}>添加蛋糕</Button>
        </Col>
      </Row>

      <Table
        rowKey="id"
        bordered
        loading={this.state.loading}
        dataSource={this.state.dataSource}
        scroll={{y: '50vh', scrollToFirstRowOnChange: true,}}
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

      {/*编辑、新增的模态框*/}
      <Modal
        title={this.state.modalObj.edit ? "蛋糕信息编辑" : "添加蛋糕"}
        visible={this.state.modalObj.show}
        onOk={this.modalOkHandler}
        onCancel={this.modalCancelHandler}
      >
        <div className={style['modal-content']}>
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
            <Form.Item label={"蛋糕图片"} rules={[{required: true, message: '蛋糕图片不可为空',}]}>
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
              label="蛋糕名称"
              name="name"
              rules={[{required: true, message: '蛋糕不可为空'}]}
            >
              <Input autoComplete={"off"} placeholder={"请输入"}/>
            </Form.Item>
            <Form.Item
              label={"类型"}
              name="cakeProductCategoriesId"
              rules={[{required: true, message: '蛋糕图片不可为空',}]}>
              <Select placeholder="请选择类型" allowClear>
                {
                  this.state.categories.map(data =>
                    <Select.Option
                      key={data.id}
                      value={data.id}>{data.name}</Select.Option>)
                }
              </Select>
            </Form.Item>
            <Form.Item
              label="详情说明"
              name="detail"
              rules={[{required: true, message: '详情说明不可为空'}]}
            >
              <Input.TextArea autoComplete={"off"} placeholder={"请输入"}/>
            </Form.Item>
            <Form.Item
              label="价格"
              name="price"
              rules={[{required: true, message: '价格不可为空'}]}
            >
              <Input autoComplete={"off"} placeholder={"请输入"}/>
            </Form.Item>
            <Form.Item label="是否推荐" name="recommendStatus" valuePropName="checked">
              <Checkbox>推荐</Checkbox>
            </Form.Item>
            <Form.Item
              label="备注"
              name="remark"
            >
              <Input autoComplete={"off"} placeholder={"请输入"}/>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  }
}

export default CakeMangerPage;
