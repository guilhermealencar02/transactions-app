import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

let initialValue = 0;
let initialDescription = '';
let initialCategory = '';
let initialDate = '';
let initialRadio = '-';

export default function ModalTransaction({ onSave, onClose, selectedTransaction, transactionStatus, currentDate }) {
  const { _id, description, value, category, type, yearMonthDay } = selectedTransaction;

  // inicializando todos os campos
  if (transactionStatus === 'add') {
    initialValue = 0;
    initialDescription = '';
    initialCategory = '';
    initialDate = currentDate;
    initialRadio = '-';
  } else {
    initialValue = value;
    initialDescription = description;
    initialCategory = category;
    initialDate = yearMonthDay;
    initialRadio = type === '+' ? '+' : '-';
  }

  // declarações de States
  const [transactionValue, setTransactionValue] = useState(initialValue);
  const [descriptionValue, setDescriptionValue] = useState(initialDescription);
  const [categoryValue, setCategoryValue] = useState(initialCategory);
  const [dateTransaction, setDateTransaction] = useState(initialDate);
  const [radioOption, setRadioOption] = useState(initialRadio);

  // validar o botão esc para fechar o modal
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      _id,
      newDescription: descriptionValue,
      newCategory: categoryValue,
      newValue: transactionValue,
      newDateTransaction: dateTransaction,
      newType: radioOption,
      typeOfPersistance: transactionStatus,
    };
    onSave(formData);
  };

  const handleCategoryChange = (event) => {
    setCategoryValue(event.target.value);
  };

  const handleRadioChange = (event) => {
    setRadioOption(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescriptionValue(event.target.value);
  };

  const handleValueChange = (event) => {
    setTransactionValue(+event.target.value); // o + converte de string para numerico
  };

  const handleModalClose = () => {
    onClose(null);
  };

  const handleActionDateClick = (event) => {
    setDateTransaction(event.target.value);
  };

  const {
    modalStyle,
    topButton,
    title,
    formLine,
    textRadio,
    expenseTextRadio,
    incomeTextRadio,
    valueDate,
    inputValue,
    inputDate,
    dateBox,
  } = styles;

  return (
    <div>
      <Modal isOpen={true} className={'ReactModal__Content'} style={modalStyle}>
        <div style={topButton}>
          <span style={title}>{transactionStatus === 'add' ? 'Inclusão de lançamento' : 'Edição de lançamento'}</span>
          <button className="waves-effect waves-light btn red darken-4" onClick={handleModalClose}>
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div style={formLine}>
            <p>
              <label>
                <input
                  name="group1"
                  type="radio"
                  checked={radioOption === '-'}
                  disabled={transactionStatus === 'add' ? false : true}
                  onChange={handleRadioChange}
                  value="-"
                />
                <span style={transactionStatus === 'add' ? expenseTextRadio : textRadio}>
                  <b>Despesa</b>
                </span>
              </label>
            </p>
            <p>
              <label>
                <input
                  name="group1"
                  type="radio"
                  checked={radioOption === '+'}
                  disabled={transactionStatus === 'add' ? false : true}
                  value="+"
                  onChange={handleRadioChange}
                />
                <span style={transactionStatus === 'add' ? incomeTextRadio : textRadio}>
                  <b>Receita</b>
                </span>
              </label>
            </p>
          </div>

          <div className="input-field">
            <input id="inputDescription" type="text" value={descriptionValue} onChange={handleDescriptionChange} />
            <label className="active" htmlFor="inputDescription">
              Descrição:
            </label>
          </div>

          <div className="input-field">
            <input id="inputCategory" type="text" value={categoryValue} onChange={handleCategoryChange} />
            <label className="active" htmlFor="inputCategory">
              Categoria:
            </label>
          </div>

          <div style={valueDate}>
            <div className="input-field" style={inputValue}>
              <input
                id="inputValue"
                type="number"
                min={0}
                value={transactionValue}
                step="0.01"
                onChange={handleValueChange}
              />
              <label className="active" htmlFor="inputValue">
                Valor:
              </label>
            </div>

            <div style={inputDate}>
              <input style={dateBox} type="date" value={dateTransaction} onChange={handleActionDateClick} />
            </div>
          </div>

          <button
            className="waves-effect waves-light btn dark-4"
            disabled={categoryValue.length === 0 || descriptionValue.length === 0 || transactionValue.length === 0}
          >
            Salvar
          </button>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  modalStyle: {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
    },
    content: {
      position: 'absolute',
      top: '5%',
      left: '15%',
      right: '15%',
      bottom: '10%',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px',
    },
  },

  topButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },

  title: {
    fontSize: '25px',
    color: 'black',
    fontWeight: 'bold',
  },

  formLine: {
    display: 'flex',
    flexDirection: 'collumn',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: '30px',
  },

  textRadio: {
    // fontSize: '10px',
    // color: 'black',
    fontWeight: 'bold',
  },

  expenseTextRadio: {
    // fontSize: '10px',
    // color: 'black',
    fontWeight: 'bold',
    color: '#c0392b',
  },

  incomeTextRadio: {
    // fontStyle: 'normal',
    // fontSize: '10px',
    // color: 'black',
    fontWeight: 'bold',
    color: '#27ae60',
  },

  valueDate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'end',
    marginBottom: '50px',
  },

  inputValue: {
    width: '40%',
  },

  inputDate: {
    width: '60%',
  },

  dateBox: {
    paddingLeft: '1px',
    border: '1px solid grey',
    borderRadius: '2px',
    height: '25px',
    marginLeft: '5px',
    marginTop: '30px',
  },
};
