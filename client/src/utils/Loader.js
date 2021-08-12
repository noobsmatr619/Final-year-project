import React from "react";
import Loader from "react-loader-spinner";
import "./loader.css";
export default class App extends React.Component {
  //other logic
  render() {
    return (
      <div className='loading-final-year'>
        <Loader
          type='Rings'
          color='#00BFFF'
          height={100}
          width={100}
          timeout={30000} //3 secs
        />
      </div>
    );
  }
}
// the loading animation 