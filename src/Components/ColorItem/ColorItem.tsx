import './ColorItem.scss';

interface Props {
    color: string;
}

const ColorItem: React.FC<Props> = ({ color }) => (
    <div className="colorItem">
        <div
            className="colorItem__color"
            //I was unable to use custom data-* attribute because css can only access attr(data-*) it in a content parameter of the style, if it is possible I would like to know how.
            style={{ backgroundColor: color }}
        ></div>
        <p>{color}</p>
    </div>
);

export default ColorItem;
