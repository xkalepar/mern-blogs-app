import { Routes, Route } from 'react-router-dom';
import LayOut from './components/LayOut';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { UserContextProvider } from './components/UserContext';
import CreatePostPage from './pages/CreatePostPage';
import { AuthProvider, useAuth } from './components/AuthContext';
import PrivateRoute from './components/PrivateComponent';
import './App.css';
import PostPage from './pages/PostPage';
import EditPostPage from './pages/EditPostPage';

function App() {
  
  return (
    <UserContextProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LayOut />}>
            <Route path="/" element={<IndexPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path='/post/create'element={<CreatePostPage/>}/>
              <Route path='/edit/:id'element={<EditPostPage/>}/>
            </Route>
              <Route path='/post/:id' element={<PostPage/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </UserContextProvider>
  );
}

export default App;