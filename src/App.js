import { BrowserRouter , Routes, Route} from 'react-router-dom'
import Sign_up from './components/Sign_up';
import Sign_in from './components/Sign_in';
import Home from './components/Home';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Registration from './components/Registration';
import CostumerService from './components/CostumerService';
import Doctor_dash from './components/Doctor_dash';
import Add_patient from './components/Add_patient';
import Redirect from './components/Redirect';
import Add_medication from './components/Add_medication';
import View_patient from './components/View_patient';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Sign_up/>}/>
      <Route path='/sign_up' element={<Sign_up/>}/>
      <Route path='/sign_in' element={<Sign_in/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/redirect' element={<Redirect/>}/>
      <Route path='/registration' element={<Registration/>}/>
      <Route path='/cs_dashboard' element={<CostumerService/>}/>
      <Route path='/add_patient' element={<Add_patient/>}/>
      <Route path='/add_medication' element={<Add_medication/>}/>
      <Route path='/view_patient' element={<View_patient/>}/>
      <Route path='/doc_dashboard' element={<Doctor_dash/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
