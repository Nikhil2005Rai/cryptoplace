import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow from '../../assets/arrow.png'
import { useCoins } from '../../context/CoinContext'

const Navbar = () => {

  const { setCurrency } = useCoins()
  const currencyHandeler = (e) => {
    switch (e.target.value) {
      case "usd":
        setCurrency({
          name: "usd",
          symbol: "$"
        })
        break;
      case "eur":
        setCurrency({
          name: "eur",
          symbol: "€",
        });
        break;
      case "inr":
        setCurrency({
          name: "inr",
          symbol: "₹",
        });
        break;
    
      default:
        setCurrency({
          name: "usd",
          symbol: "$",
        });
        break;
    }
  }
  return (
    <div className='navbar'>
        <img src={logo} alt="logo" className='logo'/>
        <ul>
            <li>Home</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
        </ul>
        <div className="nav-right">
            <select name="" id="" onChange={currencyHandeler}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="inr">INR</option>
            </select>
            <button>Sign up <img src={arrow} /></button>
        </div>
    </div>
  )
}

export default Navbar