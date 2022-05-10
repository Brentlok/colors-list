import React, { useEffect, useRef, useState } from 'react';
import ColorItem from '../ColorItem';
import ColorList from '../ColorList/ColorList';
import Filters from '../Filters';
import Form from '../Form';
import { defaultFilters, FiltersInterface } from './filters';

const ColorListForm: React.FC = () => {
    const defaultList: string[] = ['#FF0000', '#00FF00', '#0000FF'];

    const [colorList, setColorList] = useState<string[]>([]);

    const filtersRef = useRef<FiltersInterface>(defaultFilters);
    const [filters, setFilters] = useState<FiltersInterface>(defaultFilters);

    const filterColors = (colorSet: Set<string>): string[] => {
        let colorList = Array.from(colorSet);
        Object.keys(filters).forEach((filter: string) => {
            if (filtersRef.current[filter].checked) {
                colorList = colorList.filter((color) =>
                    filters[filter].filter(color)
                );
            }
        });
        return colorList;
    };

    const orderColors = (colors: string[]): string[] => {
        const compare = (colorA: string, colorB: string) => {
            const redA = parseInt(colorA.slice(1, 3), 16);
            const redB = parseInt(colorB.slice(1, 3), 16);
            if (redA > redB) {
                return -1;
            }
            if (redA < redB) {
                return 1;
            }
            const greenA = parseInt(colorA.slice(3, 5), 16);
            const greenB = parseInt(colorB.slice(3, 5), 16);
            if (greenA > greenB) {
                return -1;
            }
            if (greenA < greenB) {
                return 1;
            }
            const blueA = parseInt(colorA.slice(5, 7), 16);
            const blueB = parseInt(colorB.slice(5, 7), 16);
            if (blueA > blueB) {
                return -1;
            }
            if (blueA < blueB) {
                return 1;
            }
            return 0;
        };
        colors.sort(compare);
        return colors;
    };

    const updateColors: () => void = () => {
        const storedColorList: string | null =
            localStorage.getItem('colorList');
        if (typeof storedColorList === 'string') {
            //load saved colors
            const newColorList: string[] = [
                ...defaultList,
                ...JSON.parse(storedColorList),
            ];
            const colorListSet: Set<string> = new Set(newColorList);
            const filteredColors = filterColors(colorListSet);
            orderColors(filteredColors);
            setColorList(filteredColors);
        }
    };

    useEffect(() => {
        window.addEventListener('storage', () => updateColors());
        updateColors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getColorList = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const isDefault = (color: string) => defaultList.includes(color);

    const removeColor = (colorToRemove: string) => {
        const filteredColorList: string[] = colorList.filter(
            (color) => color !== colorToRemove && !isDefault(color)
        );
        localStorage.setItem('colorList', JSON.stringify(filteredColorList));
        updateColors();
    };

    const handleSetFilters = (filters: FiltersInterface) => {
        filtersRef.current = filters;
        setFilters(filters);
        updateColors();
    };

    return (
        <Form onSubmit={getColorList}>
            <ColorList>
                {colorList.map((color) => {
                    const colorDefault = isDefault(color);
                    return (
                        <ColorItem
                            key={color}
                            color={color}
                            isDefault={colorDefault}
                            removeColor={removeColor}
                        />
                    );
                })}
            </ColorList>
            <Filters filters={filters} setFilters={handleSetFilters} />
        </Form>
    );
};

export default ColorListForm;
