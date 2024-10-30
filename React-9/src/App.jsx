import { useRef } from 'react'
import { useState, useEffect } from 'react'
import './App.css'

import Range from './components/Range/Range'

function App() {
    const [color, colorSet] = useState({R:0,G:0,B:0})

    function handleChangeColor(colorName, value) {
        const colorAbbreviation = colorName[0].toUpperCase()
        const newColor = {...color}
        newColor[colorAbbreviation] = value
        colorSet(newColor)
    }

    const colorNames = useRef(null)
    useEffect( effectFunction, [])
    function effectFunction() {
        fetch('colors.json')
        .then(data => data.json())
        .then(json => {
            colorNames.current = json
            colorSet({...color})
        })
    }

    function getColorName() {
        if (!colorNames.current) return ''

        let colorName = ''
        for(let key in colorNames.current) {
            const colorsArr = colorNames.current[key]
            if (colorsArr[0] === color.R && colorsArr[1] === color.G && colorsArr[2] === color.B) {
                colorName = key
            }
        }
        return colorName
    }
    
    return (
        <main>
            <input type='text' id="result" value={color.R+', '+color.G+', '+color.B} readOnly={true}></input>

            <div id="representation-box"
                style={{
                    color: (color.R > 123 || color.G > 123 || color.B > 123) ? 'black' : 'white',
                    backgroundColor: `rgb(${color.R},${color.G},${color.B})`,
                }}
            > {getColorName()}
            </div>

            <Range colorName={"Red"} onChange={handleChangeColor} />
            <Range colorName={"Green"} onChange={handleChangeColor} />
            <Range colorName={"Blue"} onChange={handleChangeColor} />
        </main>
    )
}

export default App
