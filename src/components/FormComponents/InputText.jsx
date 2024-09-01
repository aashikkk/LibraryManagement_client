import { Label, TextInput } from "flowbite-react";
import React from "react";

function InputText({ value, onChange, placeholder, type, error, labelName }) {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };
    return (
        <div>
            <Label value={labelName} />
            <TextInput
                type={type}
                value={value}
                onChange={handleChange}
                required
                placeholder={placeholder}
            />
            {error && <p className="text-red-500 mt-1">{error}</p>}
        </div>
    );
}

export default InputText;
