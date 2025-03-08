import React, { useState } from 'react';
import './App.css';
import Form from './Components/Form/form';
import Ticket from './Components/Ticket/ticket'
import {images} from './assets/images/images';

function App() {

  const [data, setData] = useState(null);

  const handleFormSubmit = (data) => {
    setData(data)

    console.log('Submit')
  }

  return (
    <center>
      <img className='logo-img' src={images.logo} alt="" />
      <div className="app-content">
        {
          !data ? <Form onSubmit={handleFormSubmit} /> 
            : 
          <Ticket data={data}></Ticket>
        }
      </div>
    </center>
  )
}

export default App
