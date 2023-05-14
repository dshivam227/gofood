
import './App.css';
import Home from './screens/Home';
import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Router,
} from "react-router-dom";
import Login from './screens/Login';
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from './screens/Signup';
import { Cartprovider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';


function App() {
  return (
    <Cartprovider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/createuser" element={<Signup />}></Route>
          <Route path="/myOrder" element={<MyOrder />}></Route>
        </Routes>
      </BrowserRouter>
    </Cartprovider>
  );
}

export default App;
