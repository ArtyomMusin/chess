import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import PlayerComponent from "./components/PlayerComponent";

function App() {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

    const swapPlayer = () => {
        setCurrentPlayer(prevState => prevState === whitePlayer ? blackPlayer : whitePlayer)
    }

    useEffect(() => {
        restart()
    }, [])

    const restart = () => {
        const newBoard = new Board()
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
        setCurrentPlayer(whitePlayer)
    }

    return (
        <div className="App">
            <header className='header'>
                <p>Chess</p>
            </header>
            <main className="main">
                <PlayerComponent name={Colors.WHITE} isMove={currentPlayer === whitePlayer} currentPlayer={currentPlayer} board={board}/>
                <BoardComponent
                    board={board}
                    setBoard={setBoard}
                    currentPlayer={currentPlayer}
                    swapPlayer={swapPlayer}
                />
                <PlayerComponent name={Colors.BLACK} isMove={currentPlayer === blackPlayer} currentPlayer={currentPlayer} board={board}/>
            </main>
        </div>
    )
}

export default App
