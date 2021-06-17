import React,{useState} from "react";
import UserForm from './components/UserForm';
import UserData from './components/UserData';
import { Layout, Divider } from "antd";
const { Header, Content, Footer, Sider } = Layout;


const App = () => {
  const refreshTable=()=>{
    setRefresh(prev=>{
      return !prev 
    })
  }
  const [refresh,setRefresh]=useState(false)
  return (<>
    <Layout >
     
      <Layout  >
        <Header className="site-layout-sub-header-background" />
        <Content style={{ margin: '24px 16px 0', padding: 20, float: 'right' }}>
        
            <div style={{width: '50%',margin: '0 auto'}}>
              <UserForm refreshT={refreshTable}></UserForm>
            </div>
            <Divider />
            <UserData onDataSubmit={refresh}></UserData>
        </Content>

      </Layout>
    </Layout>
  </>
  );
}

export default App;
