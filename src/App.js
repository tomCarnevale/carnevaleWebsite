import React from 'react';
import Diorama from './Diorama';
import Banner from './Banner';
import InfoDump from './InfoDump';
import DioramaParallax from './DioramaParallax';
import Copyright from './Copyright';
import canyon from './img/canyon.jpg'
import { PlaceholderImage } from './PlaceholderImage';
import Links from './Links';
import Contact from './Contact';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Transition, TransitionGroup, SwitchTransition } from 'react-transition-group';
import { Route, BrowserRouter as Router, Switch, Link, useRouteMatch, BrowserRouter, withRouter } from 'react-router-dom';
import DetailsPage from './DetailsPage';

class App extends React.Component {
    // let match = useRouteMatch({path: "/"});
   
    

    componentWillMount() {
        this.lastPath = this.props.history.location.pathname;
        this.unlisten = this.props.history.listen((location, action) => {
           if (location.pathname != '/')
           {
               this.lastPath = location.pathname;
           }
            
        });
      }
      componentWillUnmount() {
          this.unlisten();
      }
    

    render() {
        return (
                <Switch >
                    <Route exact path="/" render={props => (
                        <Home navigation={props} lastPath={this.lastPath} />
                        )} /> 
                    <Route path="/test0" render={props => <DetailsPage index={0} navigation={props} />} />
                    <Route path="/test1" render={props => <DetailsPage index={1} navigation={props} />} />
                    <Route path="/test2" render={props => <DetailsPage index={2} navigation={props} />} />
                    <Route path="/test3" render={props => <DetailsPage index={3} navigation={props} />} />

                </Switch>
        );
    }
}
export default withRouter(App);