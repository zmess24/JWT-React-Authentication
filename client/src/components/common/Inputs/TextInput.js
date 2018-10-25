import React from 'react';

export default ({ handleChange, field, value, placeholder }) => { 
    return (
        <input
            type="text"
            name={field}
            placeholder={placeholder} 
            onChange={handleChange}
            value={value}
        />
    )
}