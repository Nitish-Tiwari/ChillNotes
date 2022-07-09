import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NavBar from './components/Navbar'
import Home from './components/Home.js';
import About from './components/About.js';
import NoteState from './context/notes/NotesState.js';
import Alert from './components/Alert.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import { useState } from 'react';
import Users from './components/Users.js';
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>

        <Router>
          <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>

            <NavBar />
            <Alert alert={alert} />
            <div className="container">

              <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert} />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/profile" element={<Users />} />
                <Route exact path="/login" element={<Login showAlert={showAlert} />} />
                <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
              </Routes>
            </div>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
