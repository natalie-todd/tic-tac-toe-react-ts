import * as React from "react";
import { Square } from "./Square";

export interface IBoardState {
    squares: string[];
    xIsNext: boolean;
}

export class Board extends React.Component<{}, IBoardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        }
    }

    public render() {
        const winner = calculateWinner(this.state.squares);
        let status: string;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div>
                <div className="status">
                    {status}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
    
    private renderSquare(i: number) {
        return <Square 
            value={this.state.squares[i]}
            onClick={this.handleClick(i)}
            />;
    }
    
    private handleClick = (squareId: number) => (event: any) => {
        const squaresNew = this.state.squares.slice();
        if (calculateWinner(squaresNew) || squaresNew[squareId]) {
            return;
        }
        squaresNew[squareId] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squaresNew,
            xIsNext: !this.state.xIsNext
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
