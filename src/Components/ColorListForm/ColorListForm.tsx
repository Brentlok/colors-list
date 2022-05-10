import { useState } from 'react';
import ColorItem from '../ColorItem';
import ColorList from '../ColorList/ColorList';
import Form from '../Form';

const ColorListForm: React.FC = () => {
    const defaultList: string[] = ['#FF0000', '#00FF00', '#0000FF'];

    const [colorList, setColorList] = useState<string[]>(defaultList);

    const getColorList = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <Form onSubmit={getColorList}>
            <ColorList>
                {colorList.map((color) => (
                    <ColorItem key={color} color={color} />
                ))}
            </ColorList>
        </Form>
    );
};

export default ColorListForm;
