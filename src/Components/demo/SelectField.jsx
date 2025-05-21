// SelectField.js
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


const SelectField = ({ id, label, value, onChange, options, placeholder }) => (
  <div className="flex flex-col space-y-1.5">
    <Label htmlFor={id} className=" opacity-50">{label}</Label>
    <Select onValueChange={(selectedValue) => onChange(selectedValue)} value={value}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper">
      {options.map((option, index) => (
  <SelectItem key={`${option}-${index}`} value={option}>
    {option}
  </SelectItem>
))}

      </SelectContent>
    </Select>
  </div>
);

export default SelectField;
