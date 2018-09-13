import * as React from "react";

export interface ISquareProp {
    value: string;
    onClick: (e: any) => void
}

export const Square = (props: ISquareProp) => {
    return (
        <button className="square" onClick={ props.onClick }>
            {props.value}
        </button>
    );
};
