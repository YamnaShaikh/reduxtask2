import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUser from './components/AddUser';
import Header from './components/header';
import UserRecords from './components/UserRecords';
import EditUser from './components/EditUser';
import PostList from './components/cards/PostList';

function App() {
  return (
    <div className="App">
   <BrowserRouter>
      <Header />
      <Routes>
      
          <Route path="/" element={<AddUser />} />
          <Route path="/userRecords" element={<UserRecords />} />
          <Route path="/editUser" element={<EditUser />} />
          <Route path="/post" element={<PostList />} />
         
            
 
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
