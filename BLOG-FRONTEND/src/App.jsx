import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'

import UserDashboard from './components/UserDashboard'
import AuthorDashboard from './components/AuthorDashboard'
import AdminDashboard from './components/AdminDashboard'
import ArticleByID from "./components/ArticleByID"
import {Toaster} from 'react-hot-toast'
import EditArticle from './components/EditArticleForm'
import WriteArticle from "./components/WriteArticle"
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from './components/Unauthorized'

function App() {
  const routerObj=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      errorElement:<></>,
      children:[
        {
          path:"",
          element:<Home/>,
        },
        {
          path:"register",
          element:<Register/>,
        },
        {
          path:"Login",
          element:<Login/>,
        },
        {
          path:"addarticle",
          element:
          <ProtectedRoute allowedRoles={["AUTHOR"]}>
            <WriteArticle/>
          </ProtectedRoute>,
        },
        {
          path:"user-dashboard",
          element:
          <ProtectedRoute allowedRoles={["USER"]}>
          <UserDashboard/>
          </ProtectedRoute>,
        },
        {
          path:"author-dashboard",
          element:
          <ProtectedRoute allowedRoles={["AUTHOR"]}>
          <AuthorDashboard/>
          </ProtectedRoute>,
        },
        {
          path:"admin-dashboard",
          element:
          <ProtectedRoute allowedRoles={["ADMIN"]}>
          <AdminDashboard/>
          </ProtectedRoute>,
        },
        {
          path:"article/:articleId",
          element:<ArticleByID/>,
        },
        {
          path:"edit-article/:id",
          element:
          <ProtectedRoute allowedRoles={["AUTHOR"]}>
          <EditArticle/>
          </ProtectedRoute>,
        },
        {
          path:"write-article",
          element:
          <ProtectedRoute allowedRoles={["AUTHOR"]}>
          <WriteArticle/>
          </ProtectedRoute>,
        },
        {
          path:"/unauthorized",
          element:<Unauthorized/>
        }
      ]
    },

  ])
  return (<>
  <Toaster position='top-center' reverseOrder={false}/>
  <RouterProvider router={routerObj}/>;
  </>)
}

export default App
