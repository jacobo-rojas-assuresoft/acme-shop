import { useEffect, useState } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue);
    }, 600);

    return () => clearTimeout(timer);
  }, [inputValue, onSearch]);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
}
