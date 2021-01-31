import React, { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Loading
import Loader from "react-loader-spinner";

//HomePage

const Home = React.lazy(() => import("./components/Dashboard/HomePage"));

//pages
const HealthSafety = React.lazy(() =>
  import("./components/Dashboard/healthAndSafety")
);
const Page1 = React.lazy(() => import("./components/Dashboard/Page1"));
const Page2 = React.lazy(() => import("./components/Dashboard/Page2"));
const Page3 = React.lazy(() => import("./components/Dashboard/Page3"));
const Page4 = React.lazy(() => import("./components/Dashboard/manage-view"));
const Page5 = React.lazy(() => import("./components/Dashboard/StaffView"));
const Page6 = React.lazy(() => import("./components/Dashboard/Page6"));
const ChartEx1 = React.lazy(() => import("./components/Dashboard/Chart1"));
const ChartEx2 = React.lazy(() => import("./components/Dashboard/Chart2"));
const ChartEx3 = React.lazy(() => import("./components/Dashboard/Chart3"));
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
          <Route exact path='/page1' component={Page1} />
          <Route exact path='/page2' component={Page2} />
          <Route exact path='/page3' component={Page3} />
          <Route exact path='/page4' component={Page4} />
          <Route exact path='/page5' component={Page5} />
          <Route exact path='/page6' component={Page6} />

          <Route exact path='/ChartEx1' component={ChartEx1} />
          <Route exact path='/ChartEx2' component={ChartEx2} />
          <Route exact path='/ChartEx3' component={ChartEx3} />
          <Route exact path='/auth' component={Auth} />
          <Route exact path='/health-safety' component={HealthSafety} />
          <Route exact path='/loading' component={Loading} />
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
