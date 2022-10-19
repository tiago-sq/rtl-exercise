import React from 'react';
import generateNumber from '../helpers/generateNumber';

class Game extends React.Component {
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
    const result = value === (number % 2);
    this.setState((prev) => ({
      isWon: result,
      wins: result ? prev.wins + 1: prev.wins,
      losses: !result ? prev.losses + 1: prev.losses,
    }), this.newNumber);
  }

  render() {
    const { number, wins, losses, isWon } = this.state;
    return (
      <div className="game">
        <h1>Par ou Ímpar</h1>
        <div data-testid="number">{ number }</div>
        <div data-testid="score">
          {`Vitórias: ${wins} - Derrotas: ${losses}`}
        </div>
        { isWon !== null &&
          <div data-testid="result">
            { isWon ? 'Acertou' : 'Errou' }
          </div>
        }
        <div className="buttons">
          <button
            type="button"
            data-testid="par"
            value="0"
            onClick={ this.chooseNumber }
          >
            Par
          </button>
          <button
            type="button"
            data-testid="impar"
            value="1"
            onClick={ this.chooseNumber }
          >
            Ímpar
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
