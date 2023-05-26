import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUser from './components/AddUser';
import Header from './components/header';
import UserRecords from './components/UserRecords';
import EditUser from './components/EditUser';

function App() {
  return (
    <div className="App">
   <BrowserRouter>
      <Header />
      <Routes>
      
          <Route path="/" element={<AddUser />} />
          <Route path="/userRecords" element={<UserRecords />} />
          <Route path="/editUser" element={<EditUser />} />
         
            
 
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
