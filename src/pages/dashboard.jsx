import { Helmet } from 'react-helmet-async';

import Dashboard from 'src/sections/dashboard/Index'
// ----------------------------------------------------------------------

export default function AppPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard</title>
            </Helmet>

            <Dashboard />
        </>
    );
}
