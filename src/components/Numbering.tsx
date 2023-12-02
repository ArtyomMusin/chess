import {FC} from 'react';

export enum NumberingType {
    LETTERS = '_horizontal',
    DIGIT = '_vertical'
}

export enum NumberingSide {
    TOP = '_top',
    BOTTOM = '_bottom',
    LEFT = '_left',
    RIGHT = '_right'
}

interface IProps {
    type: NumberingType,
    side: NumberingSide
}

const Numbering: FC<IProps> = ({ type, side }) => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    return (
        <div className={['Numbering', type, side].join(' ')}>
            {letters.map((letter, index) =>
                type === NumberingType.LETTERS ? <span key={`${type}_${side}_${index}`}>{letter}</span> : <span key={`${type}_${side}_${index}`}>{index + 1}</span>
            )}
        </div>
    );
};

export default Numbering;