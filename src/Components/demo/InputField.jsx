// InputField.js
import { Label } from "../ui/label"; 
import { Input } from "../ui/input";

const InputField = ({ id, label, value, onChange, placeholder, type = "text" }) => (
  <div className="flex flex-col space-y-1.5">
    <Label htmlFor={id} className=" opacity-50">{label}</Label>
    <Input 
      id={id} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
      type={type} 
    />
  </div>
);

export default InputField;
