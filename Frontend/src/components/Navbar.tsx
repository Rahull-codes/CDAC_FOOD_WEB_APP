import { Link, useNavigate } from "react-router";
import { Config } from "../utils/config";
import { useSelector } from "react-redux";
import type {StoreType} from '../../store'

const Navbar = () => {

  const cartItems = useSelector((store : StoreType ) => store.cartReducer.cartItem)
  
  const navigate = useNavigate()
  const handleLogout = () =>{
      sessionStorage.removeItem(Config.TOKEN)
      navigate('/')
  }
  
  return (
    <nav>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/home/orders">Orders</Link>
              </li>
              <li>
              
                <Link to="/home/cart">Cart <p className="text-2xl" >{cartItems.length}</p></Link>
              </li>
              <li>
                <Link to="/home/profile">Profile</Link>
              </li>
            </ul>
          </div>
          <Link to="/home" className="btn btn-ghost text-xl">
            <i className="ri-home-line "></i>Home
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/home/orders">Orders</Link>
            </li>
            <li>
              <Link to="/home/cart">Cart <p  >{cartItems.length}</p></Link>
            </li>
            <li>
              <Link to="/home/profile">Profile</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <button onClick={handleLogout} className="btn btn-error" >
            Logout
            <i className="ri-corner-down-right-line xl:text-xl font-light sm:text-base "></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
