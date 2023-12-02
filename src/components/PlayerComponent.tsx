import {FC} from 'react'
import './PlayerComponent.css'
import Timer from "./Timer"
import {Colors} from "../models/Colors"
import {Player} from "../models/Player";
import {Board} from "../models/Board";

interface IProps {
    name: Colors.WHITE | Colors.BLACK
    isMove: boolean
    currentPlayer: Player | null
    board: Board
}

const PlayerComponent: FC<IProps> = ({ name, isMove, currentPlayer, board }) => {
    const lostFigures = name === Colors.WHITE ? board.lostWhiteFigures : board.lostBlackFigures

    return (
        <div className="PlayerComponent">
            <h2 className="PlayerComponent__Name">{name === Colors.BLACK ? 'Black' : 'White'} player</h2>
            <Timer name={name} currentPlayer={currentPlayer}/>
            <p className={["PlayerComponent__Move", isMove ? '_active' : ''].join(' ')}>Your move</p>
            <figure>
                <figcaption className="PlayerComponent__ListName">Lost figures:</figcaption>
                {lostFigures.length ?
                    <ol className="PlayerComponent__FiguresList">

                        {lostFigures.map(figure =>
                            <li key={figure.name + figure.color}><img className="PlayerComponent__Figure" src={figure.logo || undefined} alt=""/>{figure.name}</li>
                        )}
                    </ol>
                : 'None'}

            </figure>

        </div>
    )
}

export default PlayerComponent
