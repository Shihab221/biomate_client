import { Select, MenuItem } from "@mui/material";

const SelectComponent = ({
  handleChange,
  selectedValue,
  array,
  disabled,
  className,
}) => {
  return (
    <Select
      fullWidth
      onChange={handleChange}
      value={selectedValue}
      disabled={disabled}
      className={className}
    >
      {array.map((item, index) => {
        return (
          <MenuItem key={index} value={item} className="flex flex-row">
            {item}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default SelectComponent;
