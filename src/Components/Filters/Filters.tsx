import { FiltersInterface } from '../ColorListForm/filters';
import FilterItem from '../FilterItem';
import './Filters.scss';

interface Props {
    filters: FiltersInterface;
    setFilters: (filters: FiltersInterface) => void;
}

const Filters: React.FC<Props> = ({ filters, setFilters }) => {
    const handleChange = (filterEvent: React.ChangeEvent<HTMLInputElement>) => {
        const filter = filterEvent.target.id;
        const newFilters = {
            ...filters,
            [filter]: {
                checked: filterEvent.target.checked,
                filter: filters[filter].filter,
                label: filters[filter].label,
            },
        };
        setFilters(newFilters);
    };

    return (
        <div className="filters">
            {Object.keys(filters).map((filter) => (
                <FilterItem
                    key={filter}
                    checked={filters[filter].checked}
                    filter={filter}
                    onChange={handleChange}
                    label={filters[filter].label}
                />
            ))}
        </div>
    );
};
export default Filters;
