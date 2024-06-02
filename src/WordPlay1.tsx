import React, { useState, useEffect } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { Button } from './Button';

export function WordPlay1() {

    // Define the list of words
    const words = ['banan', 'eple', 'engelsk', 'brød', "skole", 'ananas', "datamaskin", "rød", "grønn"
        ,
        "hei",
        "lastebil",
        "vegg",
        "vinge",
        "alle",
        "blå",
        "fekte",
        "pc",
        "elefant",
        "gris",
        "lys",
        "klasserom",
        "ekte",
        "falsk",
        "snill",
        "liste",
        "katt",
        "hund",
        "laks",
        "grøt",
        "hånd",
        "fot",
        "hode",
        "nese",
        "finger",
        "lett",

    ];
    const [correctWord, setCorrectWord] = useState('');
    const [options, setOptions] = useState<any>([]);
    const [message, setMessage] = useState('');

    const [isExploding, setIsExploding] = React.useState(false);


    const [score, setScore] = useState(0)

    const [scoreStreak, setScoreStreak] = useState(0)

    // Function to shuffle array elements
    const shuffleArray = (array: any) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    // Function to initialize the game
    const initializeGame = () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        const chosenWord = words[randomIndex];
        setCorrectWord(chosenWord);

        const shuffledOptions = [...words];
        shuffleArray(shuffledOptions);
        const awwww = [...shuffledOptions.slice(0, 3), chosenWord]
        shuffleArray(awwww);
        setOptions(awwww);
    };

    // Handle word selection
    const handleSelection = (word: any) => {
        if (word === correctWord) {
            setMessage('Riktig!');
            setIsExploding(true);
            setScore(score + 1)
            if (score > scoreStreak) setScoreStreak(score + 1)
            initializeGame();
            setTimeout(() => {
                setIsExploding(false);
            }, 2000);
        } else {
            setScore(0)
            setMessage('Feil Prøv igjen!');
        }
    };

    // Initialize game on component mount
    useEffect(() => {
        initializeGame();
    }, []);



    return (
        <div>
            <div className="bg-gray-800 text-white min-h-screen flex gap-2 flex-col items-center justify-center text-lg">
                <div className='border-2 border-gray-500 p-6 rounded-lg'>
                    <header className="text-center flex gap-4 flex-col">
                        <h1 className="text-4xl font-bold mb-4">Finn riktig ord!</h1>


                        <p className="text-xl mb-4">
                            Trykk på dette ordet under: {correctWord}
                        </p>
                        <div className='flex gap-3'>

                            {options.map((word: string, index: number) => (
                                <Button
                                    key={index}
                                    onClick={() => handleSelection(word)}
                                >
                                    {word}
                                </Button>
                            ))}
                        </div>
                        {isExploding && <ConfettiExplosion />}

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
        </div>
    );
};
