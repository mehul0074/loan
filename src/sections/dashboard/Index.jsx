import React from 'react';
import { useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import UserList from './UserList';

// ----------------------------------------------------------------------

export default function Dashboard() {
    // Get users from Redux store
    const users = useSelector((state) => state.userTransaction.users);

    // Map users to the format expected by the Transaction component
    const userList = users.map((user) => ({
        id: user.id,
        title: user.name,
        balance: user.balance,
        image: user.image,
        updatedAt: user.updatedAt || new Date(), // This could be adjusted based on your data
    }));

    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={8}>
                    <UserList
                        title="Users"
                        list={userList}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
