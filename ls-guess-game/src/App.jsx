import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [arrayGuessNumber, setArrayGuessNumber] = useState([]);
  const [result, setResult] = useState(false);
  const [message,setMessage] = useState("");
  const [disable, setDisable] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const guessNumber = useRef();
  
  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
  }, [newGame]);
  const playGame = () => {
    if (guessNumber.current.value < 1 || guessNumber.current.value> 100) {
      setMessage('Please enter a number from 1 to 100.')
    } else {
      if (arrayGuessNumber.length < 4) {
        const newArray = [...arrayGuessNumber, guessNumber.current.value];
        setArrayGuessNumber(newArray);
        if (guessNumber.current.value == randomNumber) {
          setResult(true);
          setDisable(true);
        } else {
          setResult(false);
          if (guessNumber.current.value > randomNumber) {
            setMessage('大きいすぎです。')
          } else if (guessNumber.current.value < randomNumber) {
            setMessage('小さいすぎです。')
          }
        }
      }
    }
    guessNumber.current.value = "";
  }
  const startNewGame = () => {
    setNewGame(!newGame);
    setArrayGuessNumber([]);
    setResult(false);
    setMessage("");
    setDisable(false);
  }
  return (
    <div className='container'>
      <div className='box'>
        <div className='header'>
          <p>{randomNumber}</p>
          <h1>Number Guessing Game</h1>
        </div>
        <div className='body'>
          <p>We have selected a random number between 1 and 100. See if you can guess it in 4
          turns or fewer. We&apos;ll tell you if your guess was too high or too low.</p>
          <div className='input-field'>
            <p>Enter a guess:</p>
            <input type="number" name='guess-number' className='guess-number' ref={guessNumber} disabled={disable||arrayGuessNumber.length == 4}/>
            <button type='button' onClick={() => playGame()}>Submit guess</button>
          </div>
        </div>
        <div className='footer'>
          <p>Previous guesses:{arrayGuessNumber.join(',')}</p>
          {!result && message && arrayGuessNumber.length < 4 &&<p className='message red'>WRONG!</p>}
          {!result && arrayGuessNumber.length >= 4 && <p className='message black'>Game Over!</p>}
          {result && <p className='message green'>Congratulations!You got it right!</p>}
          {message && <p>{message}</p>}
          {!result && arrayGuessNumber.length >= 4 &&
          <button type='button' onClick={startNewGame}>New game</button>}
        </div>
      </div>
    </div>
  )
}

export default App
