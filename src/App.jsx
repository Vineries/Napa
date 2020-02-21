import React from 'react';

import Index from './pages/Index'
import Winery from './pages/Winery'
import Search from './pages/Search'
import Booking from './pages/Booking'

import './scss/main.scss';

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Index} />
        <Route path="/Search" exact component={Search} />
        <Route path="/Booking/:id" exact component={Booking} />
        <Route path="/Winery/:id" exact component={Winery} />
      </div>
    </Router>
  );
}

export default App;
