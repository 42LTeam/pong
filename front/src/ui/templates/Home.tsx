import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Header from '../../Header';

function Home() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className={"grid grid-cols-8 grid-rows-6 h-screen"} style={{marginTop: "var(--header-height)"}}>
        <Outlet />
      </div>
    </>
  );
}

export default Home
