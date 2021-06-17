import React from "react";
import UserForm from './components/UserForm';
import UserData from './components/UserData';

const App=()=> {
  return (<>
  <div style={{width:"600px"}}><UserForm></UserForm></div>
   
   <UserData></UserData>
   </>
  );
}

export default App;
