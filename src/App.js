import React, { useState, useEffect } from 'react';
import './App.css';
import FlashcardList from './FlashcardList';
import axios from 'axios'

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)
  
  useEffect(() =>{ 
    axios.get('https://opentdb.com/api.php?amount=10')
    .then(res => {
        setFlashcards(res.data.results.map((questionItem, index) => {
          const answer = questionItem.correct_answer
          const options = [...questionItem.incorrect_answers, answer]
          return {
            id: `${index}-${Date.now()}`,
            question: questionItem.question,
            answer: answer, 
            options: options.sort(() => Math.random() - .5)
        }
    }))
       
    })
  }, [])
  return (
    <FlashcardList flashcards={flashcards} />
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1, 
    question: 'What is 2 + 2?',
    answer: '4',
    options: [
      '2',
      '3',
      '4',
      '5'
    ]
  },
  {
    id: 2, 
    question: 'What is 2 + 5?',
    answer: 'answer',
    options: [
      '2',
      '3',
      '4',
      '5'
    ]
  }
]

export default App;
