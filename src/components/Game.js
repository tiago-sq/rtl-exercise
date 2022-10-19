import React from 'react';

class Game extends React.Component {
  render() {
    const { number, wins, losses, isWon, chooseNumber } = this.props;
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
            onClick={ chooseNumber }
          >
            Par
          </button>
          <button
            type="button"
            data-testid="impar"
            value="1"
            onClick={ chooseNumber }
          >
            Ímpar
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
