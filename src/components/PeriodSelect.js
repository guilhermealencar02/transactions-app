import React from 'react';

export default function PeriodSelect({ periods, optionsState, onPersist, onClickMinor, onClickMajor }) {
  const firstPeriod = periods[0];
  const lastPeriod = periods[periods.length - 1];
  const { flexRow, buttonPeriods, options } = styles;

  let pastState = null;
  let nextState = null;

  const handlePeriodChange = (event) => {
    onPersist(event.target.value);
  };

  const handleMinorIconClick = () => {
    for (let index = 0; index < periods.length; index++) {
      if (periods[index] === optionsState) {
        break;
      }
      pastState = periods[index];
    }

    onClickMinor(pastState);
  };

  const handleMajorIconClick = () => {
    for (let index = 0; index < periods.length; index++) {
      if (periods[index] === optionsState) {
        index++;
        nextState = periods[index];
        break;
      }
    }

    onClickMajor(nextState);
  };

  return (
    <div className="center" style={flexRow}>
      <button
        style={buttonPeriods}
        className="waves-effect waves-light btn dark-4"
        disabled={optionsState === firstPeriod ? true : false}
        onClick={handleMinorIconClick}
      >
        {' '}
        &lt;{' '}
      </button>

      <div style={options}>
        <select className="browser-default" onChange={handlePeriodChange} value={optionsState}>
          {periods.length > 0 &&
            periods.map((period) => {
              const formatedPeriod = period.replace(/-/g, '/');
              return (
                <option key={period} id={period} value={period}>
                  {formatedPeriod}
                </option>
              );
            })}
        </select>
      </div>

      <button
        style={buttonPeriods}
        className="waves-effect waves-light btn dark-4"
        disabled={optionsState === lastPeriod ? true : false}
        onClick={handleMajorIconClick}
      >
        {' '}
        &gt;{' '}
      </button>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '40px',
  },

  buttonPeriods: {
    marginLeft: '2px',
    marginRight: '2px',
    zIndex: 0,
  },

  options: {
    width: '100px',
  },
};
