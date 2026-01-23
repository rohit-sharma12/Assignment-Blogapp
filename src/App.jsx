import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/createPost';
import ProtectedRoute from './components/ProtectedRoute';
import EditPost from './pages/EditPost';
import MyPosts from './pages/MyPosts';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetail />} />

        <Route path="/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path='/edit/:id' element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
        <Route path="/my-posts" element={<ProtectedRoute><MyPosts /></ProtectedRoute>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
