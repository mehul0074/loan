import { v4 as uuidv4 } from 'uuid';
import { createSlice } from "@reduxjs/toolkit";

// Helper function to load data from localStorage
const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

// Initial state with users loaded from localStorage
const initialState = {
    users: loadFromLocalStorage('userList')
};

const userTransactionSlice = createSlice({
    name: "userTransaction",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { name, image } = action.payload;
            const newUser = {
                id: uuidv4(),
                name: name || 'New User', // Default name if not provided
                image: image || 'default.jpg', // Default image if not provided
                balance: 0,
                transactions: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            state.users.push(newUser);
            localStorage.setItem('userList', JSON.stringify(state.users));
        },
        addTransaction: (state, action) => {
            const { userId, transaction } = action.payload;
            const user = state.users.find(userTemp => userTemp.id === userId);
            if (user) {
                user.transactions.push({
                    id: uuidv4(),
                    createdAt: new Date().toISOString(),
                    ...transaction
                });
                if (transaction.type === 'credit') {
                    user.balance += transaction.amount;
                } else if (transaction.type === 'debit') {
                    user.balance -= transaction.amount;
                }
                user.updatedAt = new Date().toISOString(); // Update updatedAt on transaction change
                localStorage.setItem('userList', JSON.stringify(state.users));
            }
        },
        removeTransaction: (state, action) => {
            const { userId, transactionId } = action.payload;
            const user = state.users.find(userTemp => userTemp.id === userId);
            if (user) {
                const transaction = user.transactions.find(tx => tx.id === transactionId);
                if (transaction) {
                    if (transaction.type === 'credit') {
                        user.balance -= transaction.amount;
                    } else if (transaction.type === 'debit') {
                        user.balance += transaction.amount;
                    }
                    user.transactions = user.transactions.filter(tx => tx.id !== transactionId);
                    user.updatedAt = new Date().toISOString(); // Update updatedAt on transaction change
                    localStorage.setItem('userList', JSON.stringify(state.users));
                }
            }
        },
        removeUser: (state, action) => {
            const userId = action.payload;
            state.users = state.users.filter(user => user.id !== userId);
            localStorage.setItem('userList', JSON.stringify(state.users));
        },
        setTransactionType: (state, action) => {
            const { userId, transactionId, type } = action.payload;
            const user = state.users.find(userTemp => userTemp.id === userId);
            if (user) {
                const transaction = user.transactions.find(tx => tx.id === transactionId);
                if (transaction) {
                    if (transaction.type === 'credit') {
                        user.balance -= transaction.amount;
                    } else if (transaction.type === 'debit') {
                        user.balance += transaction.amount;
                    }
                    transaction.type = type;
                    if (transaction.type === 'credit') {
                        user.balance += transaction.amount;
                    } else if (transaction.type === 'debit') {
                        user.balance -= transaction.amount;
                    }
                    user.updatedAt = new Date().toISOString(); // Update updatedAt on transaction type change
                    localStorage.setItem('userList', JSON.stringify(state.users));
                }
            }
        },
    },
});

// userList function to map users into required attributes
export const userList = (state) => {
    const usersList = state.userTransaction.users.map(user => ({
        id: user.id,
        title: user.name,
        balance: `Balance: ${user.balance}`,
        image: user.image,
        updatedAt: user.updatedAt ? new Date(user.updatedAt) : null // Convert updatedAt to Date object if present
    }));
    return usersList;
};

// userTransactionList function to get transactions of a specific user
export const userTransactionList = (state, userId) => {
    const user = state.userTransaction.users.find(userTemp => userTemp.id === userId);
    return user ? user.transactions : [];
};
export default userTransactionSlice.reducer;
export const { addUser, addTransaction, removeTransaction, removeUser, setTransactionType } = userTransactionSlice.actions;

