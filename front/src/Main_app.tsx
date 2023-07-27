import { useCookies  } from 'react-cookie';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';


import LoginPage from './Login_page'
import Home from './Home';


function Main_app() {

    //requete back to check les cookies//
   /* const response = {
        isLogged: true,
        user : {
            avatar: 'lien'
        }
    }*/

    const [cookies] = useCookies(['monCookieDeConnexion']); //### TO CHANGE WITH REAL LOG COOKIE  ###
    const toCheckHome = true; // on aura la reponse

  return (
  /*<div>
      {cookies.monCookieDeConnexion ? <Home /> : <LoginPage />}
    </div>*/

   <div>
      {toCheckHome ? <Home /> : <LoginPage />}
   </div>
  );
}

export default Main_app
