import { format } from 'date-fns'; // Import date-fns for date formatting
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import { addTransaction } from 'src/store/slice/UserTransactionSlice';
import { Card } from '@mui/material';

const TransactionForm = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.userTransaction.users); // Assuming your Redux state structure

    const [userId, setUserId] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('credit'); // Default type
    const [date, setDate] = useState(new Date()); // Default date is today

    const handleUserChange = (event) => {
        setUserId(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedDate = format(new Date(date), 'yyyy-MM-dd'); // Format date to ISO format

        dispatch(addTransaction({
            userId,
            transaction: {
                amount: parseFloat(amount),
                type,
                date: formattedDate,
                description
            }
        }));

        // Reset form fields after submission
        setUserId('');
        setAmount('');
        setDescription('');
        setType('credit');
        setDate(new Date());
    };

    return (
        <>
            <Helmet>
                <title>Add Transaction</title>
            </Helmet>
            <Card sx={{ m: 5 }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
                        <FormControl variant="outlined" margin="normal" fullWidth>
                            <InputLabel id="user-label">Select User</InputLabel>
                            <Select
                                labelId="user-label"
                                value={userId}
                                onChange={handleUserChange}
                                label="Select User"
                                required
                            >
                                {users.map(user => (
                                    <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Amount"
                            variant="outlined"
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            type="text"
                            value={description}
                            onChange={handleDescriptionChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Date"
                            variant="outlined"
                            type="date"
                            value={format(new Date(date), 'yyyy-MM-dd')} // Format date for input
                            onChange={handleDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            required
                        />
                        <FormControl component="fieldset" margin="normal">
                            <RadioGroup
                                aria-label="transaction-type"
                                name="transactionType"
                                value={type}
                                onChange={handleTypeChange}
                                row
                            >
                                <FormControlLabel value="credit" control={<Radio />} label="Credit" />
                                <FormControlLabel value="debit" control={<Radio />} label="Debit" />
                                <FormControlLabel value="null" control={<Radio />} label="None" />
                            </RadioGroup>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Add Transaction
                        </Button>
                    </Box>
                </form>
            </Card>
        </>
    );
};

export default TransactionForm;
