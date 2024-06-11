export function Menu() {
    return (
        <div className="flex gap-2 p-2 justify-center">
            <a className="bg-green-500 text-white py-1 px-2 text-lg rounded" href={`/`}>Matte 1</a>
            <a className="bg-green-500 text-white py-1 px-2 text-lg rounded" href={`/wordplay1`}>Ordspill 1</a>
            <a className="bg-green-500 text-white py-1 px-2 text-lg rounded" href={`/multiplication1`}>Gangetabellen</a>
            <a className="bg-green-500 text-white py-1 px-2 text-lg rounded" href={`/puzzle1`}>Puslespill 1</a>
            <a className="bg-green-500 text-white py-1 px-2 text-lg rounded" href={`/geography1`}>Verdens land</a>
        </div>
    )
}