import React, { useState } from 'react';
import { Button } from './Button';

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
            setInputValue('');
        } else {
            alert('Try again!');
            setInputValue('');
        }
    };

    return (
        <div className='text-center'>
            <h1>Gangetabellen</h1>
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
                                        <td className='h-10 w-10 border border-gray-400 text-center'
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
                        <p>
                            What is {currentMultiplication.i} x {currentMultiplication.j}?
                        </p>
                        <input

                            className="border border-gray-400 p-2 rounded mr-2 text-3xl w-24"
                            type="number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            required
                        />
                        <Button type="submit">
                            Svar</Button>
                    </form>
                ) : (
                    <p>Congratulations! You have completed the multiplication table.</p>
                )
            }
        </div >
    );
};