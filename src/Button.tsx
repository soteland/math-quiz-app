
type Props = {
    children: React.ReactNode;
    onClick?: (e: any) => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string
}

export const Button = ({ children, onClick, type = "button", className = "" }: Props) => {
    return (
        <button
            type={type}
            className={"bg-blue-500 text-white py-1 px-2 text-xl rounded" + " " + className}
            onClick={onClick}
        >
            {children}
        </button>
    );
}