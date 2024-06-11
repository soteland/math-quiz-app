import React, { useState, useEffect, ChangeEvent } from 'react';
import { countriesByLetter } from './Countries';
import { Button } from './Button';


interface CountryInputProps { }


const getRandomLetter = (): string => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
};

const CountryInput: React.FC<CountryInputProps> = () => {
    const [letter, setLetter] = useState<string>(getRandomLetter());
    const [input, setInput] = useState<string>('');
    const [userCountries, setUserCountries] = useState<string[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);

    const countriesByLetter2 = countriesByLetter;

    useEffect(() => {
        setLetter(getRandomLetter());
        setUserCountries([]);
        setInput('');
        setShowResults(false);
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInput(e.target.value);
    };

    const submit = (e: any) => {
        e.preventDefault();
        setUserCountries([...userCountries, input.trim()]);
        setInput('');

    };

    const handleDone = (): void => {
        setShowResults(true);
    };

    const handleNext = (): void => {
        setLetter(getRandomLetter());
        setUserCountries([]);
        setInput('');
        setShowResults(false);
    };

    return (
        <div className="bg-gray-800 text-white min-h-screen flex gap-2 flex-col items-center justify-center text-lg">
            <div className='border-2 border-gray-500 p-6 rounded-lg'>
                <h1 className='mb-4'>Land som begynner på: {letter}</h1>
                {!showResults ? (
                    <>
                        <p>Skriv inn alle land du kommer på!</p>
                        <form onSubmit={submit}>

                            <input
                                className="border border-gray-400 p-1 rounded mr-2 w-full mb-2"
                                type="text"
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Skriv inn land"
                            />

                            <input className={"bg-blue-500 text-white py-1 px-2 text-xl rounded mb-4 mr-2" + " "} type="submit" value="Legg til land" />

                            <Button onClick={handleDone}>Ferdig</Button>

                            <h2 className='text-2xl pb-2'>Liste over alle landene</h2>
                            <ul>
                                {userCountries.map((country, index) => (
                                    <li key={index}>{country}</li>
                                ))}
                            </ul>
                        </form>
                    </>
                ) : (
                    <>
                        <div className='grid grid-cols-2 gap-2 p-2'>
                            <div className='border border-2 rounded border-gray-500 p-4'>
                                <h2 className='text-2xl pb-2'>Du fant {userCountries.length} land!</h2>
                                <ul>
                                    {userCountries.sort().map((country, index) => (
                                        <li key={index}>{country}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className='border border-2 rounded border-gray-500 p-4'>
                                <h2 className='text-2xl pb-2'>Liste over alle landene</h2>
                                <ul>
                                    {countriesByLetter2[letter]?.sort().map((country, index) => (
                                        <li key={index}>{country}</li>
                                    )) || <li>Det finnes ingen land med denne bokstaven!</li>}
                                </ul>
                            </div>
                            <br></br>
                            <button onClick={handleNext}>Neste bokstav</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CountryInput;