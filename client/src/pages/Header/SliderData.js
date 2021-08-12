// sliding nav bar 
import React from 'react'
import './Header.css'
import HomeIcon from '@material-ui/icons/Home';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import MessageIcon from '@material-ui/icons/Message';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
export let SliderData=[
    {
        title: 'Home',
        path: '/',
        icon: <HomeIcon/>,
        cName: 'nav-text'
      },
      {
        title: 'Reports',
        path: '/reports',
        icon: <ShowChartIcon/>,
        cName: 'nav-text'
      },
     
     
      {
        title: 'Messages',
        path: '/chat',
        icon: <MessageIcon/>,
        cName: 'nav-text'
  },
  {
        title: 'Stock',
        path: '/stock',
        icon:  <AccountBalanceIcon />,
        cName: 'nav-text'
      }
,
  {
        title: 'RFA',
        path: '/health-safety',
        icon:  <CallToActionIcon />,
        cName: 'nav-text'
      },
  {
        title: 'Forms',
        path: '/add-form',
        icon:  <HelpIcon />,
        cName: 'nav-text'
      },
  {
        title: 'Machines Target',
        path: '/machines/list',
        icon:  <SettingsIcon />,
        cName: 'nav-text'
      }
,
  {
        title: 'Logout',
        path: '/machines/list',
        icon:  <ExitToAppIcon />,
        cName: 'nav-text'
      }
    ]