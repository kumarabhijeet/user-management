import React from 'react';
import UserEdit from '../UserEdit';
import { render, getNodeText, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
// for reducers
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers/index';
const store = createStore(reducers);

const userCreationFields = [
    { id: 'firstName', label: 'First Name', placeholder: 'First Name', type: 'text', value: 'abhishek' },
    { id: 'lastName', label: 'Last Name', placeholder: 'Last Name', type: 'text', value: 'kumar' },
    { id: 'empId', label: 'Emp Id', placeholder: 'Emp Id', type: 'number', value: '10670393' },
    { id: 'email', label: 'Email', placeholder: 'Email', type: 'text', value: 'abhishek.kumar@lntinfo.com' },
    { id: 'jobTitle', label: 'Job Title', placeholder: 'Job Title', type: 'text', value: 'React Developer' },
];
test('1. render the useredit page', () => {
    const match = {
        params: {
            id: 10670393
        }
    }
    const { container } = render(
        <Provider store={store}>
            <UserEdit match={match} />
        </Provider>);

    const text = getNodeText(container.querySelector('h3'));
    expect(text).toBe('Edit User');
});
test('2. input field render and update', () => {
    // checking the labels
    const match = {
        push: function () {
            return '/'
        },
        params: {
            id: 10670393
        }
    }
    const setup = () => {
        const utils = render(
            <Provider store={store}>
                <UserEdit history={match} match={match} />
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
    fireEvent.change(input1, { target: { value: 'abhishek' } })
    expect(input1.value).toBe('abhishek');
    fireEvent.change(input2, { target: { value: 'kumar' } });
    expect(input2.value).toBe('kumar');
    fireEvent.change(input3, { target: { value: '10670393' } });
    expect(input3.value).toBe('10670393');
    fireEvent.change(input4, { target: { value: 'abhishek.kumar@lntinfotech.com' } });
    expect(input4.value).toBe('abhishek.kumar@lntinfotech.com');
    fireEvent.change(input5, { target: { value: 'React Developer' } });
    expect(input5.value).toBe('React Developer');
    // when u click on Update button
    fireEvent.click(getByText('Update'));
    expect(match.push()).toBe('/');
    // when u clicked on back button
    fireEvent.click(getByText('Back'));
    expect(match.push()).toBe('/');

});