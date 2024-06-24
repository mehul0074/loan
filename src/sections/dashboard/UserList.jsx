import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link'; // Material-UI Link
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
// import CardHeader from '@mui/material/CardHeader';

import { fToNow } from 'src/utils/format-time';

// import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { Button } from '@mui/material';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserList({ title, subheader, list, ...other }) {
    const navigator = useNavigate();
    const sortedList = [...list].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    return (
        <Card {...other}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" >
                <Box>
                    <h4 style={{ marginLeft: '5px' }}>{title}</h4>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Iconify icon="eva:person-add-fill" />}
                        component={Link}
                        onClick={() => navigator('/add-user')}
                        sx={{ mx: 2 }}
                    />


                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        component={Link}
                        sx={{ mx: 2 }}
                        onClick={() => navigator('/add-transaction')}
                    />

                </Box>
            </Stack>
            <Scrollbar>
                <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                    {sortedList.map((users) => (
                        <>
                            <UserItem key={users.id} users={users} />
                            <Divider sx={{ borderStyle: 'dashed', margin: '0 !important' }} />
                            {/* <hr style={{ border: '1px dashed grey' }} /> */}

                        </>
                    ))}
                </Stack>
            </Scrollbar>
            {/* <Divider sx={{ borderStyle: 'dashed' }} />
            <Box sx={{ p: 2, textAlign: 'right' }}>
                <Button
                    size="small"
                    color="inherit"
                    endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                >
                    View all
                </Button>
            </Box> */}
        </Card>
    );
}

UserList.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    list: PropTypes.array.isRequired,
};

// ----------------------------------------------------------------------

function UserItem({ users }) {
    const { image, title, balance, updatedAt, id } = users;
    let balance_color = 'black';
    if (balance > 0) {
        balance_color = '#2e7031';
    } else if (balance < 0) {
        balance_color = '#d81b60';
    }

    return (
        <Link
            component={RouterLink}
            to={`/transaction-list/${id}`}
            sx={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                '&:hover': {
                    textDecoration: 'none',
                }
            }}
        >            <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                    component="img"
                    alt={title}
                    src={image}
                    sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
                />
                <Box sx={{ minWidth: 140, flexGrow: 1 }}>
                    {/* <Link color="inherit" variant="subtitle2" underline="hover" noWrap> */}
                    {title}
                    {/* </Link> */}
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {fToNow(updatedAt)}
                    </Typography>
                </Box>
                <Typography align='center' >
                    <Typography variant="h4" align='center' sx={{ pr: 3, flexShrink: 0, color: balance_color }}>
                        {balance}
                    </Typography>
                    <Typography variant="caption" align='center' sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                        Balance
                    </Typography>
                </Typography>
            </Stack>
        </Link>
    );
}

UserItem.propTypes = {
    users: PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string,
        balance: PropTypes.string,
        id: PropTypes.string,
        updatedAt: PropTypes.instanceOf(Date),
    }),
};
