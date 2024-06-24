import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import { addUser } from 'src/store/slice/UserTransactionSlice'; // Import your addUser action
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Avatar, Card, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const UserForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser({ name, image }));
        setName('');
        setImage('');
    };

    return (
        <>
            <Helmet>
                <title>add User </title>
            </Helmet>
            <Card sx={{ m: 5 }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            margin="normal"
                            required
                        />
                        <FormControl variant="outlined" margin="normal" fullWidth>
                            <InputLabel id="image-label">Select Image</InputLabel>
                            <Select
                                labelId="image-label"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                label="Select Image"
                                required
                            >
                                {Array.from({ length: 25 }, (_, index) => (
                                    <MenuItem key={index + 1} value={`/assets/images/avatars/avatar_${index + 1}.jpg`}>
                                        <Avatar alt='Avatar' src={`/assets/images/avatars/avatar_${index + 1}.jpg`} /> Avatar {index + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* <TextField
                        label="Image URL"
                        variant="outlined"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        margin="normal"
                        required
                    /> */}
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Add User
                        </Button>
                    </Box>
                </form>
            </Card>
        </>
    );
};

export default UserForm;
