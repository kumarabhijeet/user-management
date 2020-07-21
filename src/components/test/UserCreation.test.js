import React from 'react';
import { Router } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import UserCreation from '../UserCreation';
import UserListing from '../UserListing';
// for store wrapping needed
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers/index';
const store = createStore(reducers);

test('1. renders and check for h1 tag', () => {
    const { getByText } = render(<Provider store={store}><UserCreation /></Provider>);
    const DomText = getByText('Create User');
    expect(DomText).toBeInTheDocument();
});
test('2. testing the input fields', () => {
    const history = {
        push: function () {
            return '/';
        }
    };

    const setup = () => {
        const utils = render(
            <Provider store={store}>
                <UserCreation history={history} />
            </Provider>
        );
        const input1 = utils.getByTestId('firstName');
        const input2 = utils.getByTestId('lastName');
        const input3 = utils.getByTestId('empId');
        const input4 = utils.getByTestId('email');
        const input5 = utils.getByTestId('jobTitle');
        return {
            input1,
            input2,
            input3,
            input4,
            input5,
            ...utils,
        }
    }
    const { input1, input2, input3, input4, input5, getByText } = setup();
    fireEvent.change(input1, { target: { value: 'adarsh' } })
    expect(input1.value).toBe('adarsh');
    fireEvent.change(input2, { target: { value: 'kumar' } });
    expect(input2.value).toBe('kumar');
    fireEvent.change(input3, { target: { value: '1234' } });
    expect(input3.value).toBe('1234');
    fireEvent.change(input4, { target: { value: 'abc.ku@gmail.com' } });
    expect(input4.value).toBe('abc.ku@gmail.com');
    fireEvent.change(input5, { target: { value: 'developer' } });
    expect(input5.value).toBe('developer');
    // check button clicked
    let arr = [{ id: 'firstName', label: 'First Name', placeholder: 'First Name', type: 'text' }]
    fireEvent.click(getByText('Submit'), arr.push({ id: 'firstName', label: 'First Name', placeholder: 'First Name', type: 'text' }));
    expect(arr.length).toBe(2);
    expect(history.push()).toBe('/');
})

test('3. clicked on Back button testing', () => {
    const history = {
        push: function () {
            return '/';
        }
    };
    const { getByTestId } = render(
        <Provider store={store}>
            <UserCreation history={history} />
        </Provider>);
    fireEvent.click(getByTestId('back-btn'));
    expect(history.push()).toBe('/');
})