import React, { useState, useEffect } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

function App() {
  const [num1, setNum1] = useState(generateRandomNumber());
  const [num2, setNum2] = useState(generateRandomNumber());
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  const [lowerBound, setLowerBound] = useState(1);
  const [upperBound, setUpperBound] = useState(100);

  useEffect(() => {
    setNum1(generateRandomNumber());
    setNum2(generateRandomNumber());
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
    } else {
      setMessage('Feil :(');
    }
    setAnswer('');
    setNum1(generateRandomNumber());
    setNum2(generateRandomNumber());
    setTimeout(() => {
      setIsExploding(false);
    }, 2000);
  }

  const [isExploding, setIsExploding] = React.useState(false);

  return (

    <div className="bg-gray-800 text-white min-h-screen flex items-center justify-center">
      <div className='border-2 border-gray-500 p-4 rounded-lg'>
        <header className="text-center">
          <h1 className="text-4xl font-bold mb-4">Super-Matte</h1>
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="number"
              value={lowerBound}
              onChange={(e) => setLowerBound(e.target.value)}
              required
              className="border border-gray-400 p-1 rounded mr-2"
            />
            <input
              type="number"
              value={upperBound}
              onChange={(e) => setUpperBound(e.target.value)}
              required
              className="border border-gray-400 p-1 rounded mr-2"
            />
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
              className="border border-gray-400 p-2 rounded mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Svar
            </button>
            {isExploding && <ConfettiExplosion />}
          </form>
          <p className="text-xl">{message}</p>
        </header>
      </div>
    </div>
  );
}

export default App;
