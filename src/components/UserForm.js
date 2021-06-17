import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { writeUserData, getData, updateData, deleteData } from '../dataBase/userDataService';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
function UserForm(props) {

  const [form] = Form.useForm();
  const [userData, setUserData] = useState({
    contactName: "",
    phoneNumber: "",
    email: "",
    address: ""
  })
  const [response, setResponse] = useState("")
  const [onSuccess, setOnSuccess] = useState(false)
  useEffect(() => {
    if (props.userData) {
      setUserData(props.userData)
    }
  }, [props])


  form.setFieldsValue(userData);


  const onFormSubmit = async () => {
    let response = await writeUserData(userData)
    if (response.type === "error") {
      message.error(response.message)
    }
    else if(response.type==="success"){
      message.success(response.message)
    }
  }

  const onUpdateClick= async ()=>{
    let response = await updateData(userData)
    if (response.type === "error") {
      message.error(response.message)
    }
    else if(response.type==="success"){
      message.success(response.message)
    }
  }

  const onDeleteClick= async ()=>{
    let response=await deleteData(userData)
    if (response.type === "error") {
      message.error(response.message)
    }
    else if(response.type==="success"){
      message.success(response.message)
    }
  }

  return (
    <>
      <div style={{ width: 'auto', paddingTop: '20px', paddingRight: '20px', paddingBottom: '20px' }}>

        <Form
          {...layout}
          form={form}
          name={"userContacts"}
          onFinish={onFormSubmit}
        >
          <Form.Item label="Contact Name" name="contactName" rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}>
            <Input placeholder="Contact name"
              onChange={(e) => setUserData(prev => ({
                ...prev,
                contactName: e.target.value
              }))} />
          </Form.Item>
          <Form.Item label="Phone Number" name="phoneNumber">
            <Input placeholder="Phone Number"
              onChange={(e) => setUserData(prev => ({
                ...prev,
                phoneNumber: e.target.value
              }))} />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input placeholder="Address"
              onChange={(e) => setUserData(prev => ({
                ...prev,
                address: e.target.value
              }))} />
          </Form.Item >
          <Form.Item label="Email" name="email" rules={[
            {
              type: "email",
            }]}>
            <Input placeholder="Email"
              onChange={(e) => setUserData(prev => ({
                ...prev,
                email: e.target.value
              }))} />


          </Form.Item>
          {props.updateModal ? (
            <Form.Item {...tailLayout}>
              <Button type="primary" onClick={onUpdateClick}>
                Update
              </Button>
              <Button type="primary" onClick={onDeleteClick} danger>
                Delete
              </Button>

            </Form.Item>)
            :
            (<Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>)}

        </Form>
      </div>
    </>
  );
}
export default UserForm