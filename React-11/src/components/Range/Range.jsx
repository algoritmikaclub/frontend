import { useState, useRef } from 'react'
import './Range.css'

function Range({colorName, onChange}) {
    const [value, valueSet] = useState(0)
    const colorNameRef = useRef(colorName)

    function handleChange(event) {
        const value = +event.target.value
        valueSet(value)
        onChange(colorNameRef.current, value)
    }

    return (
        <div className='rangeContainer'>
            <input type='range'
                style={{accentColor: colorName}}
                id={colorName}
                min={0}
                max={255}
                step={1}
                value={value}
                onChange={handleChange}
            >
            </input>
            <label htmlFor={colorName}>{colorName}: {value}</label>
        </div>
    )
}

export default Range
