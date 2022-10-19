import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Game from './components/Game';
import About from './components/About';
import NotFound from './components/NotFound';

class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <nav className="menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">Sobre</Link>
            </li>
          </nav>
        </header>
        <Switch>
          <Route exact path="/" component={ Game } />
          <Route exact path="/about" component={ About } />
          <Route component={ NotFound } />
        </Switch>
      </>
    );
  }
}

export default App;