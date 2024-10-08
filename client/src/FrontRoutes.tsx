import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainApp from './TasksPage';  
import store from "./store/store"
import { Provider } from 'react-redux';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" 
              element={<Provider store={store}> <MainApp/> </Provider> } />  {/* MainApp now expects userId via navigate */}
      </Routes>
    </Router>
  );
}

export default App;
