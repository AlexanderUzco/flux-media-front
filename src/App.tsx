import { AuthProvider } from './contexts/authContext';
import AppRouter from './router/AppRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRouter />
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
