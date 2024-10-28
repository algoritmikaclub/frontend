import { useState } from 'react'
import tabsList from '../../data/tabsList'
import Button from '../Button/Button'
import './TabContainer.css'

let index = null

function TabContainer() {
    let [tabState, tabStateSet] = useState('Нажмите на любую кнопку')

    function handleClick(event) {
        const tabTitle = event.target.innerText
        tabsList.forEach( (tab, i) => {
            if (tab.title === tabTitle) {
                tabStateSet(tab.text)
                index = i
            }
        })
    }

    return (
        <div className='container' onClick = {handleClick} >
            <Button isActive={index === 0}>Библиотека React</Button>
            <Button isActive={index === 1}>React компоненты</Button>
            <Button isActive={index === 2}>Виртуальный DOM</Button>
            <div className='message'>{tabState}</div>
        </div>
    )
}

export default TabContainer
