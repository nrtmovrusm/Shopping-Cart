import './HomePage.css'
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom"
import { useState } from "react";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home Page</Link>
          </li>
          <li>
            <Link to='shopping'>Shopping Page</Link>
          </li>
          <li>
            Cart: {count}
          </li>
          <li>
            <button className='checkoutBtn'>Checkout</button>
          </li>
        </ul>
      </nav>
      <div className='outlet'>
        <Outlet context = {{ count, setCount }}/>
      </div>
    </>
  )
}

export default Home
