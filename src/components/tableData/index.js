import React,{ Component } from 'react'

import { Table } from 'antd'

class TableComponent extends Component {

  render() {
    const { columns } = this.props
    return <Table columns={columns} bordered />
  }
}

export default TableComponent