import {Colors} from "../Colors";
import logo from '../../assets/black-knight.png'
import {Cell} from "../Cell";

export enum FigureNames {
    FIGURE = 'figure',
    KING = 'king',
    KNIGHT = 'knight',
    PAWN = 'pawn',
    QUEEN = 'queen',
    ROOK = 'rook',
    BISHOP = 'bishop',
}

export class Figure {
    color: Colors
    logo: typeof logo | null
    cell: Cell
    name: FigureNames
    id: number | string
    isFirstStep: boolean

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this
        this.logo = null
        this.name = FigureNames.FIGURE
        this.id = Math.random()
        this.isFirstStep = true
    }

    canMove (target: Cell, moving: boolean = false): boolean {
        if (target.figure?.color === this.color) {
            return false
        }

        if (target.figure?.name === FigureNames.KING) {
            return false
        }
        return true
    }

    move (target: Cell) {

    }
}