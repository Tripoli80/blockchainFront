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
  //   let itemDD;
  //   let categoryDD;
  useEffect(() => {
    const handleClick = e => {
      const { issel, id } = e.target.dataset;
      if (issel) {
        selectDDValue(id);
        return;
      }
      handleClickOutside();
    };
    document.addEventListener('mousedown', handleClick, false);
    // eslint-disable-next-line
  }, []);

  const filterDropdownClick = () => {
    setActiveFilterDropdown('item-dd');
  };
  // --------------------------------------------------------------------------------
  const selectDDValue = name => {
    setSelectedItem(name);
    setActiveFilterDropdown(null);
  };

  // --------------------------------------------------------------------------------

  const handleClickOutside = () => {
    //   this.setState({ activeFilterDropdown: null });
    setActiveFilterDropdown(null);
  };

  return (
    <>
      <div
        // ref={node => setItemDD(node)}
        className={
          'custom-dropdown ' +
          (activeFilterDropdown === 'item-dd' ? 'show' : '')
        }
      >
        <p onClick={() => filterDropdownClick()}>
          {selectedItem ? selectedItem : 'Item'}
          <i className="icon-chev-down"></i>
        </p>
        <div className="dropdown-content">
          {itemsList.map((obj, index) => {
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
