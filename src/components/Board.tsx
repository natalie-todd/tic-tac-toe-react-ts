import * as React from "react";
import { Square } from "./Square";

export interface IBoardProps {
    squares: string[];
    xIsNext: boolean;
    onClick: (e: any) => void;
}

export class Board extends React.Component<IBoardProps, {}> {
    public render() {
        return (
            <div>
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
            value={this.props.squares[i]}
            onClick={this.handleClick(i)}
            />;
    }
    
    private handleClick = (squareId: number) => (e: any) => {
        this.props.onClick(squareId);
        /*const squaresNew = this.props.squares.slice();
        if (calculateWinner(squaresNew) || squaresNew[squareId]) {
            return;
        }
        squaresNew[squareId] = this.props.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squaresNew,
            xIsNext: !this.props.xIsNext
        });*/
    }
}
