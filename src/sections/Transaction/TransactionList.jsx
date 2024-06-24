import PropTypes from 'prop-types';
// import { Link as RouterLink } from 'react-router-dom'; // Assuming you are using React Router for navigation

import { format } from 'date-fns';

import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

// import { fToNow } from 'src/utils/format-time';

import Scrollbar from 'src/components/scrollbar';

export default function TransactionList({ title, subheader, list, ...other }) {
    const sortedList = [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />
            <Scrollbar>
                <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                    {sortedList.map((transaction) => (
                        <>
                            <TransactionItem key={transaction.id} transaction={transaction} />
                            <Divider sx={{ borderStyle: 'dashed', margin: '0 !important' }} />
                        </>
                    ))}
                </Stack>
            </Scrollbar>
        </Card>
    );
}

TransactionList.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    list: PropTypes.array.isRequired,
};

function TransactionItem({ transaction }) {
    const { id, type, date, amount, description, } = transaction;
    let amt_color = 'black';
    switch (type) {
        case 'debit': amt_color = '#d81b60'; break;
        case 'credit': amt_color = '#2196f3'; break;
        default: amt_color = 'black';
    }

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Box
                component="img"
                alt={name}
                src={user.image}
                sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
            /> */}
            <Box sx={{ minWidth: 140, flexGrow: 1 }}>
                {date && format(new Date(date), 'dd MMM yyyy')}
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                    {description}
                </Typography>
            </Box>
            <Typography variant="h4" align="center" sx={{ pr: 3, flexShrink: 0, color: amt_color }}>
                {amount}
            </Typography>
            {/* <Typography variant="caption" align="center" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                Balance
            </Typography> */}
        </Stack>
    );
}

TransactionItem.propTypes = {
    transaction: PropTypes.shape({
        id: PropTypes.string,
        type: PropTypes.string,
        date: PropTypes.string,
        description: PropTypes.string,
        amount: PropTypes.string,
        createdAt: PropTypes.instanceOf(Date),
    }),
};
