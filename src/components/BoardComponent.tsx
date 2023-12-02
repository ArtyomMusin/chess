import {FC, Fragment, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import Numbering, {NumberingSide, NumberingType} from "./Numbering";
import {Cell} from "../models/Cell";
import {logDOM} from "@testing-library/react";
import {Player} from "../models/Player";

interface IBoardProps {
    board: Board,
    setBoard: (board: Board) => void
    currentPlayer: Player | null
    swapPlayer: () => void
}

const BoardComponent: FC<IBoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    const handlerClickOnCell = (cell: Cell) => {
        if (selectedCell && selectedCell !== cell && selectedCell?.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)
            swapPlayer()
            setSelectedCell(null)
        } else {
            if (cell?.figure && currentPlayer?.color === cell?.figure?.color) {
                setSelectedCell(cell)
            }
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    const highlightCells = () => {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    const updateBoard = () => {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <div className="wrapper-board">
            <Numbering type={NumberingType.LETTERS} side={NumberingSide.TOP}/>
            <Numbering type={NumberingType.LETTERS} side={NumberingSide.BOTTOM}/>
            <Numbering type={NumberingType.DIGIT} side={NumberingSide.LEFT}/>
            <Numbering type={NumberingType.DIGIT} side={NumberingSide.RIGHT}/>
            <div className="Board">
                    {board.cells.map((row, i) =>
                        <Fragment key={`row_${i}`}>
                            {row.map((cell, i) =>
                                <CellComponent
                                    key={`cell_${i}`}
                                    cell={cell} isSelected={selectedCell?.x === cell.x && selectedCell?.y === cell.y}
                                    onClick={handlerClickOnCell}
                                />
                            )}
                        </Fragment>
                    )}
            </div>
        </div>
    );
};

export default BoardComponent;
