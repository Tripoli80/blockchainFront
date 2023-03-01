import React, { useEffect, useState } from 'react';

export default function Select({ filterData }) {
  const { selectedItem, setSelectedItem } = filterData;

  const itemsList = [
    { value: 'recipient', label: 'Recipient' },
    { value: 'sender', label: 'Sender' },
    { value: 'transaction_id', label: 'Transaction ID' },
    { value: 'blocknumber', label: 'Block Number' },
  ];
  const [activeFilterDropdown, setActiveFilterDropdown] = useState("item-dd'");

  useEffect(() => {
    const handleClick = e => {
      const { issel, id, norerender } = e.target.dataset;
      if (issel) {
        if (!norerender) selectDDValue(id);
        return;
      }
      handleClickOutside();
    };
    document.addEventListener('mousedown', handleClick, false);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
    // eslint-disable-next-line
  }, []);

  const filterDropdownClick = () => {
    if (activeFilterDropdown !== 'item-dd') setActiveFilterDropdown('item-dd');
  };
  const selectDDValue = name => {
    if (name !== selectedItem) {
      setSelectedItem(name);
      setActiveFilterDropdown(null);
    }
  };

  const handleClickOutside = e => {
    setActiveFilterDropdown(null);
  };

  return (
    <>
      <div
        data-norerender={1}
        className={
          'custom-dropdown ' +
          (activeFilterDropdown === 'item-dd' ? 'show' : '')
        }
      >
        <p onClick={filterDropdownClick} data-issel={1} data-norerender={1}>
          {selectedItem ? selectedItem : 'Search...'}
          <i className="icon-chev-down"></i>
        </p>
        <div className="dropdown-content">
          {itemsList.map(obj => {
            return (
              <a
                href="/"
                key={obj.value}
                id={obj.value}
                data-issel={1}
                data-id={obj.label}
                onClick={() => selectDDValue(obj)}
              >
                {obj.label}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
