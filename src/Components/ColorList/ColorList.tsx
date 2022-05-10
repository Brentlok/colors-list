import './ColorList.scss';

interface Props {
    children: React.ReactNode;
}

const ColorList: React.FC<Props> = ({ children }) => (
    <div>
        <h1>Color List:</h1>
        <div className="colorList border">{children}</div>
    </div>
);

export default ColorList;
