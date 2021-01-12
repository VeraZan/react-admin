import React,{ Component, Fragment } from 'react'
// propTypes
import PropTypes from 'prop-types'
// antd
import { Col, Pagination, Row, Table, Button } from 'antd'
// api
import { tableRequest } from '@/api/request'
import { loadTableData } from '@/api/common'

class TableComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      pageSize: 10,
      total: 0,
      loadingTable: false,  
      keyWork: '',
      dataSource: [],
      selectedRowKeys: []
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
    loadTableData({ 
      url: tableRequest[this.props.config.url],
      method: this.props.config.method,
      data: requestData
    }).then(response => {
      this.setState({
        loadingTable: false
      })
      const responseData = response.data.data
      if(responseData.data) {
        responseData.data.forEach((item, index) => {
          item.key = item[this.props.config.rowKey || 'id']
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

  // 分页改变页码或显示条数
  pageChange = (pageNumber, pageSize) => {
    // 此处setState不立即生效，所以需要在setState的回调里面使用更新后的state
    this.setState({
      pageNumber,
      pageSize
    },() => {
      this.loadData()
    })
  }

  // 表格选中项改变
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }

  render() {
    const { thead, checkbox, pagination, batchBtn } = this.props.config
    const { dataSource, loadingTable, pageNumber, pageSize, total } = this.state
    const rowSelection = {
      onChange: this.onSelectChange
    }
    return (
      <Fragment>
        <Table  
          loading={loadingTable}
          columns={thead} 
          dataSource={dataSource}  
          rowSelection={checkbox ? rowSelection : null} 
          // 使用Table组件自带的Pagination组件不好设置与分页同行的按钮位置，所以此处设置为false，单独设置分页
          pagination={false}           
          bordered 
        />
        <Row>
          <Col span={8}>
            { batchBtn ? <Button 
                onClick={() => this.showConfirm()} 
                className="batch-delete-btn"
              >
                批量删除
              </Button> : null
            }
          </Col>
          <Col span={16}>
            {
              pagination ? <Pagination 
                current= {pageNumber} 
                defaultPageSize= {pageSize} 
                showSizeChanger= {true} 
                showQuickJumper= {true} 
                total= {total} 
                showTotal= {total => `共 ${total} 条数据`} 
                onChange= {(pageNumber, pageSize) => this.pageChange(pageNumber, pageSize)} 
                onShowSizeChange= {(pageNumber, pageSize) => this.pageChange(1, pageSize)}
              /> : null
            }
          </Col>
        </Row>
      </Fragment>
    )
  }
}

TableComponent.propTypes = {
  config: PropTypes.object
}

// 传的话下方设置被覆盖，没传用下方设置
TableComponent.defaultProps = {
  config: {
    batchBtn: false
  }
}

export default TableComponent