import React, { useState } from 'react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';
import ConfettiExplosion from 'react-confetti-explosion';

const generateMultiplications = () => {
    const multiplications = [];
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            multiplications.push({ i, j, result: i * j });
        }
    }
    return multiplications.sort(() => Math.random() - 0.5); // Shuffle array
};



export const Multiplication1 = () => {
    const [multiplications, setMultiplications] = useState(generateMultiplications());
    const [inputValue, setInputValue] = useState('');
    const [currentMultiplication, setCurrentMultiplication] = useState(multiplications[0]);
    const [completed, setCompleted] = useState<any>({});


    const [answerInfo, setAnswerInfo] = useState('');


    const [isExploding, setIsExploding] = React.useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const answer = parseInt(inputValue, 10);
        if (answer === currentMultiplication.result) {
            setCompleted((prevCompleted: any) => ({
                ...prevCompleted,
                [`${currentMultiplication.i},${currentMultiplication.j}`]: currentMultiplication.result,
            }));
            const nextMultiplications = multiplications.slice(1);
            setMultiplications(nextMultiplications);
            if (nextMultiplications.length > 0) {
                setCurrentMultiplication(nextMultiplications[0]);
            }
            setAnswerInfo("Nice! Riktig svar! 🎉")
            setInputValue('');
        } else {
            setAnswerInfo("Feil svar! Prøv igjen.")
            setInputValue('');
        }
    };

    return (
        <div className='text-center max-w-[500px] mx-auto'>
            <h1>Gangetabellen</h1>
            <br></br>
            <table className='mx-auto' style={{
                borderCollapse: 'collapse'
            }}>
                <tbody>
                    <tr>
                        <td>    </td>
                        {Array.from({ length: 10 }, (_, i) => (
                            <td key={i + 1}>{i + 1}</td>
                        ))}
                    </tr>
                    {
                        Array.from({ length: 10 }, (_, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className='h-10 w-10'>{rowIndex + 1}</td>
                                {Array.from({ length: 10 }, (_, colIndex) => {
                                    const key = `${rowIndex + 1},${colIndex + 1}`;
                                    return (
                                        <td className='h-10 w-10 border border-gray-400 text-center text-neutral-700 font-bold'
                                            key={colIndex}
                                            style={{
                                                backgroundColor: completed[key] ? 'lightgreen' : 'white',
                                            }}
                                        >
                                            {completed[key] || ''}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    }
                </tbody>
            </table >
            {
                multiplications.length > 0 ? (
                    <form onSubmit={handleSubmit}>
                        <br></br>
                        <p className='text-xl'>
                            Hva er {currentMultiplication.i} x {currentMultiplication.j}?
                        </p>
                        <br></br>
                        <input
                            autoFocus
                            className="border border-gray-400 p-2 rounded mr-2 text-3xl w-24"
                            type="number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            required
                        />
                        <Button type="submit">
                            Svar</Button>

                        <p>{answerInfo}</p>
                    </form>
                ) : (
                    <p>GRATULERER! Du klarte hele gangetabellen!
                        {isExploding && <ConfettiExplosion />}</p>
                )
            }
            <br></br>
            <br></br>
            Hvor langt har du kommet?
            <ProgressBar progress={100 - multiplications.length} />
        </div >
    );
};