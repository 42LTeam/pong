import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';


import LoginPage from './Login_page'
import Home from './ui/templates/Home';

type Props = {
    children?: React.ReactNode
}

function Auth({children} : Props) {

    //requete back to check les cookies//
    /* const response = {
         isLogged: true,
         user : {
             avatar: 'lien'
         }
     }*/

    const [cookies] = useCookies(['monCookieDeConnexion']); //### TO CHANGE WITH REAL LOG COOKIE  ###
    const isAuth = true; // on aura la reponse

    if (!isAuth)
    {
        return <LoginPage />;
    }
    return (
        /*<div>
            {cookies.monCookieDeConnexion ? <Home /> : <LoginPage />}
          </div>*/

        <>
            {children}
        </>
    );
}

export default Auth
