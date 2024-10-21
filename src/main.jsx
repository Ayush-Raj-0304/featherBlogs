import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AuthLayer from './components/AuthLayer/AuthLayer.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import AllPosts from './pages/AllPosts.jsx';
import AddPost from './pages/AddPost.jsx';
import EditPost from './pages/EditPost.jsx';
import Post from './pages/Post.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: (
          <AuthLayer authentication={false}>
            <LoginPage />
          </AuthLayer>
        ),
      },
      {
        path: '/signup', // Corrected path
        element: (
          <AuthLayer authentication={false}>
            <SignupPage />
          </AuthLayer>
        ),
      },
      {
        path: '/all-posts',
        element: (
          <AuthLayer authentication={true}>
            <AllPosts />
          </AuthLayer>
        ),
      },
      {
        path: '/add-post',
        element: (
          <AuthLayer authentication = {true}>
            <AddPost/>
          </AuthLayer>
        ),
      },
      {
        path: '/edit-post/:postId',
        element: (
          <AuthLayer authentication={true}>
            <EditPost />
          </AuthLayer>
        ),
      },
      {
        path: '/post/:postId',  // Ensure the dynamic segment matches what's used in useParams
        element: <Post />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
