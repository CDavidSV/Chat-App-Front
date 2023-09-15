import React, { useState } from 'react';
import { AccessTokenProvider } from './AccessTokenContext';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AccessTokenProvider>
      {isLoggedIn ? <Home /> : <Login onLoginSuccess={() => setIsLoggedIn(true)} />}
    </AccessTokenProvider>
  );
}

export default App;