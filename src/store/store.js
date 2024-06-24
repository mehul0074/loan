import { configureStore } from "@reduxjs/toolkit";
// const reduxLogger = require("redux-logger");

import userTransactionSlice from "./slice/UserTransactionSlice";


// const logger = reduxLogger.createLogger();

const store = configureStore({
    reducer: {
        userTransaction: userTransactionSlice,

    },
    //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;