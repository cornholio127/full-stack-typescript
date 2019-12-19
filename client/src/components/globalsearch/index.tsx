import React, { useState } from 'react';
import { TextInput } from '../input';

const GlobalSearch: React.FC = () => {
  const [value, setValue] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <TextInput
      name="search"
      value={value}
      onChange={onChange}
      placeholder="Search products"
    />
  );
};

export default GlobalSearch;
