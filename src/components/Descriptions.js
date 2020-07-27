import React from 'react';

export default function Descriptions({ category, description }) {
  return (
    <div style={styles.descText}>
      <span>
        {' '}
        <strong>
          {' '}
          <b> {category}</b>{' '}
        </strong>{' '}
      </span>
      <span>{description}</span>
    </div>
  );
}

const styles = {
  descText: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '15px',
    color: 'black',
  },
};
