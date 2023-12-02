import {Colors} from "./Colors";
import {Figure} from "./figures/Figure";
import {Board} from "./Board";

export class Cell {
    readonly x: number
    readonly y: number
    readonly color: Colors
    figure: Figure | null
    board: Board
    available: boolean
    id: number | string

    constructor(board: Board, x: number, y: number, colors: Colors, figure: Figure | null) {
        this.x = x
        this.y = y
        this.color = colors
        this.figure = figure
        this.board = board
        this.available = false
        this.id = Math.random()
    }

    isEmpty () {
        return this.figure === null
    }

    isEnemy (target: Cell): boolean {
        return target.figure !== null && this.figure?.color !== target.figure.color
    }

    isEmptyVertical (target: Cell): boolean {
        if (target.x !== this.x) {
            return false
        }

        const min = Math.min(this.y, target.y)  // this - current cell of figure; target - new cell where we can go
        const max = Math.max(this.y, target.y)

        for (let y = min + 1; y < max; y ++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false
            }
        }

        return true
    }

    isEmptyHorizontal (target: Cell): boolean {
        if (target.y !== this.y) {
            return false
        }

        const min = Math.min(this.x, target.x)  // this - current cell of figure; target - new cell where we can go
        const max = Math.max(this.x, target.x)

        for (let x = min + 1; x < max; x ++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false
            }
        }

        return true
    }

    isEmptyDiagonal (target: Cell): boolean {
        const absX = Math.abs(this.x - target.x)
        const absY = Math.abs(this.y - target.y)

        if (absX !== absY) {
            return false
        }

        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1

        for (let i = 1; i < absX; i++ ) {
            if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
                return false
            }
        }

        return true
    }

    setFigure (figure: Figure) {
        this.figure = figure
        this.figure.cell = this
    }

    addLostFigure (figure: Figure) {
        if (figure.color === Colors.WHITE) {
            this.board.lostWhiteFigures.push (figure)
        } else {
            this.board.lostBlackFigures.push (figure)
        }
    }

    moveFigure (target: Cell) {
        if (this.figure?.canMove(target)) {
            this.figure?.move(target)
            if (target.figure) {
                this.addLostFigure(target.figure)
            }
            target.setFigure(this.figure)
            this.figure = null
        }
    }
}