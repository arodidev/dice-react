import React from "react";
import "./App.css";
import Die from "./components/Die";
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = React.useState([
    {
      id: 0,
      value: "click to start",
      held: false,
    },
  ]);

  const [gameOver, setGameOver] = React.useState(false);

  React.useEffect(() => {
    const checkValues = dice.every((eachObject) => {
      return dice.length > 1 && dice[0].value === eachObject.value;
    });

    const checkIfHeld = dice.every((eachObject) => {
      return dice.length > 1 && eachObject.held === true;
    });

    checkIfHeld && checkValues ? setGameOver(true) : setGameOver(false);
  }, [dice]);

  //This function creates new objects to be added to state
  function newDiceArray() {
    setDice(() => {
      const newArray = [];

      for (let i = 0; i < 9; i++) {
        newArray.push({
          id: i + 1,
          value: randomNumber(),
          held: false,
        });
      }
      return newArray;
    });
  }

  function rollDice() {
    setDice((dice) => {
      const roll = dice.map((obj) => {
        return obj.held ? { ...obj } : { ...obj, value: randomNumber() };
      });
      return roll;
    });
  }

  function holdDie(passedId) {
    setDice((dice) => {
      const heldDice = dice.map((obj) => {
        return obj.id === passedId
          ? { ...obj, held: obj.held ? false : true }
          : { ...obj };
      });
      return heldDice;
    });
  }

  function randomNumber() {
    return Math.ceil(Math.random() * 6);
  }

  const elements = dice.map((eachObject) => {
    return (
      <Die
        key={eachObject.id}
        {...eachObject}
        hold={() => holdDie(eachObject.id)}
        click = {() => newDiceArray()}
      />
    );
  });

  return (
      <div className="page-container">   

        <div className="congrats-div">
        {gameOver && <Confetti />}
        </div>  
        
        <div className="title-div">
        <h1 className="title"> Dice application.</h1>  
        </div>
        <div className="instructions-div">
          <h2>
            Click on a die to hold it, then click the roll button to hold the other dice. <br/>
            Continue until all the dice held are the same number, then the game will be over...
          </h2>
        </div>
      
      <div className="die-div">
        {elements}
      </div>

      <div className="buttons-div">
        <button 
          className="roll-btn" 
          onClick={rollDice}
          disabled = {dice.length === 1 ? true: false}
          style = {dice.length === 1 ? {backgroundColor: '#808080'}:{backgroundColor: '#1768AC'}}
        >
          Roll
        </button>

        <button 
          className="roll-btn" 
          onClick={newDiceArray}
          disabled = {dice.length === 1 ? true: false}
          style = {dice.length === 1 ? {backgroundColor: '#808080'}:{backgroundColor: '#1768AC'}}
        >

          Reset game!
        </button>
      </div>
      
      </div>
  );
}

export default App;
