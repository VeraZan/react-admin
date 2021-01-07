import React, { Component } from 'react';
// antd
import { Form, Input, InputNumber, Radio, Button, message, Spin } from 'antd';
// api
import { DepartmentAddApi, Detailed, DepartmentEditApi } from '@/api/department';

import { GetQueryValue } from '@/utils/global';

class DepartmentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      formLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 20 },
      },
      btnLayout: {
        wrapperCol: { offset: 3 }
      },
      formDefaultValue: {
        number: 0,
        status: true
      },
      loading: false,
      formLoading: false
    }
  }

  UNSAFE_componentWillMount() {
    const id = GetQueryValue('id', this.props.location.search)
    id && this.setState({ id })
  }

  componentDidMount() {
    this.state.id && this.getDetailed(this.state.id)
  }

  getDetailed = (id) => {
    this.setState({
      formLoading: true
    })
    Detailed({ id }).then(response => {
      const data = response.data
      this.refs.form.setFieldsValue(data.data)
      this.setState({
        formLoading: false
      })
    })
  }

  onSubmit = (value) => {
    this.setState({
      loading: true
    })
    this.state.id ? this.onHandlerEdit(value) : this.onHandlerAdd(value)
  }

  onHandlerAdd = (value) => {
    DepartmentAddApi(value).then(response => {
      const data = response.data
      message.success(data.message)
      this.setState({
        loading: false
      })
      this.refs.form.resetFields()
    }).catch(error => {
      this.setState({
        loading: false
      })
    })
  }

  onHandlerEdit = (value) => {
    value.id = this.state.id
    DepartmentEditApi(value).then(response => {
      const data = response.data
      message.success(data.message)
      this.setState({
        loading: false
      })
      this.props.history.push("/index/department/index");
    }).catch(error => {
      this.setState({
        loading: false
      })
    })
  }

  goBack = () => {
    this.state.id && this.props.history.goBack()
  }

  render() { 
    return (
      <Spin spinning={this.state.formLoading}>
        <Form ref="form" {...this.state.formLayout} onFinish={this.onSubmit} initialValues={this.state.formDefaultValue}>
          <Form.Item label="部门名称" name="name" rules={[{ required: true, message: '请输入部门名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="人员数量" name="number" rules={[{ required: true, message: '请输入人员数量' },{ type: 'number', min: 1, message: '请输入大于0的数字' }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item label="禁启用" name="status" rules={[{ required: true, message: '请选择禁启用' }]}>
            <Radio.Group>
              <Radio value={false}>禁用</Radio>
              <Radio value={true}>启用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="描述" name="content" rules={[{ required: true, message: '请输入描述' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item {...this.state.btnLayout}>
            <Button type="primary" htmlType="submit" loading={this.state.loading}>
              确定
            </Button>
            {
              this.state.id ? (
                <Button htmlType="button" onClick={this.goBack}>
                  返回
                </Button>
              ):null
            }
          </Form.Item>
        </Form>
      </Spin> 
    )
  }
}
 
export default DepartmentAdd;