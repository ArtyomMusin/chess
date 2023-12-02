import {FC} from 'react';
import {Cell} from "../models/Cell";

interface IProps {
    cell: Cell,
    isSelected: boolean
    onClick: (cell: Cell) => void
}

const CellComponent: FC<IProps> = ({ cell, isSelected , onClick}) => {
    return (
        <div className={['Cell', cell.figure ? 'figure' : '', cell.color, cell.available ? '_available' : ''].join(' ')} onClick={() => onClick(cell)}>
            {cell.figure?.logo && <img className={['Cell__Img', cell.figure.color, isSelected ? '_active' : ''].join(' ')} src={cell.figure?.logo} alt={`${cell.figure.name}_${cell.figure.color}`}/>}
        </div>
    );
};

export default CellComponent;
