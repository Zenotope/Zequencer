import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';
import Presets from "./Presets.js";
import jwt_decode from "jwt-decode"

function Navbar({presets, changePreset, updatePreset, deletePreset, user, setUser, setUserId}) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(()=> {
    /* global google*/
    google.accounts.id.initialize({
      client_id: "942707319234-peaf4c81oi1mds997rof8depfgbhncjf.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "dark", size: "medium"}
    )
  }, [])

  function handleCallbackResponse(response) { 
    let userObject = jwt_decode(response.credential);
    setUser(userObject)
    localStorage.setItem("user", JSON.stringify(userObject))
    document.getElementById("signInDiv").hidden = true
    fetch(`http://localhost:4000/users/?email=${userObject.email}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            // data = null
            if(data === null){
                let data = {
                    first_name: userObject.given_name,
                    last_name: userObject.family_name,
                    email: userObject.email,
                    sub: userObject.sub
                }
                console.log(data)
        fetch("http://localhost:4000/users", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data)
        })
            }
        setUserId(data[0].id)
        console.log(data[0].id)
        })
  
  }  
  
  function handleSignOut(event) {
    setUser({})
    document.getElementById("signInDiv").hidden = false
    localStorage.removeItem("user")
    setUserId("")
  }
  


  return (
    <>
   
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h3 className="navTitle">Zequencer</h3>
          <div className="login">
            <div id="signInDiv"></div>
            {Object.keys(user).length !== 0 &&
              <div>
              <h2>Hello {user.name}</h2>
              <button onClick={(e)=> handleSignOut(e)}>Sign Out</button> 
              </div>
            }
        </div>
        </div>
        
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <div>
                <Presets 
                presets={presets}
                changePreset={changePreset}
                updatePreset={updatePreset}
                deletePreset={deletePreset}
                />
            </div>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;


