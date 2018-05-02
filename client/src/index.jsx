import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';
import { Workspace } from './Workspace';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);