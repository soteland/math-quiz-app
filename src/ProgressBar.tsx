type Props = {
    progress: number;
};

export const ProgressBar = ({ progress }: Props) => {
    return (
        <div className="w-full bg-gray-300 rounded-full h-6 mb-4">
            <div
                className="bg-green-500 h-full rounded-full flex items-center justify-end"
                style={{ width: `${progress}%` }}
            >
                <span className="text-white font-bold pr-2">{`${progress}%`}</span>
            </div>
        </div>
    );
};