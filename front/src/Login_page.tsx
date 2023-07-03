import React from 'react';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    // Todo

    window.location.href = ('https://LINK_TO_LOG'); //### LINK TO ADD ###//
  };

  return (
    <div className="text-center text-2xl mb-4 font-display text-black">

    <h1>Welcome to our fantastic transpirance maggle</h1>

      <button onClick={handleLogin} className="button-connexion">Connexion</button>
   
 </div>
  );
};

export default LoginPage;