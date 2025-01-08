import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MainLayout from './layouts/MainLayout';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<LandingPage />} />

          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;