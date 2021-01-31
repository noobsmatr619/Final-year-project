import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import React, { useEffect,useState}from 'react'
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import { useStateValue } from "./SessionState";
import { Helmet } from 'react-helmet'
function App() {
  return (
     <Router>
        <div className="app">
            <Helmet>
             <title>{ "DMC"}</title>
             </Helmet>
            <Switch>   
             <Route path="/">
            <Header />
      
             </Route>
            
             </Switch>
        </div>
        </Router>
  );
}

export default App;
