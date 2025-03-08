import React from 'react'
import './ticket.css'
import { images } from "../../assets/images/images";

const Ticket = ({data}) => {

  const d = new Date();
  console.log(data)
  return (
    <div className='container'>
      <h1>Congrats, <span className="gradient-text">{data.userName.value}</span>! <br /> Your ticket is ready.</h1>
      <p className='gen-para'>We've emailed your ticket to <span style={{color:'hsl(7, 88%, 67%)'}}>{data.email.value}</span> and will send updates in run up to the event.</p>
      <div className="ticket-container">
        <div className='side1'>
          <div className="first">
            <img src={images.logo} alt="" />
            <p>{`${d.toDateString().substring(4)} / Austin TX`}</p>
          </div>
          <div className="second">
            <img src={URL.createObjectURL(data.avatarFile.value)} alt="" />
            <div className="user-detail">
              <h5>{data.userName.value}</h5>
              <p className='user-detail-para'><img src={images.gitIcon} alt="" /> <span>@{data.gitHubName.value}</span></p>
            </div>
          </div>
        </div>
        <p className='rotate-para'>#{(Math.random()*100000).toFixed(0)}</p>
      </div>
    </div>
  )
}

export default Ticket
