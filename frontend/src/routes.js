import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//import Login from './Pages/Login';
import Home from './Pages/Home';
import Event from './Pages/Event/index.js';
import Responsible from './Pages/Responsible';
import Student from './Pages/Student';
import Class from './Pages/Class';
import EventByClass from './Pages/EventClass';
import Participants from './Pages/Participants';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/events" component={Event} />
                <Route exact path="/responsibles" component={Responsible} />
                <Route exact path="/students" component={Student}/>
                <Route exact path="/classes" component={Class}/>
                <Route exact path="/eventsbyclass" component={EventByClass}/>
                <Route exact path="/participants" component={Participants}/>
            </Switch>
        </BrowserRouter>
    );
}

//<Route path="/" exact component={Login} />