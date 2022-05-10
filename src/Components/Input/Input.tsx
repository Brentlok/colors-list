import './Input.scss';

interface Props {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({ placeholder, value, onChange }) => (
    <input
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
);

export default Input;
