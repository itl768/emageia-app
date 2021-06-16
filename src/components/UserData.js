import React,{useState} from 'react'
import { Table,Input,Row,Col,Modal } from 'antd';
import UserForm from './UserForm';
import _ from 'lodash'



const dataSource = [
    {
      key: '1',
      contactName: 'Mike',
      phoneNumber: 32,
      address: '10 Downing Street',
      email:"lakmal@gmail.com"
    },
    {
      key: '2',
      contactName: 'John',
      phoneNumber: 32,
      address: '10 Downing Street',
      email:"lakmal@gmail.com"
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'contactName',
      key: 'contactName',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
  ];
  
 


function UserData() {

    const [filterTable, setFilterTable] = useState(null);
    const [baseData, setBaseData] = useState(dataSource);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentUser,setCurrentUser] = useState("")


    const onRowClick = (record, rowIndex) => {
       // console.log(record, rowIndex)
       
        setCurrentUser(record)
        setIsModalVisible(true);

    }
    const handleCancel = () => {
        setIsModalVisible(false);
      };

    const search = value => {
        setFilterTable(baseData.filter(o =>
            Object.keys(o).some(k =>
                String(o[k])
                    .toLowerCase()
                    .includes(value.toLowerCase())
            )
        ))
    };

    return (<>
        <Col   style={{ width: '900px', padding: '20px' }}>
        <Row justify="end">
            <Input.Search
                style={{ width: '300px', padding: '20px' ,flexWrap: 'wrap',
                alignContent: 'center'}}
                placeholder="Search by..."
                enterButton
                onChange={(e) => search(e.target.value)}
            />
        </Row>

        <Row>
            <Table

            style={{ width: '100%', padding: '20px' }}
                bordered
                dataSource={filterTable == null ? baseData : filterTable}
                columns={columns}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => { onRowClick(record, rowIndex) }, // click row

                    };
                }} />
        </Row>
        </Col>


        <Modal title="Update or delete data" visible={isModalVisible}  onCancel={handleCancel} footer={null}>
        <UserForm userData={currentUser} updateModal={true} ></UserForm>
      </Modal>
    </>

    )
}

export default UserData
