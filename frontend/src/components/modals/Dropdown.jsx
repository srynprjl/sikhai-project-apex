import { useState, useRef, useEffect, cloneElement } from 'react';

export default function DropdownMenu({ trigger, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); 

  return (
    <div className="relative" ref={dropdownRef}>
      {cloneElement(trigger, { onClick: toggleDropdown })}
      {isOpen && (
        <div className="absolute right-0 mt-4 bg-dark-secondary text-white p-4 flex flex-col z-50 w-48 min-w-[12rem]">
          <div className="text-md">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
