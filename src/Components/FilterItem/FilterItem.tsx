interface Props {
    filter: string;
    checked: boolean;
    onChange: (filter: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
}

const FilterItem: React.FC<Props> = ({ filter, checked, onChange, label }) => {
    return (
        <div>
            <input
                type="checkbox"
                id={filter}
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={filter}>{label}</label>
        </div>
    );
};

export default FilterItem;
