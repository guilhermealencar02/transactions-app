import React from 'react';
import Action from './Action';
import Descriptions from './Descriptions';
import { formatNumber } from '../helpers/FunctionHelpers';

export default function TransactionList({ onDelete, transactions, onPersist }) {
  const handleActionEditClick = (id, _) => {
    onPersist(id);
  };

  const handleActionDeleteClick = (id, yearMonth) => {
    onDelete(id, yearMonth);
  };

  let isPositive = false;
  let isANewDay = false;
  let lastDay = transactions[0].day;

  const {
    totalBox,
    infoBoxNewDay,
    infoBoxSameDay,
    infoBoxPositive,
    infoBoxNegative,
    infoLeft,
    dayNumber,
    infoRight,
    valueText,
    icons,
  } = styles;

  return (
    <div style={totalBox}>
      {transactions.map(({ _id, day, category, description, value, type, yearMonth }) => {
        if (type === '+') {
          isPositive = true;
        } else {
          isPositive = false;
        }

        if (lastDay !== day) {
          isANewDay = true;
        } else {
          isANewDay = false;
        }
        lastDay = day;

        return (
          <div key={_id} style={isANewDay ? infoBoxNewDay : infoBoxSameDay}>
            <div key={_id} style={isPositive ? infoBoxPositive : infoBoxNegative}>
              <div style={infoLeft}>
                <span style={dayNumber}>
                  <b>{day}</b>
                </span>
                <Descriptions category={category} description={description} />
              </div>
              <div style={infoRight}>
                <span style={valueText}> {formatNumber(value)} </span>
                <div style={icons}>
                  <Action onActionClick={handleActionEditClick} id={_id} type="edit" period={yearMonth} />
                  <Action onActionClick={handleActionDeleteClick} id={_id} type="delete" period={yearMonth} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  totalBox: {
    marginBottom: '10px',
  },

  infoBoxNewDay: {
    marginTop: '25px',
  },

  infoBoxSameDay: {
    marginTop: '5px',
  },

  infoBoxPositive: {
    padding: '5px',
    borderRadius: '5px',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#7efff5',
  },

  infoBoxNegative: {
    padding: '5px',
    borderRadius: '5px',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#ea8685',
  },

  infoLeft: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
  },

  infoRight: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },

  dayNumber: {
    fontSize: '20px',
    fontStyle: 'normal',
    color: 'black',
    marginRight: '10px',
  },

  valueText: {
    fontSize: '20px',
    font: 'bold',
    color: 'black',
  },

  icons: {
    justifyContent: 'end',
    marginLeft: '40px',
  },
};
