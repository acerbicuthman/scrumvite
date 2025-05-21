import { Label } from "../../Components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Components/ui/select";

const SelectField = ({ id, label, value, onChange, options, placeholder }) => (
  <div className="flex flex-col space-y-1.5">
    <Label htmlFor={id} className="opacity-50">
      {label}
    </Label>
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder || `Select ${label}`} />
      </SelectTrigger>
      <SelectContent position="popper">
        {options.map((option, index) => (
          <SelectItem key={index} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default SelectField;
