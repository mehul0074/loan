import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import Transaction from './TransactionList';

const TransactionIndex = () => {
    const { userId } = useParams(); // Extract userId from URL params
    const users = useSelector(state => state.userTransaction.users); // Replace with your Redux state selector

    // Find the user based on userId
    const user = users.find(userTemp => userTemp.id === userId);
    console.log(user, 't-user');

    if (!user) {
        return <div>User not found</div>; // Handle case where user is not found
    }

    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={8}>
                    <Transaction
                        title={`${user.name}'s Transactions`}
                        list={user.transactions}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default TransactionIndex;
