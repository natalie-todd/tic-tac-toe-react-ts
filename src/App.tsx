import * as React from 'react';
import './App.css';

import { Board } from './components/Board';
import logo from './logo.svg';

export interface IAppState {
  history: Array<{ squares: string[] }>;
  xIsNext: boolean;
  stepNumber: number;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  public render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={this.jumpTo.bind(this, move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello React!</h1>
        </header>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={this.handleClick}
              xIsNext={this.state.xIsNext}  
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }

  private handleClick = (squareId: number) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squaresNew = current.squares.slice();

    if (calculateWinner(squaresNew) || squaresNew[squareId]) {
      return;
    }
    squaresNew[squareId] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squaresNew
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  private jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }
}

function calculateWinner(squares: string[]) {
  const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];

  for (const line in lines) {
      if (lines.hasOwnProperty(line)) {
          const [a, b, c] = lines[line];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              return squares[a];
          }            
      }
  }
  return null;
}

export default App;
