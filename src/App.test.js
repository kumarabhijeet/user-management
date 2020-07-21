import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history';
import App from './App';
import CreateUser from './components/UserCreation';
import reducers from './components/reducers/index';
const store = createStore(reducers);

function renderWithRouter(
    ui,
    { route = '/', history = createHistory(createMemorySource(route)) } = {}
) {
    return {
        ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
        // adding `history` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        history,
    }
}
test('1. renders learn react link', () => {
    const { getByText } = render(<Provider store={store}><App /></Provider>);
    const linkElement = getByText(/Welcome to User Mangement Project/i);
    expect(linkElement).toBeInTheDocument();
});
test('2. checking for default route', () => {
    const history = createMemoryHistory()
    const { container, getByText } = render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    )
    expect(container.innerHTML).toMatch('Welcome to User Mangement Project');
});
test('3. checking for /create-user route', () => {
    const history = createMemoryHistory()
    history.push('/create-route')
    const {container, getByRole } = render(
        <Provider store={store}>
            <Router history={history}>
                <CreateUser />
            </Router>
        </Provider>
    )
 expect(getByRole('heading')).toHaveTextContent('Create User')
})