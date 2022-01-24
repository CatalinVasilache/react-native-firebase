// Imports: Dependencies
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

// Imports: Reducers Root Reducer
import {rootReducer} from '../Reducers/index';

// Imports: Reducers Root Saga
import rootSaga from '../Sagas/index';

// Middleware: Reducers Saga
const sagaMiddleware = createSagaMiddleware();

// Reducers: Store
const store = createStore(
    rootReducer,
    applyMiddleware(
        sagaMiddleware,
        createLogger(),
    ),
);

// Middleware: Reducers Saga
sagaMiddleware.run(rootSaga);

// Exports
export {
    store,
}