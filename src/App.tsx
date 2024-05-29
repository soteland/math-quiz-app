import React, { useState, useEffect } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

function App() {
  const [score, setScore] = useState(0)

  const [scoreStreak, setScoreStreak] = useState(0)

  const [lowerBound, setLowerBound] = useState(1);
  const [upperBound, setUpperBound] = useState(100);

  const [num1, setNum1] = useState(generateRandomNumber2(lowerBound, upperBound));
  const [num2, setNum2] = useState(generateRandomNumber2(lowerBound, upperBound));

  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setNum1(generateRandomNumber2(lowerBound, upperBound));
    setNum2(generateRandomNumber2(lowerBound, upperBound));
  }, [lowerBound, upperBound]);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function generateRandomNumber2(a: number, b: number) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const correctAnswer = num1 + num2;
    if (parseInt(answer, 10) === correctAnswer) {
      setMessage('Riktig!');
      setIsExploding(true);
      setScore(score + 1)
      if (score > scoreStreak) setScoreStreak(score + 1)
    } else {
      setMessage('Feil :(');
      setScore(0)
    }
    setAnswer('');
    setNum1(generateRandomNumber2(lowerBound, upperBound));
    setNum2(generateRandomNumber2(lowerBound, upperBound));
    setTimeout(() => {
      setIsExploding(false);
    }, 2000);
  }

  const [isExploding, setIsExploding] = React.useState(false);

  return (

    <div className="bg-gray-800 text-white min-h-screen flex gap-2 flex-col items-center justify-center">
      <div className='border-2 border-gray-500 p-6 rounded-lg'>
        <header className="text-center flex gap-4 flex-col">
          <h1 className="text-4xl font-bold mb-4">Super-Matte</h1>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className='flex gap-4'>
              <span className='pt-1'>Minimum:</span><input
                type="number"
                value={lowerBound}
                onChange={(e) => setLowerBound(parseInt(e.target.value))}
                required
                className="border w-14 border-gray-400 p-1 rounded mr-2"
              />

              <span className='pt-1'>Maksimum:</span>
              <input
                type="number"
                value={upperBound}
                onChange={(e) => setUpperBound(parseInt(e.target.value))}
                required
                className="border w-14 border-gray-400 p-1 rounded mr-2"
              />
            </div>
          </form>

          <p className="text-xl mb-4">
            Hva er {num1} + {num2}?
          </p>
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              className="border border-gray-400 p-2 rounded mr-2 text-3xl w-24"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Svar
            </button>
            {isExploding && <ConfettiExplosion />}
          </form>
          <p className="text-xl">{message}</p>
        </header>
      </div>
      <div className='border-2 border-gray-500 p-4 rounded-lg flex flex-col'>
        <div>
          <span>Antall rette på rad: {score}</span>
        </div>
        <div>
          <strong>Maks rette på rad: {scoreStreak}</strong>
        </div>
      </div>
    </div>
  );
}

export default App;
