import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Reviewer from './pages/Reviewer';
import Approver from './pages/Approver';
import Viewdocs from './pages/Viewdocs';
import Viewdoc from './pages/Viewdoc';
import Adddoc from './pages/Adddoc';
import Editdoc from './pages/Editdoc';
import Releasenotes from './pages/Releasenotes';


function App() {
  return (
      <>
          <Navbar/>

          <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<Home />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/rdashboard' element={<Reviewer />} />
              <Route path='/adashboard' element={<Approver />} />
              <Route path='/viewdocs' element={<Viewdocs />} />
              <Route path='/viewdoc/:id' element={<Viewdoc />} />
              <Route path='/adddoc' element={<Adddoc />} />
              <Route path='/editdoc/:id' element={<Editdoc />} />
              <Route path='/releasenotes' element={<Releasenotes />} />
          </Routes>
      </>
  );
}

export default App;
