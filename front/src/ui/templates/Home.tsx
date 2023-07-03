import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Header from '../../Header';

function Home() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div style={{marginTop: "var(--header-height)"}}>
        <Outlet />
      </div>
    </>
  );
}

export default Home
