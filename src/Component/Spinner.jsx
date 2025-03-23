import React from 'react'
import Book from '../assets/Book.gif'
const Spinner=()=> {

    return (
      <div>
        <img src={Book} rel='loading...'/>
      </div>
    )

}

export default Spinner
