import React from 'react';
import { Route, Routes } from 'react-router-dom';

import '../styles/App.css';
import Layout from "./Layout";
import NoMatch from './NoMatch';
import Main from './Main';
import RequireAuth from './RequireAuth';
import Logout from './Logout';
import LoginForm from './LoginForm';
import RequestFormClass from './RequestFormClass';
import SearchResults from './SearchResults';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Main />} />
          <Route path="request" element={
                <RequireAuth>
                  <RequestFormClass />
                </RequireAuth>    
                } />
          <Route path="login" element={<LoginForm />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
