function addExpense(event) {
    event.preventDefault();
    const title = document.getElementById('expense-title').value;
    const amount = document.getElementById('expense-amount').value;
    const category = document.getElementById('expense-category').value;

    const expense = { title, amount, category, date: new Date().toLocaleString() };
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    loadExpenses();
    document.getElementById('expense-form').reset();
}

function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `${expense.title} - ${expense.amount} - ${expense.category} - ${expense.date} <button onclick="deleteExpense('${expense.date}')">Delete</button>`;
        expenseList.appendChild(li);
    });
}

function deleteExpense(date) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => expense.date !== date);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    loadExpenses();
}