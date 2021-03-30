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

//user views
const Reports = React.lazy(() => import('./pages/reports/Reports'))
const Stock = React.lazy(() => import('./pages/Stock/Stock'))
const Chat = React.lazy(() => import('./pages/chat/Chat'))
const Login = React.lazy(() => import('./pages/login/Form'))
const Emp = React.lazy(() => import('./pages/Emp_view/Emp'))
const Target = React.lazy(() => import('./pages/Target/Target'))
const Help = React.lazy(() => import('./pages/Help/Help'));
const Confirm = React.lazy(() => import('./pages/confirmation/Confirm'));
const Staff = React.lazy(() => import('./pages/Staff_view/Staff'));
const Manager = React.lazy(() => import('./pages/Manager_view/Manager'));
const Map = React.lazy(() => import('./pages/Map/Map'));
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
          <Route exact path='/reports' component={Reports} />
          <Route exact path='/stock' component={Stock} />
          <Route exact path='/chat' component={Chat} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/emp' component={Emp} />
          <Route exact path='/target' component={Target} />
          <Route exact path='/help' component={Help} />
          <Route exact path='/confirm' component={Confirm} />
          <Route exact path='/staff' component={Staff} />
          <Route exact path='/manager' component={Manager} />
          <Route exact path='/map' component={Map} />
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
