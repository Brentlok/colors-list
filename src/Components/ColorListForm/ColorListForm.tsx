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
