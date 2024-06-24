import { Helmet } from 'react-helmet-async';

import Transactions from 'src/sections/Transaction/Index';

export default function UserTransactionPage() {

    return (
        <>
            <Helmet>
                <title> Transaction </title>
            </Helmet>

            <Transactions />
        </>
    );
}
