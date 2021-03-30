import React, { useState } from "react";
import { SliderData } from "./SliderData";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import HelpIcon from "@material-ui/icons/Help";
import SearchIcon from "@material-ui/icons/Search";
import CallToActionIcon from "@material-ui/icons/CallToAction";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import SendIcon from "@material-ui/icons/Send";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import HomeIcon from "@material-ui/icons/Home";
import ChatIcon from "@material-ui/icons/Chat";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import MessageIcon from "@material-ui/icons/Message";
function Header() {
  let [slidebarHandler, SlidebarState] = useState(false);
  let slideSidebar = () => SlidebarState(!slidebarHandler);
  return (
    <div className='header'>
      <div className='menuIcon'>
        {" "}
        {/* collapsing menu */}
        <IconButton className='CollapsibleMenu' onClick={slideSidebar}>
          <MenuIcon />
        </IconButton>
        <nav className={slidebarHandler ? "nav-menu showing" : "nav-menu"}>
          <ul className='navMenuList' onClick={slideSidebar}>
            <li className='navbar-1-toggle'>
              <IconButton>
                <CloseIcon className='menuClosIcon' />
              </IconButton>
            </li>

            {SliderData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className='each-span'>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <Link to='/'>
        <img className='headerLogo' src='/Image/logo.png' alt='#' />
      </Link>

      <div className='headerLeftNav'>
        {/* header option */}
        <div className='headerLeftOpt'>
          <span className='each-span headerOptLineOne '>
            {" "}
            <Link to='/' className='homestyle'>
              {" "}
              <HomeIcon />{" "}
            </Link>
          </span>{" "}
          <br />
          <Link to='/' className='iconStyle'>
            {" "}
            <span className='each-span headerOptLineTwo' id='joshi'>
              Home
            </span>{" "}
          </Link>
        </div>
        <div className='headerLeftOpt'>
          <Link to='/reports' className='iconStyle'>
            <span className='each-span headerOptLineOne'>
              {" "}
              <ShowChartIcon />{" "}
            </span>{" "}
            <br />
            <span className='each-span headerOptLineTwo'>Reports</span>
          </Link>
        </div>
        <div className='headerLeftOpt  '>
          <Link to='/chat' className='iconStyle'>
            {" "}
            <span className='each-span headerOptTLineOne'>
              <ChatIcon />
            </span>
            <br />
            <span className='each-span headerOptLineTwo'> Messages</span>{" "}
          </Link>
        </div>
        <div className='headerLeftOpt  '>
          <Link to='/stock' className='iconStyle'>
            {" "}
            <span className='each-span headerOptTLineOne'>
              <AccountBalanceIcon />
            </span>
            <br />
            <span className='each-span headerOptLineTwo'> Stock</span>{" "}
          </Link>
        </div>
        <div className='headerLeftOpt  '>
          <Link to='/blog' className='iconStyle'>
            {" "}
            <span className='each-span headerOptTLineOne'>
              <CallToActionIcon />
            </span>
            <br />
            <span className='each-span headerOptLineTwo'> RFA</span>{" "}
          </Link>
        </div>
        <div className='headerLeftOpt  '>
          <Link to='/blog' className='iconStyle'>
            {" "}
            <span className='each-span headerOptTLineOne'>
              <HelpIcon />
            </span>
            <br />
            <span className='each-span headerOptLineTwo'> help </span>{" "}
          </Link>
        </div>
      </div>

      <div className='headerSearch'>
        <SearchIcon className='headerSearchIcon' />
        <input
          className='headerSearchInput'
          type='text'
          placeholder='Search Anything'
        />
      </div>

      <div className='headerRightNav'>
        <span className='each-span headerBasketCount'></span>

        <Link to='/login'>
          <span className='each-span headerRightOption'>
            <AccountCircleIcon />
          </span>
        </Link>
        <span className='each-span headerRightOption'>
          <SettingsIcon />
        </span>
      </div>
    </div>
  );
}

export default Header;
