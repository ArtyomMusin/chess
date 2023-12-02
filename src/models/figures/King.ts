import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {
    isFirstStep: boolean = true
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.KING
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false
        }

        if (this._castlingIsPossible(target)) {
            return true
        }

        if (this.cell.x !== target.x && this.cell.x !== target.x - 1 && this.cell.x !== target.x + 1) {
            return false
        }

        if (this.cell.y !== target.y && this.cell.y !== target.y - 1 && this.cell.y !== target.y + 1) {
            return false
        }

        return true
    }

    move(target: Cell) {
        super.move(target)
        if (this._castlingIsPossible(target)) {
            this._castling(target)
        }
        this.isFirstStep = false
    }

    _castlingIsPossible (target: Cell): boolean {
        if (this.isFirstStep && (this.cell.x === target.x + 2 || this.cell.x === target.x - 2)) {
            if (this.cell.y !== target.y) {
                return false
            }

            if (!this.cell.board.getCell(target.x, target.y).isEmpty()) {
                return false
            }

            const toLeft = target.x < this.cell.x

            const rook1Cell = this.cell.board.getCell(0, this.cell.y)
            const rook2Cell = this.cell.board.getCell(7, this.cell.y)

            if (toLeft && rook1Cell?.figure && rook1Cell?.figure?.name === FigureNames.ROOK && rook1Cell?.figure?.isFirstStep) {
                return true
            }

            if (!toLeft && rook2Cell?.figure && rook2Cell?.figure?.name === FigureNames.ROOK && rook2Cell?.figure?.isFirstStep) {
                return true
            }
        }
        return false
    }

    _castling (target: Cell) {
        const loLeft = target.x < this.cell.x
        const rookCell = this.cell.board.getCell(loLeft ? 0 : 7, this.cell.y)
        const rookNewCell = this.cell.board.getCell(loLeft ? 3 : 5, this.cell.y)
        rookNewCell.figure = rookCell?.figure
        rookCell.figure!.cell = rookNewCell
        rookCell.figure = null
    }
}
