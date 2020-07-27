import React from 'react';
import { useEffect, useState } from 'react';
import * as api from './api/apiService';
import Spinner from './components/Spinner';
import InputFilter from './components/InputFilter';
import PeriodSelect from './components/PeriodSelect';
import TransactionList from './components/TransactionList';
import InformationLabel from './components/InformationLabel';
import ModalTransaction from './components/ModalTransaction';
import Footer from './components/Footer';
import Header from './components/Header';

// Declaração de vavriáveis
let isFirstRender = true;
let transactionStatus = '';

// Definição da data atual
let GLOBAL_YYYY_MM_DD = '';
let GLOBAL_DATE = new Date();
var dd = String(GLOBAL_DATE.getDate()).padStart(2, '0');
let mm = String(GLOBAL_DATE.getMonth() + 1).padStart(2, '0'); //Os meses são de 0 a 11
let yyyy = GLOBAL_DATE.getFullYear();
GLOBAL_DATE = yyyy + '-' + mm;
GLOBAL_YYYY_MM_DD = yyyy + '-' + mm + '-' + dd;

export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [transactionFilter, setTransactionFilter] = useState('');
  const [allPeriods, setAllPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(GLOBAL_DATE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpinnerOpen, setIsSpinnerOpen] = useState(true);

  useEffect(() => {
    const getAllPeriods = async () => {
      const transactions = await api.getAllPeriods();
      setAllPeriods(transactions);

      isFirstRender = false;
      setIsSpinnerOpen(false);
    };

    getAllPeriods();
  }, []);

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await api.getAllTransactions(selectedPeriod);
      setAllTransactions(transactions);
      setFilteredTransactions(transactions);

      if (isFirstRender === false) {
        setIsSpinnerOpen(false);
      }
    };

    getTransactions();
  }, [selectedPeriod, selectedTransaction]);

  const handlePersist = (period) => {
    setSelectedPeriod(period);
  };

  const handlePersistModal = async (id) => {
    const transaction = await api.getOneTransaction(id);
    setSelectedTransaction(transaction);

    transactionStatus = 'edit';
    setIsModalOpen(true);
  };

  const handleClick = (period) => {
    setSelectedPeriod(period);

    if (isFirstRender === false) {
      setIsSpinnerOpen(true);
    }
  };

  const handleDelete = async (idToDelete, period) => {
    const isDeleted = await api.deleteTransaction(idToDelete);

    if (isDeleted) {
      const transactions = await api.getAllTransactions(period);
      setAllTransactions(transactions);
      setFilteredTransactions(transactions);

      if (isFirstRender === false) {
        setIsSpinnerOpen(false);
      }
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handlePersistData = async (formData) => {
    const { _id, newDescription, newCategory, newValue, newDateTransaction, newType, typeOfPersistance } = formData;

    if (newValue > 0) {
      let newId = '';

      const newTransaction = {
        description: newDescription,
        value: newValue,
        category: newCategory,
        year: parseInt(newDateTransaction.substr(0, 4), 10),
        month: parseInt(newDateTransaction.substr(5, 2), 10),
        day: parseInt(newDateTransaction.substr(8, 2), 10),
        yearMonth: newDateTransaction.substr(0, 7),
        yearMonthDay: newDateTransaction,
        type: newType,
      };

      if (typeOfPersistance === 'add') {
        newId = await api.insertTransaction(newTransaction);
      } else {
        await api.updateTransaction(_id, newTransaction);
        newId = _id;
      }

      const actualTransaction = await api.getOneTransaction(newId);
      setSelectedTransaction(actualTransaction);
    }
    setIsModalOpen(false);
  };

  const handleChangeFilter = (newText) => {
    setTransactionFilter(newText);

    const filterLowerCase = newText.toLowerCase();

    const newFilteredTransactions = allTransactions.filter((transaction) => {
      return transaction.descriptionLowerCase.includes(filterLowerCase);
    });

    setFilteredTransactions(newFilteredTransactions);
    setIsSpinnerOpen(false);
  };

  const handleAddingTransaction = () => {
    transactionStatus = 'add';
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <Header />

      {isSpinnerOpen === true && <Spinner />}

      {isSpinnerOpen === false && (
        <PeriodSelect
          periods={allPeriods}
          optionsState={selectedPeriod.length > 0 ? selectedPeriod : GLOBAL_DATE}
          onPersist={handlePersist}
          onClickMinor={handleClick}
          onClickMajor={handleClick}
        />
      )}

      {isSpinnerOpen === false && <InformationLabel transactions={filteredTransactions} />}

      {isSpinnerOpen === false && (
        <InputFilter
          filter={transactionFilter}
          onChangeFilter={handleChangeFilter}
          onAddingTransaction={handleAddingTransaction}
        />
      )}
      {isSpinnerOpen === false && filteredTransactions.length > 0 && (
        <TransactionList onPersist={handlePersistModal} onDelete={handleDelete} transactions={filteredTransactions} />
      )}

      {isSpinnerOpen === false && <Footer />}

      {isModalOpen && (
        <ModalTransaction
          currentDate={GLOBAL_YYYY_MM_DD}
          transactionStatus={transactionStatus}
          selectedTransaction={selectedTransaction}
          onSave={handlePersistData}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
