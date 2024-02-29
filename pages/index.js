import Head from 'next/head';
import React, { useState } from 'react';
import Header from '@/components/header.js';
import Footer from '@/components/footer.js';
import QuestionForm from '@/components/questionForm.js';
import CookieStandTable from '@/components/cookieStandTable.js';
import { hours } from '../data';


function Main(props) {
  return <main>{props.children}</main>;
}

export default function Home() {

  const [cookieStands, setCookieStands] = useState([]);
  const [lastLocation, setLastLocation] = useState('location');


  const handleSubmit = (event) => {
    event.preventDefault();
    const newStand = {
      location: event.target.location.value,
      minCustomers: parseInt(event.target.minCustomers.value),
      maxCustomers: parseInt(event.target.maxCustomers.value),
      avgCookies: parseFloat(event.target.avgCookies.value),
      hourly_sales: [48, 42, 30, 24, 42, 24, 36, 42, 42, 48, 36, 42, 24, 36],

    };
      
    setCookieStands([...cookieStands, newStand]);
    setLastLocation(newStand.location); 
    event.target.reset();
  };
  

  return (
    <>
      <Head>
        <title>Cookie Stand Admin</title>
        <link rel="icon" href="/cookie.svg" />

      </Head>
      <Header />
      <Main>
        <QuestionForm onSubmit={handleSubmit} lastLocation={lastLocation} />
        <CookieStandTable cookieStands={cookieStands} hours={hours} />
        
      </Main>
      <Footer />
    </>
  );
}



function Placeholder({ lastLocation }) {
  return (
    <div className="fixed left-0 w-full p-1 text-xs text-center bg-gray-200 bottom-16">
      <p>Last created location: {lastLocation}</p>
    </div>
  );
}