import Head from 'next/head';
import React, { useState } from 'react';

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
      minCustomers: event.target.minCustomers.value,
      maxCustomers: event.target.maxCustomers.value,
      avgCookies: event.target.avgCookies.value,
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
        <CookieStandTable cookieStands={cookieStands} />
        
      </Main>
      <Footer />
    </>
  );
}


function Header() {
  return (
    <header className='p-4 text-4xl bg-green-900 text-gray-50'>
      <h1>Cookie Stand Admin</h1>
    </header>
  );
}

function QuestionForm(props) {
  return (
    <form onSubmit={props.onSubmit} className="flex flex-col p-8 mx-auto my-4 bg-gray-200 rounded-lg" style={{width: '80%'}} >
      <h2 className="mb-4 text-xl font-semibold">Add a new Cookie Stand</h2>
      <div className="mb-4">
        <input name="location" className="w-full h-10 pl-1" placeholder={`${props.lastLocation ? ` ${props.lastLocation}` : ''}`} />
      </div>
      <div className="flex justify-between space-x-2">
        <div className="flex flex-col">
          <label htmlFor="minCustomers">Minimum Customers per Hour</label>
          <input type="number" name="minCustomers" className="flex-grow h-10 pl-1" placeholder="Minimum Customers per Hour" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="maxCustomers">Maximum Customers per Hour</label>
          <input type="number" name="maxCustomers" className="flex-grow h-10 pl-1" placeholder="Maximum Customers per Hour" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="avgCookies">Average Cookies per Sale</label>
          <input type="number" name="avgCookies" className="flex-grow h-10 pl-1" placeholder="Average Cookies per Sale" />
        </div>
        <button className="self-end h-10 px-2 bg-gray-500 text-gray-50">Create</button>
      </div>
    </form>
  );
}

function CookieStandTable({ cookieStands }) {
  return (
    <table className="w-4/5 pt-4 pl-10 pr-10 mx-auto mt-4">
      <thead>
        <tr>
          <th>Location</th>
          <th>Min Customers/Hour</th>
          <th>Max Customers/Hour</th>
          <th>Avg Cookies/Sale</th>
        </tr>
      </thead>
      <tbody>
        {cookieStands.map((stand, index) => (
          <tr key={index}>
            <td>{stand.location}</td>
            <td>{stand.minCustomers}</td>
            <td>{stand.maxCustomers}</td>
            <td>{stand.avgCookies}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full p-1 text-xs text-center bg-green-900 text-gray-50">
      <p>Cookie Stand &copy;{ new Date().getFullYear() }</p>
    </footer>
  );
}

function Placeholder({ lastLocation }) {
  return (
    <div className="fixed left-0 w-full p-1 text-xs text-center bg-gray-200 bottom-16">
      <p>Last created location: {lastLocation}</p>
    </div>
  );
}