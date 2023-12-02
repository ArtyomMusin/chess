import {FC, useEffect, useRef, useState} from 'react'
import {Colors} from "../models/Colors";
import {Player} from "../models/Player";

interface IProps {
    name: Colors.WHITE | Colors.BLACK
    currentPlayer: Player | null
}

const Timer: FC<IProps> = ({ name, currentPlayer }) => {
    const [time, setTime] = useState<number>(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    const startTimer = () => {
        timer.current = setInterval(decrementTimer, 1000)
    }

    const stopTimer = () => {
        if (timer.current) {
            clearInterval(timer.current)
        }
    }

    useEffect(() => {
        if (name === currentPlayer?.color && time > 0) {
            startTimer()
        } else {
            stopTimer()
        }
    }, [currentPlayer])

    useEffect(() => {
        if (time === 0) {
            stopTimer()
        }
    }, [time])

    const decrementTimer = () => {
        setTime(prevState => prevState - 1)
    }

    return (
        <p className="Timer">
            {time}
        </p>
    )
}

export default Timer
