import React, { StrictMode } from 'react';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import MainLayout from './MainPageComponent/MainLayout';
import './GlobalStyleFolder/App.css';
import UserLayout from './UserLayoutPage/UserLayout';
import LoginPage from './LoginPageContainer/LoginPage';
import SignUp from './LoginPageContainer/SignUp';
import Admin from './LoginPageContainer/Admin';
import EditPage from './LoginPageContainer/EditPage';
import AdminEdit from './LoginPageContainer/AdminEdit.jsx';


const App = () => {
  return (
    <StrictMode>

        <Router>
          <Routes>

            <Route path='/' element={<LoginPage/>} />
            <Route path='/signUp/AXRYVSSSC' element={<SignUp/>} />
            <Route path='/editUp/AXRYVSSED/:id' element={<EditPage/>} />
            <Route path='/admin/AXRYVSCDFV' element={<MainLayout/>}/>
            <Route path='/admin/user' element={<Admin/>}/>
            <Route path='/user/:id' element={<UserLayout/>} />
            <Route path='/admin/EXSWDWITDSS' element={<AdminEdit/>} />
            
          </Routes>
        </Router>


    </StrictMode>
  )
}

export default App;