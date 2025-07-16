"use client";

import Image from "next/image";
import { useEffect, useState } from "react";


const DummyQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "2 + 2 equals?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "React is a ...?",
    options: ["Library", "Framework", "Language", "IDE"],
    answer: "Library",
  },
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
    answer: "Delhi",
  },
  {
    question: "HTML stands for?",
    options: [
      "HyperText Markup Language",
      "HyperText Makeup Language",
      "Hyper Transfer Markup Language",
      "HighText Markup Language",
    ],
    answer: "HyperText Markup Language",
  },
  {
    question: "Which language runs in the browser?",
    options: ["Python", "C++", "JavaScript", "Java"],
    answer: "JavaScript",
  },
  {
    question: "CSS is used for?",
    options: [
      "Data Storage",
      "Styling Web Pages",
      "Server Communication",
      "Version Control",
    ],
    answer: "Styling Web Pages",
  },
  {
    question: "Which is a JavaScript framework?",
    options: ["Django", "Flask", "React", "Laravel"],
    answer: "React",
  },
  {
    question: "Which tag is used for headings in HTML?",
    options: ["<head>", "<h1>", "<header>", "<title>"],
    answer: "<h1>",
  },
  {
    question: "Who developed React?",
    options: ["Google", "Microsoft", "Facebook", "Amazon"],
    answer: "Facebook",
  },
  {
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Application Program Interaction",
      "Applied Programming Interface",
      "Application Programming Integration",
    ],
    answer: "Application Programming Interface",
  },
  {
    question: "Which company owns GitHub?",
    options: ["Google", "Microsoft", "Amazon", "Meta"],
    answer: "Microsoft",
  },
  {
    question: "What is the default port for HTTP?",
    options: ["443", "21", "80", "25"],
    answer: "80",
  },
];

export default function Home() {
  const [questions, setQuestions] = useState(DummyQuestions);
  const [currentQuestion, setCurrentQuestion] = useState();

  //could have maintain a single object to store all three score but for simplicity kept one
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [selected, setSelected] = useState(null);

  function getRandomQuestion() {
    if (questions.length > 0) {
      const toBeRemovedIndex = Math.floor(Math.random() * questions.length);
      const selectedQuestion = questions[toBeRemovedIndex];
      setCurrentQuestion(selectedQuestion);
      setQuestions((prev) =>
        prev.filter((_, index) => index !== toBeRemovedIndex)
      );
    }
  }

  function handleSubmit() {
    if (selected === currentQuestion.answer) {
      setCorrect((prev) => prev + 1);
    } else {
      setWrong((prev) => prev + 1);
    }
    getRandomQuestion();
  }

  function restartQuiz() {
    setCorrect(0);
    setWrong(0);
    setSkipped(0);
    setSelected(null); 
    setQuestions(DummyQuestions);
    setCurrentQuestion(null); 
    
//taking time in uodating so that old states gets updated and then this takes effect
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * DummyQuestions.length);
      const firstQuestion = DummyQuestions[randomIndex];
      setCurrentQuestion(firstQuestion);
      setQuestions(DummyQuestions.filter((_, index) => index !== randomIndex));
    }, 0);
  }

const handleSkip=()=>{
  if(questions.length>=0){
setSkipped((prev)=>prev+=1);
getRandomQuestion();
  }
}



  useEffect(() => {
    getRandomQuestion();
  }, []);
  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Quiz App</h1>
      <p className="font-semibold">{currentQuestion?.question}</p>
      {
        currentQuestion &&      <div className="space-y-2">
        {currentQuestion?.options.map((opt) => (
          <div key={opt}>
            <input
              type="radio"
              id={opt}
              name="option"
              value={opt}
              checked={selected === opt}
              onChange={(e) => setSelected(e.target.value)}
            />
            <label htmlFor={opt} className="ml-2">
              {opt}
            </label>
          </div>
        ))}
      </div>
      }


      <button
      disabled={!(questions.length>=0)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit Answer
      </button>
      <button
      disabled={!(questions.length>=0)}
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleSkip}
      >
        Skip Question
      </button>

      {correct + wrong + skipped === DummyQuestions.length && (
        <div>
          <div className="space-y-1">
            <h2 className="font-semibold">Scoreboard</h2>
            <p>Correct Answers: {correct}</p>
            <p>Wrong Answers: {wrong}</p>
            <p>Skipped: {skipped}</p>
          </div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={restartQuiz}
          >
            Restart Quiz
          </button>
        </div>
       )}
    </div>
  );
}
