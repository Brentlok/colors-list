import './Submit.scss';

interface Props {
    value: string;
}

const Submit: React.FC<Props> = ({ value }) => (
    <input className="submit" type="submit" value={value} />
);

export default Submit;
