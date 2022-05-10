import './Input.scss';

interface Props {
    placeholder: string;
    value: string;
    onChange: any;
}

const Input: React.FC<Props> = ({ placeholder }) => (
    <input placeholder={placeholder} />
);

export default Input;
