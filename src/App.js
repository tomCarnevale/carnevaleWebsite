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

import { SwitchTransition, Transition, TransitionGroup } from 'react-transition-group';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import DetailsPage from './DetailsPage';
export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Route render={({ location }) => (
                    <TransitionGroup>
                        <Transition timeout={300} key={location.key}>
                            <Switch location={location}>
                                <Route exact path="/" component={Home} />
                                <Route path="/test0">    
                                    <DetailsPage index={0}/>
                                </Route>
                                <Route path="/test1">    
                                    <DetailsPage index={1}/>
                                </Route>
                                <Route path="/test2">    
                                    <DetailsPage index={2}/>
                                </Route>
                                <Route path="/test3">    
                                    <DetailsPage index={3}/>
                                </Route>
                                
                                <Route render={() => <div>Not Found</div>} />
                            </Switch>
                        </Transition>
                    </TransitionGroup>
                )} />
            </Router>
        )
    }
}