import React from 'react'
import {BrowserRouter as Router,Route } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ViewDetails from './components/ViewDetails';

class App extends React.Component {
  render()
  {
    return(
        
            <Router>
                <Route path="/" component={Login} exact />
                <Route path="/home" component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/logout" component={Login} />
                <Route path="/viewdetails/:id" component={ViewDetails} />
            </Router>
            
      
    )
  }
}

export default App;