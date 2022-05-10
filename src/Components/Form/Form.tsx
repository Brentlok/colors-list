import './Form.scss';

interface Props {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<Props> = ({ children, onSubmit }) => (
    <form className="form" onSubmit={onSubmit}>
        {children}
    </form>
);

export default Form;
