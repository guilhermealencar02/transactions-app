const formatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

function formatNumber(value) {
  return formatter.format(value);
}

function getAccumulatedValues(transactions) {
  const values = {
    income: 0,
    expense: 0,
    balance: 0,
  };

  transactions.map((transaction) => {
    if (transaction.type === '+') {
      values.income = values.income + transaction.value;
    } else {
      values.expense = values.expense + transaction.value;
    }
    return true;
  });

  values.balance = values.income - values.expense;

  return values;
}

export { formatNumber, getAccumulatedValues };
