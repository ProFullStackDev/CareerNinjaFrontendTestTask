import React from 'react';
import { BrowserRouter, Route,Router,Switch,HashRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './screens/Home/Home';
import Battle from './screens/Battle/Battle';
import history from './history';


// import HomePhone from './screens/Home/Batte/HomePhone';

function App(props,watch, settings) {

  return (
    <HashRouter   basename={'/'} >
            <div className="App desktop-view">
               
                <Switch>
                <Route  path="/" exact component={Home}/>

                <Route path='/search/:handle' exact component={Home}/>
                <Route path='/battle/:handle' exact component={Battle}/>
           
                </Switch>
               
            </div>
            </HashRouter>
  );
}


export default App;
