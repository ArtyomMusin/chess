import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";

export class Pawn extends Figure {
    isFirstStep: boolean = true
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.PAWN
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false
        }

        const step = this.cell.figure?.color === Colors.BLACK ? 1 : -1
        const firstStep = this.cell.figure?.color === Colors.BLACK ? 2 : -2

        if (target.x === this.cell.x) {
            if (!this.cell.board.getCell(target.x, target.y).isEmpty()) {
                return false
            }

            if (target.y === this.cell.y + step) {
                return true
            }

            if (this.isFirstStep && target.y === this.cell.y + firstStep) {
                return true
            }
        }

        const cellY = this.color === Colors.WHITE ? this.cell.y - 1 : this.cell.y + 1

        if (target.x === this.cell.x - 1 && target.y === cellY) {
            return this.cell.isEnemy(target)
        }

        if ( target.x === this.cell.x + 1 && target.y === cellY) {
            return this.cell.isEnemy(target)
        }

        return false
    }

    move (target: Cell) {
        super.move(target)
        this.isFirstStep = false
    }
}