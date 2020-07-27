import axios from 'axios';

const API_ALL_URL = 'http://localhost:3001/api/transaction/?period=';
const API_ONE_URL = 'http://localhost:3001/api/transaction';

async function getAllTransactions(period) {
  const res = await axios.get(`${API_ALL_URL}${period}`);

  const transactions = res.data.map((transaction) => {
    const { description } = transaction;

    return {
      ...transaction,
      descriptionLowerCase: description.toLowerCase(),
    };
  });

  return transactions;
}

async function getAllPeriods() {
  const res = await axios.get(`${API_ALL_URL}`);

  const transactions = res.data.map((transaction) => {
    const { yearMonth } = transaction;

    return {
      yearMonth,
    };
  });

  let allPeriods = new Set(); // set é uma estrutura de conjunto que não permite repetição
  transactions.forEach((transaction) => allPeriods.add(transaction.yearMonth));
  allPeriods = Array.from(allPeriods); // retornando o set para array

  return allPeriods;
}

async function getOneTransaction(id) {
  const res = await axios.get(`${API_ONE_URL}/${id}`);
  return res.data;
}

async function insertTransaction(body) {
  const response = await axios.post(`${API_ONE_URL}/`, body);
  return response.data._id;
}

async function updateTransaction(id, body) {
  const response = await axios.put(`${API_ONE_URL}/${id}`, body);
  return response.data;
}

async function deleteTransaction(id) {
  const response = await axios.delete(`${API_ONE_URL}/${id}`);
  return response.data;
}

export {
  getAllTransactions,
  getAllPeriods,
  getOneTransaction,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
};
