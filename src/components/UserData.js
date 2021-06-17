import React, { useState, useEffect } from 'react'
import { Table, Input, Row, Col, Modal,Button } from 'antd';
import UserForm from './UserForm';
import { getData } from '../dataBase/userDataService'


const columns = [
    {
        title: 'Name',
        dataIndex: 'contactName',
        key: 'contactName',
       
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
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


function UserData(props) {

    const [filterTable, setFilterTable] = useState(null);
    const [baseData, setBaseData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState("")
    const fetchData = async () => {
        const data = await getData()
        setBaseData(data)
    }
    useEffect(() => {
        fetchData()
    }, [isModalVisible,props.onDataSubmit])
    const onRowClick = (record, rowIndex) => {
        setCurrentUser(record)
        setIsModalVisible(true);

    }
    const refreshData=()=>{
        fetchData();
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

    const closeModal=()=>{
        setIsModalVisible(false);
    }


    return (<>
     <div style={{ textAlign:"center",fontSize:'20px' }}>User Contact Details</div>
        <Col style={{ width: 'auto' }}>

            <Input.Group size="medium" style={{padding:"20px"}}>
                <Row gutter={8} justify="end">
                    <Col span={5}>
                        <Input.Search

                            placeholder="Search by..."
                            enterButton
                            onChange={(e) => search(e.target.value)}
                        />
                    </Col>
                    <Col >
                        <Button type="primary" onClick={refreshData}>Refresh</Button>
                    </Col>
                </Row>
            </Input.Group>



            <Row>
                <Table

                    style={{ width: '100%', cursor: 'pointer' }}
                    bordered
                    dataSource={filterTable == null ? baseData : filterTable}
                    columns={columns}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => { onRowClick(record, rowIndex) }, // click row
                            onMouseEnter: () => { },

                        };
                    }} />
            </Row>
        </Col>


        <Modal  visible={isModalVisible} onCancel={handleCancel} footer={null} width={700} >
            <UserForm userData={currentUser} updateModal={true} closeModalCallBack={closeModal} ></UserForm>
        </Modal>
    </>

    )
}

export default UserData
