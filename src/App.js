import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import FlashcardList from './FlashcardList';
import axios from 'axios'

function App() {
  const [flashcards, setFlashcards] = useState([])
  
  const categoryE1 = useRef()
  
  useEffect(() =>{ 
    axios.get('https://opentdb.com/api.php?amount=10')
    .then(res => {
        setFlashcards(res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer)
          const options = [...questionItem.incorrect_answers.map(a => decodeString(a)),
             answer]
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer, 
            options: options.sort(() => Math.random() - .5)
        }
    }))
       
    })
  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea') 
    textArea.innerHTML = str 
    return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <> 
    <form className='header' onSubmit={handleSubmit}>
          <div className='form-group'> 
            <label htmlfor="category"> Category </label> 
            <select id="category" ref={categoryE1}>
            </select>
          </div>
    </form>
    <div className='container'> 
    <FlashcardList flashcards={flashcards} />
    </div>
    </>
  );
}

export default App;
