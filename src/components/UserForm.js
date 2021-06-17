import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Space, Alert, Row, Col } from 'antd';
import { writeUserData, updateData, deleteData } from '../dataBase/userDataService';
const layout = {
  labelCol: { span: 4, offset: 2 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 16 },
};
const tailLayout2 = {
  wrapperCol: { offset: 13 },
};

const userI = {
  contactName: "",
  phoneNumber: "",
  email: "",
  address: ""
}
function UserForm(props) {

  const [form] = Form.useForm();
  const [userData, setUserData] = useState(userI)
  const [isDelete, setIsDelete] = useState(false)

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
    else if (response.type === "success") {
      setUserData(userI)
      message.success(response.message)
      props.refreshT()
    }
  }

  const onUpdateClick = async () => {
    setIsDelete(false);
    let response = await updateData(userData)
    if (response.type === "error") {
      message.error(response.message)
    }
    else if (response.type === "success") {
      message.success(response.message)
    }
  }

  const onDeleteClick = async () => {
    let response = await deleteData(userData)
    if (response.type === "error") {
      message.error(response.message)
    }
    else if (response.type === "success") {
      message.success(response.message)
      setIsDelete(false)
      props.closeModalCallBack();
    }
  }

  return (
    <>
      <div>
        {props.updateModal ? <div style={{ textAlign: "center", fontSize: '20px', padding: '10px' }}>Update Contact Details</div> : <div style={{ textAlign: "center", fontSize: '20px', padding: '10px' }}>User Contact Details</div>}

        <Form
          {...layout}
          form={form}
          name={"userContacts"}
          onFinish={onFormSubmit}
          title={"User Data"}
        >
          <Form.Item label="Contact Name" name="contactName" rules={[
            {
              required: true,
              message: 'Please insert your Full name!',
            },
          ]}>
            <Input placeholder="Contact name"
              onChange={(e) => setUserData(prev => ({
                ...prev,
                contactName: e.target.value
              }))} />
          </Form.Item>
          <Form.Item label="Phone Number" name="phoneNumber"
            rules={[
              {
                type: 'number'
              },
            ]}
          >
            <Input placeholder="Phone Number"
              onChange={(e) => setUserData(prev => ({
                ...prev,
                phoneNumber: isNaN(e.target.value) ? e.target.value : Number(e.target.value)
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
            <Form.Item {...tailLayout2}>
              <Button type="primary" onClick={onUpdateClick}>
                Update
              </Button>
              <Button type="primary" onClick={() => setIsDelete(true)} danger>
                Delete
              </Button>

            </Form.Item>)
            :
            (<Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>)}

          {isDelete ? <Alert
            message="Are you really want to delete this user?"
            type="error"
            action={
              <Space direction="vertical">

                <Input.Group size="medium" style={{ padding: "20px" }}>
                  <Row gutter={4} >
                    <Col span={16}>
                      <Button size="small" type="primary" onClick={onDeleteClick} >
                        Accept
                      </Button>

                    </Col>

                    <Col span={8}>

                      <Button size="small" danger type="ghost" onClick={() => setIsDelete(false)} >
                        Decline
                      </Button>
                    </Col>
                  </Row>
                </Input.Group>

              </Space>
            }
          /> : ""}

        </Form>
      </div>

    </>
  );
}
export default UserForm