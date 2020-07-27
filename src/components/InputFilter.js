import React, { useState, useEffect } from 'react';

export default function InputFilter({ filter, onChangeFilter, onAddingTransaction }) {
  const { filterBox, filterInput, buttonInput } = styles;
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (filter.length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [filter]);

  const handleLaunchClick = () => {
    onAddingTransaction(null);
  };

  const handleInputChange = (event) => {
    const newText = event.target.value;

    onChangeFilter(newText);
  };

  return (
    <div style={filterBox}>
      <button
        style={buttonInput}
        className="waves-effect waves-light btn dark-4"
        onClick={handleLaunchClick}
        disabled={isTyping}
      >
        + NOVO LANÇAMENTO
      </button>

      <div className="input-field" style={filterInput}>
        <input
          id="filter"
          type="text"
          className="validate"
          placeholder="Filtro"
          value={filter}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

const styles = {
  filterBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  buttonInput: {
    width: '25%',
    fontSize: '0.9em',
    zIndex: 0,
  },

  filterInput: {
    width: '75%',
    marginLeft: '5px',
  },
};
