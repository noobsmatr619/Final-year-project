import React, { Suspense } from "react";
import "./App.css";

import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Loading
import Loader from "react-loader-spinner";

//HomePage

const Home = React.lazy(() => import("./components/Dashboard/HomePage"));

//Authentication

const Auth = React.lazy(() => import("./components/Auth/Auth"));
const Loading = React.lazy(() => import("./utils/Loader"));

function App() {
  return (
    <Suspense
      fallback={
        <div className='loading-final-year'>
          <Loader
            type='Rings'
            color='#00BFFF'
            height={100}
            width={100}
            timeout={30000} //30 secs
          />
        </div>
      }
    >
      <Router>
        <div className='app'>
          <Helmet>
            <title> {"DMC"}</title>
          </Helmet>
          <Route exact path='/' component={Home} />
          <Route exact path='/auth' component={Auth} />
          <Route exact path='/loading' component={Loading} />
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
