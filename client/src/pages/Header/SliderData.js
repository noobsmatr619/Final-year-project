import React from 'react'
import './Header.css'
import HomeIcon from '@material-ui/icons/Home';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import MessageIcon from '@material-ui/icons/Message';


export let SliderData=[
    {
        title: 'Home',
        path: '/',
        icon: <HomeIcon/>,
        cName: 'nav-text'
      },
      {
        title: 'Reports',
        path: '/r',
        icon: <ShowChartIcon/>,
        cName: 'nav-text'
      },
     
     
      {
        title: 'Messages',
        path: '/chat',
        icon: <MessageIcon/>,
        cName: 'nav-text'
      }

    ]