import React from "react";
import "./App.css";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = React.useState([
    {
      id: 0,
      value: "Die",
      held: false,
    },
  ]);

  const [gameOver, setGameOver] = React.useState(false);

  React.useEffect(() => {
    const checkValues = dice.every((eachObject) => {
      return dice[0].value === eachObject.value;
    });

    const checkIfHeld = dice.every((eachObject) => {
      return eachObject.held === true;
    });

    (checkIfHeld && checkValues)
      ? setGameOver((gameOver) => !gameOver)
      : setGameOver((gameOver) => gameOver);
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
      />
    );
  });

  return (
      <div className="page-container">   

        <div className="congrats-div">
        {/* {gameOver && <h1 className="congrats"> Congratulations on completing the game!!</h1>} */}
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
        <button className="roll-btn" onClick={rollDice}>
          Roll
        </button>

        <button className="roll-btn" onClick={newDiceArray}>
          Start game!
        </button>
      </div>
      
      </div>
  );
}

export default App;
