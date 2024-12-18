import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './pages/home-page/HomePage.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/error-page/ErrorPage.tsx";
import App from "./App.tsx";
import AuthenticationPage from "./pages/authentication-page/AuthenticationPage.tsx";
import {Provider} from "react-redux";
import store from "./store/store.ts";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute> <App/> </ProtectedRoute>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/', element: <HomePage/>
      },
      {
        path: '/authentication', element:
            <AuthenticationPage/>
      },

      // {path: '*', element: <NotFoundPage/>}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
)