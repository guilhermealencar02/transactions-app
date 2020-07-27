import React from 'react';

export default function Action({ id, type, onActionClick, period }) {
  const handleIconClick = () => {
    onActionClick(id, period);
  };

  return (
    <span>
      <i className="tiny material-icons" onClick={handleIconClick} style={styles.icons}>
        {type}
      </i>
    </span>
  );
}

const styles = {
  icons: {
    cursor: 'pointer',
    marginRight: '10px',
  },
};
