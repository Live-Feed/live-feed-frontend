import { legacy_createStore } from 'redux';
import reducer from './reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = legacy_createStore(reducer);
const persister = 'default';

export { store, persister };
