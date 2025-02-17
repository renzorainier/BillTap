'use client';

import { useState } from 'react';
import Main from './Main.jsx';
import UserNavbar from './UserNavbar.jsx';
import Head from 'next/head.js';


export default function Home() {
  const [activeComponent, setActiveComponent] = useState('attendance'); // State for toggling components

  return (
    <>
<Head>
  <title>BillTap</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link
    href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400&amp;display=swap"
    rel="stylesheet"
  />
  <link rel="manifest" href="/manifest.json" />
</Head>

      <div>

        {/* <Navbar activeComponent={activeComponent} setActiveComponent={setActiveComponent} /> */}
        <Main activeComponent={activeComponent} />
      </div>
    </>
  );
}
