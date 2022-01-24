import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Map from './components/Map/Map';
import Nav from './components/Nav/Nav';
import Vehicles from './components/Vehicles/Vehicles';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="App dark:bg-black">
        <ToastContainer style={{ zIndex: 999999 }} />
        <Nav />
        <Routes>
          <Route path="/" element={<Map />}/>
          <Route path="/dashboard" element={<Map />}/>
          <Route path="/vehicles" element={<Vehicles />}/>
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
