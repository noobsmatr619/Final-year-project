import React, { Suspense, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { socket } from './socketService';
import PrivateRoute from './routing/PrivateRoute';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './store';
import { LoadUser } from './actions/authActions';
//old code
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
//new code
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
//Loading
import Loader from 'react-loader-spinner';
import history from './history';

//HomePage

const Home = React.lazy(() => import('./components/Dashboard/HomePage'));

//pages
const HealthSafety = React.lazy(() =>
  import('./components/Dashboard/healthAndSafety')
);
const Admin = React.lazy(() => import('./components/Dashboard/Page1'));
const Page2 = React.lazy(() => import('./components/Dashboard/Page2'));
const Page3 = React.lazy(() => import('./components/Dashboard/Page3'));
const Page4 = React.lazy(() => import('./components/Dashboard/manage-view'));
const Page5 = React.lazy(() => import('./components/Dashboard/StaffView'));
const Page6 = React.lazy(() => import('./components/Dashboard/Page6'));
const ChartEx1 = React.lazy(() => import('./components/Dashboard/Chart1'));
const ChartEx2 = React.lazy(() => import('./components/Dashboard/Chart2'));
const ChartEx3 = React.lazy(() => import('./components/Dashboard/Chart3'));
//Authentication

const Auth = React.lazy(() => import('./components/Auth/Auth'));
const Loading = React.lazy(() => import('./utils/Loader'));

//user views
const Reports = React.lazy(() => import('./pages/reports/Reports'));
const Stock = React.lazy(() => import('./pages/Stock/Stock'));
const Chat = React.lazy(() => import('./pages/chat/Chat'));
const Login = React.lazy(() => import('./pages/login/Form'));
const Emp = React.lazy(() => import('./pages/Emp_view/Emp'));
const CreateTeam = React.lazy(() => import('./pages/create-team/CreateTeam'));
const GenerateOrderForm = React.lazy(() =>
  import('./pages/orders/GenerateOrderForm')
);
const Target = React.lazy(() => import('./pages/Target/Target'));
const Help = React.lazy(() => import('./pages/Help/Help'));
const Confirm = React.lazy(() => import('./pages/confirmation/Confirm'));
const Staff = React.lazy(() => import('./pages/Staff_view/Staff'));
const Manager = React.lazy(() => import('./pages/Manager_view/Manager'));
const Map = React.lazy(() => import('./pages/Map/Map'));
const AddMaterial = React.lazy(() =>
  import('./pages/add-material/AddMaterial')
);
const AddProduct = React.lazy(() => import('./pages/add-product/AddProduct'));
const AddMachine = React.lazy(() => import('./pages/add-machine/AddMachine'));
const AddForm = React.lazy(() => import('./pages/add-form/AddForm'));

//Machines status
const MachinesStatus = React.lazy(() =>
  import('./pages/machines-status/MachinesStatus')
);

//Machines status
const MachinesList = React.lazy(() =>
  import('./pages/machines-target/MachinesList')
);
const MachineUpdate = React.lazy(() =>
  import('./pages/machines-target/MachineUpdate')
);

if (localStorage.CRM_TOKEN) {
  setAuthToken(localStorage.CRM_TOKEN);
}
function App() {
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    setisLoading(false);
    const runActions = async () => {
      await store.dispatch(await LoadUser(history));
      setisLoading(true);
    };
    runActions();
  }, []);
  // useEffect(() => {
  //   if (localStorage.getItem("id")) {
  //     const name = localStorage.getItem("id");
  //     const profile = localStorage.getItem("email");
  //     console.log("working jatt");
  //     socket.emit("join", { name, profile }, error => {
  //       if (error) {
  //         alert(error);
  //       }
  //     });
  //   }
  // }, []);
  if (!isLoading) {
    return (
      <div className="loading-final-year">
        <Loader
          type="Rings"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000000} //30 secs
        />
      </div>
    );
  }
  return (
    <Suspense
      fallback={
        <div className="loading-final-year">
          <Loader
            type="Rings"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={30000} //30 secs
          />
        </div>
      }>
      <Provider store={store}>
        <Router history={history}>
          <ToastContainer />
          <div className="app">
            <Helmet>
              <title> {'DMC'}</title>
            </Helmet>

            {/* <Redirect exact from="/" to="/" /> */}
            {/* <PrivateRoute exact path='/user-management' component={Admin} /> */}
            <Route exact path="/user-management" component={Admin} />
            <Route exact path="/staff" component={Staff} />
            {/* <Route exact path='/page2' component={Page2} /> */}
            {/* <Route exact path='/page3' component={Page3} /> */}
            {/* <Route exact path='/page4' component={Page4} /> */}
            {/* <Route exact path='/page5' component={Page5} /> */}
            {/* <Route exact path='/page6' component={Page6} /> */}
            {/* <Route exact path='/ChartEx1' component={ChartEx1} /> */}
            {/* <Route exact path='/ChartEx2' component={ChartEx2} /> */}
            {/* <Route exact path='/ChartEx3' component={ChartEx3} /> */}
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/health-safety" component={HealthSafety} />
            {/* <Route exact path='/loading' component={Loading} /> */}
            <Route exact path="/reports" component={Reports} />
            <Route exact path="/stock" component={Stock} />
            <Route
              exact
              path={['/chat', '/chat/:id/:displayName']}
              component={Chat}
            />
            {/* <Route exact path='/login' component={Login} /> */}
            <Route exact path="/emp" component={Emp} />
            {/* <Route exact path='/target' component={Target} /> */}
            {/* <Route exact path='/help' component={Help} /> */}
            {/* <Route exact path='/confirm' component={Confirm} /> */}
            {/* <Route exact path='/assign-order' component={GenerateOrderForm} /> */}
            <Route exact path="/manager" component={Manager} />
            {/* <Route exact path='/map' component={Map} /> */}
            {/* <Route exact path='/add-material' component={AddMaterial} /> */}
            {/* <Route exact path='/add-product' component={AddProduct} /> */}
            {/* <Route exact path='/create-team' component={CreateTeam} /> */}
            {/* <Route exact path='/add-machine' component={AddMachine} /> */}
            <Route exact path="/add-form" component={AddForm} />
            <Route exact path="/machines" component={MachinesStatus} />
            <Route exact path="/machines/list" component={MachinesList} />
            <Route
              exact
              path="/machines/update/:machineId"
              component={MachineUpdate}
            />
            {/* <Route path='*' component={() => <Redirect to='/auth' />} /> */}
          </div>
        </Router>
      </Provider>
    </Suspense>
  );
}

export default App;
