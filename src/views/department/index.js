import React, { Component, Fragment } from 'react';
import { Link }from 'react-router-dom';
// antd
import { Form, Input, Button, Table, Switch, message, Popconfirm, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
// api
import { GetList, Delete, Status } from '../../api/department'

import TableComponent from '@c/tableData/index'

class DepartmentIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      pageSize: 10,
      total: 0,
      switchChangeId: '',
      loadingTable: false,  
      keyWork: '',
      selectedRowKeys: [],
      dataSource: [],
      columns: [
        {title: '部门名称', dataIndex: 'name', key: 'name'},
        {
          title: '禁启用', 
          dataIndex: 'status', 
          key: 'status',
          width: 80,
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

  componentDidMount(){
    this.loadData()
  }

  // 加载表格数据
  loadData = () => {
    const { pageNumber, pageSize, keyWork } = this.state
    const requestData = {
      pageNumber: pageNumber,
      pageSize: pageSize
    }
    if(keyWork) requestData.name = keyWork
    this.setState({
      loadingTable: true
    })
    GetList(requestData).then(response => {
      this.setState({
        loadingTable: false
      })
      const responseData = response.data.data
      if(responseData.data) {
        responseData.data.forEach((item, index) => {
          item.key = item.id
        })
        this.setState({
          dataSource: responseData.data,
          total: responseData.total
        })
      }
    }).catch(error => {
      this.setState({
        loadingTable: false
      })
    })
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

  // 表格选中项改变
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
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

  pageChange = (pageNumber, pageSize) => {
    // 此处setState不立即生效，所以需要在setState的回调里面使用更新后的state
    this.setState({
      pageNumber,
      pageSize
    },() => {
      this.loadData()
    })
  }

  render() { 
    const { columns, dataSource, loadingTable, pageNumber, pageSize, total } = this.state
    const rowSelection = {
      onChange: this.onSelectChange
    }
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
        <TableComponent columns={columns} />
        <div className="table-wrap">
          <Table 
            loading={loadingTable}
            columns={columns} 
            dataSource={dataSource} 
            rowSelection={rowSelection} 
            // size="middle" 
            pagination={{ 
              defaultCurrent: pageNumber, 
              defaultPageSize: pageSize,
              showSizeChanger: true,
              total: total, 
              showTotal: total => `共 ${total} 条数据`, 
              onChange: (pageNumber, pageSize) => this.pageChange(pageNumber, pageSize), 
              onShowSizeChange: (pageNumber, pageSize) => this.pageChange(1, pageSize) 
            }}           
            bordered
          >
          </Table>
          <Button onClick={() => this.showConfirm()} className="batch-delete-btn">批量删除</Button>
        </div>
      </Fragment>
    )
  }
}
 
export default DepartmentIndex;