import Head from 'next/head';
import React, {createContext, useContext, useState, useEffect  } from 'react';
import Header from '@/components/header.js';
import Footer from '@/components/footer.js';
import QuestionForm from '@/components/questionForm.js';
import CookieStandTable from '@/components/cookieStandTable.js';

import { hours } from '../data';
import { useAuth } from '../contexts/auth';
import useResource from '../hooks/useResource';


function Main(props) {
  return <main>{props.children}</main>;
}

function CookieStandAdmin() {

  const { resources, deleteResource } = useResource();

  return (
      <>
          
          <CookieStandTable stands={resources || []} deleteStand={deleteResource} />
      </>
  );
}

export default function Home() {

  const [cookieStands, setCookieStands] = useState([]);
  const [lastLocation, setLastLocation] = useState('location');
  const { user, login } = useAuth();
  const { createResource } = useResource();


  const handleSubmit = (event) => {
    event.preventDefault();
    const newStand = {
      location: event.target.location.value,
      minCustomers: parseInt(event.target.minCustomers.value),
      maxCustomers: parseInt(event.target.maxCustomers.value),
      avgCookies: parseFloat(event.target.avgCookies.value),
      hourly_sales: [48, 42, 30, 24, 42, 24, 36, 42, 42, 48, 36, 42, 24, 36],

    };
    createResource(newStand);  
    setCookieStands([...cookieStands, newStand]);
    setLastLocation(newStand.location); 
    event.target.reset();
  };

  const deleteStand = (locationToDelete) => {
    setCookieStands(cookieStands.filter(stand => stand.location !== locationToDelete));
  };
  

  return (
    <>
      <Head>
        <title>Cookie Stand Admin</title>
        <link rel="icon" href="/cookie.svg" />

      </Head>
      <Header>
        {user ?
                  <>
                      <h1>Logged in: {user.email}</h1>
                      <CookieStandAdmin />
                  </>
                  :
                  <LoginForm onLogin={login} />
              }
      </Header>
      <Main>
        <QuestionForm onSubmit={handleSubmit} lastLocation={lastLocation} />
        <CookieStandTable cookieStands={cookieStands} hours={hours} onDelete={deleteStand}/>
        
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

function LoginForm({ onLogin }) {

  async function handleSubmit(event) {
      event.preventDefault();
      onLogin(event.target.username.value, event.target.password.value);
  }

  return (
      <form onSubmit={handleSubmit}>
          <fieldset autoComplete='off'>
              <legend>Log In</legend>
              <label htmlFor="username">Username</label>
              <input name="username" />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" />
              <button>Log In</button>
          </fieldset>
      </form>
  );
}