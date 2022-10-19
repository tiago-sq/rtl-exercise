import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Game from './components/Game';
import About from './components/About';
import NotFound from './components/NotFound';
import generateNumber from './helpers/generateNumber';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      number: 0,
      wins: 0,
      losses: 0,
      isWon: null,
    }
  }

  componentDidMount() {
    this.newNumber();
  }

  newNumber = () => {
    this.setState({
      number: generateNumber(),
    });
  }

  chooseNumber = ({ target }) => {
    const { number } = this.state;
    const { value } = target;
    const result = parseInt(value) === (number % 2);
    this.setState((prev) => ({
      isWon: result,
      wins: result ? prev.wins + 1: prev.wins,
      losses: !result ? prev.losses + 1: prev.losses,
    }), this.newNumber);
  }

  render() {
    const { number, wins, losses, isWon } = this.state;
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
          <Route exact path="/">
            <Game 
              number={ number }
              wins={ wins }
              losses={ losses }
              isWon={ isWon }
              chooseNumber={ this.chooseNumber }
            />
          </Route>
          <Route exact path="/about" component={ About } />
          <Route component={ NotFound } />
        </Switch>
      </>
    );
  }
}

export default App;