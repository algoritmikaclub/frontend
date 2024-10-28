import './App.css'
import { useEffect, useState } from 'react'

import Button from './components/Button/Button'
import User from './components/User/User'
import Comment from './components/Comment/Comment'

function App() {

    const [resources, setResources] = useState("users");
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${resources}`)
            .then((response) => response.json())
            .then((json) => setItems(json))
    }, [resources])

    function setContent() {
        if (resources === "users") {
            console.log('resources === "users"', items)
            return items.map((data, i) => <User key={i} props={data}/>)
        } else {
            console.log('resources === "comments"', items)
            return items.map((data, i) => <Comment key={i} props={data}/>)
        }
    }

    function handlerClick(type) {
        setItems([])
        setResources(type)
    }

    return (
        <main>
            <Button onClick={handlerClick}>users</Button>
            <Button onClick={handlerClick}>comments</Button>
            
            <h1>{resources}</h1>

            { setContent() }
        </main>
  );
}

export default App


