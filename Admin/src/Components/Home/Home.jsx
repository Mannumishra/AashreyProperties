import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Header from '../Header/Header'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import AllUsers from '../../Pages/Users/AllUsers'
import AllLocation from '../../Pages/Location/AllLocation'
import AllProperty from '../../Pages/Property/AllProperty.jsx'
import Login from '../Auth/Login'
import ErrorPage from '../../Pages/Error/ErrorPage'
import AddProperty from '../../Pages/Property/AddProperty.jsx'
import EditProperty from '../../Pages/Property/EditProperty.jsx'
import AllPropertyByVendor from '../../Pages/PropertyByVendor/AllPropertyByVendor.jsx'
import AddBlog from '../../Pages/Blog/AddBlog.jsx'
import AllBlog from '../../Pages/Blog/AllBlog.jsx'
import EditBlog from '../../Pages/Blog/EditBlog.jsx'

const Home = () => {
  const hansAdminToken = sessionStorage.getItem("Login");

  return (
    <>
      {hansAdminToken ? (
        <>
          <Header />
          <div className="rightside">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Category */}
              <Route path="/all-locations" element={<AllLocation />} />

              {/* Product */}
              <Route path="/all-properties" element={<AllProperty />} />
              <Route path="/add-property" element={<AddProperty />} />
              <Route path="/edit-property/:id" element={<EditProperty />} />

              <Route path="/all-vendor-properties" element={<AllPropertyByVendor />} />
              
              {/* Users */}
              <Route path="/all-users" element={<AllUsers />} />


              <Route path="/add-blog" element={<AddBlog />} />
              <Route path="/all-blog" element={<AllBlog />} />
              <Route path="/edit-blog/:id" element={<EditBlog />} />

              {/* Fallback */}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          {/* Redirect to Login */}
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default Home;
