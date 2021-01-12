import React, { Component, Fragment } from 'react';
import { Link }from 'react-router-dom';
// antd
import { Form, Input, Button, Switch, message, Popconfirm, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
// api
import { Delete, Status } from '@/api/department'

import TableComponent from '@c/tableData/index'

class DepartmentIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {     
      switchChangeId: '',
      keyWork: '',
      tableConfig: {
        url: 'getDepartmentList',
        method: 'post',
        checkbox: true,
        pagination: true,
        batchBtn: true,
        rowKey: 'id',
        thead: [
          {title: '部门名称', dataIndex: 'name', key: 'name'},
          {
            title: '禁启用', 
            dataIndex: 'status', 
            key: 'status',
            width: 100,
            render: (text, rowData) => {
              return <Switch 
                loading={this.state.switchChangeId === rowData.id} 
                checkedChildren="开启" 
                unCheckedChildren="关闭" 
                defaultChecked={rowData.status === "1"} 
                onChange={(checked) => this.onHandlerSwitch(rowData.id, checked)}
              />
              // onChange: 回调函数，checked：在此处为开关状态，开true，关false
            }
          },
          {title: '人员数量', dataIndex: 'number', key: 'number'},
          {
            title: '操作', 
            dataIndex: 'operation', 
            key: 'operation', 
            fixed: 'right', 
            width: 180,
            render: (text, rowData) => {
              return (
                <div className="inline-button">
                  <Button type="primary">
                    <Link to={'/index/department/add?id='+rowData.id}>编辑</Link>
                  </Button>
                  <Popconfirm 
                    placement="topRight" 
                    title="确认删除此数据？删除后将无法恢复！"
                    onConfirm={() => this.onHandlerDelete(rowData.id)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button>删除</Button>
                  </Popconfirm>               
                </div>
              )
            }
          }
        ]
      }
    }
  }

  // 搜索
  onFinish = (value) => {
    // 如果表格正在加载数据，不往下走
    if(this.state.loadingTable) return false
    this.setState({
      keyWork: value.name,
      pageNumber: 1,
      pageSize: this.state.pageSize
    })
    this.loadData()
  }

  // 删除
  onHandlerDelete = (id) => {
    if(!id) {
      if(this.state.selectedRowKeys.length === 0) return false
      id = this.state.selectedRowKeys.join()
    }
    return Delete({ id }).then(response => {
      message.success(response.data.message)
      this.loadData()
      this.setState({
        selectedRowKeys: []
      })
    })
  }

  showConfirm = () => {
    const { confirm } = Modal;
    this.state.selectedRowKeys.length !== 0 && confirm({
      title: '确认删除选中项？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后将无法恢复，请三思而后行',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        // onCancel/onOk 返回 promise 可以延迟关闭。
        return this.onHandlerDelete()
      },
      onCancel: () => {
        // console.log('Cancel');
      },
    });
  }

  // 切换开关状态
  onHandlerSwitch = (id, status) => {
    if(!id) return false
    this.setState({
      switchChangeId: id
    })
    Status({ id, status }).then(response => {
      message.success(response.data.message)
      this.setState({
        switchChangeId: ''
      })
    }).catch(error => {
      this.setState({
        switchChangeId: ''
      })
    })
  }

  render() { 
    return ( 
      <Fragment>
        <Form layout="inline" onFinish={this.onFinish}>
          <Form.Item label="部门名称" name="name">
            <Input />
          </Form.Item>     
          <Form.Item>      
            <Button type="primary"  htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
        <div className="table-wrap">
          <TableComponent config={this.state.tableConfig} />         
        </div>
      </Fragment>
    )
  }
}
 
export default DepartmentIndex;