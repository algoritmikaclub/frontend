import './App.css'
import Card from './components/Card/Card'
import Button from './components/Button/Button'

function App() {     
    return (
        <>
            <h1>LESS in React</h1>
            <nav>
                <Button color="">Button 1</Button>
                <Button color="red">Button 2</Button>
                <Button color="green">Button 3</Button>
            </nav>
            
            <Card title="Card A" content="This is a card #1" type="a" />
            <Card title="Card B" content="This is a card #2" type="b" />
            <Card title="Card A" content="This is a card #3" type="a" />
            <Card title="Card B" content="This is a card #4" type="b" />
            <Card title="Card A" content="This is a card #5" type="a" />
            <Card title="Card B" content="This is a card #6" type="b" />
        </>
    );
}

export default App

