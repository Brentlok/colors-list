export interface FiltersInterface {
    [key: string]: {
        checked: boolean;
        filter: (color: string) => boolean;
        label: string;
    };
}

export const red = (color: string) => parseInt(color.slice(1, 3), 16) > 127;

export const green = (color: string) => parseInt(color.slice(3, 5), 16) > 127;

export const blue = (color: string) => parseInt(color.slice(5, 7), 16) > 127;

export const saturation = (color: string) => {
    const r = parseInt(color.slice(1, 3), 16) / 255;
    const g = parseInt(color.slice(3, 5), 16) / 255;
    const b = parseInt(color.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let s = 0;
    let l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    }

    return s > 0.5;
};

export const defaultFilters: FiltersInterface = {
    red: {
        checked: false,
        filter: red,
        label: 'Red > 50%',
    },
    green: {
        checked: false,
        filter: green,
        label: 'Green > 50%',
    },
    blue: {
        checked: false,
        filter: blue,
        label: 'Blue > 50%',
    },
    saturation: {
        checked: false,
        filter: saturation,
        label: 'Saturation > 50%',
    },
};
