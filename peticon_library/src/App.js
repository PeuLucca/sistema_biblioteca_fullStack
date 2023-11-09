// Core
import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

// Screens
import Home from './Home';
import NewLivro from './NewLivro';
import NewMembro from "./NewMembro";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/novoLivro" element={<NewLivro />}/>
        <Route path="/novoMembro" element={<NewMembro />}/>
      </Routes>
    </Router>
  );
}

export default App;
