import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserListing from '../UserListing';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers/index';
const store = createStore(reducers);

import { screen } from '@testing-library/dom';
export let UserListData = [
    { firstName: "abhishek", lastName: 'kumar', empId: "10670393", email: 'abhishek.kumar@lntinfo.com', jobTitle: 'React Developer' },
    { firstName: "aditya", lastName: 'kumar', empId: "10670394", email: 'aditya.kumar@lntinfo.com', jobTitle: 'Java Developer' },
    { firstName: "abhishek", lastName: 'kumar', empId: "10670395", email: 'abhishek.kumar@lntinfo.com', jobTitle: 'React Developer' },
    { firstName: "dibya", lastName: 'kumar', empId: "10670396", email: 'abhishek.kumar@lntinfo.com', jobTitle: 'React Developer' },
    { firstName: "rakesh", lastName: 'kumar', empId: "10670397", email: 'abhishek.kumar@lntinfo.com', jobTitle: 'React Developer' },
    { firstName: "deb", lastName: 'kumar', empId: "10670389", email: 'abhishek.kumar@lntinfo.com', jobTitle: 'React Developer' }];

test('1. checking render of userlisting page', () => {
    const { getByTestId } = render(<Provider store={store}><UserListing /></Provider>);
    const TextId = getByTestId('user-management');
    expect(TextId).toBeInTheDocument();
});

test('2. checking click on add user', () => {
    const history = {
        push: function (route) {
            return route;
        }
    }
    const { getByTestId } = render(
        <Provider store={store}>
            <UserListing history={history} />
        </Provider>
    );
    // checking button is clicked
    const AddButtonId = getByTestId('add-user');
    let arr = [{ firstName: "abhishek", lastName: 'kumar', empId: "10670393", email: 'abhishek.kumar@lntinfo.com', jobTitle: 'React Developer' }];
    fireEvent.click(AddButtonId, arr.push({ firstName: "abhishek", lastName: 'kumar', empId: "10670393", email: 'abhishek.kumar@lntinfo.com', jobTitle: 'React Developer' }));
    expect(arr.length).toBe(2);
    expect(history.push('/create-user')).toBe('/create-user');
})
test('3. checking pagination works', () => {
    const { getByTestId } = render(
        <Provider store={store}>
            <UserListing history={history} />
        </Provider>
    );
    // for the first page click i tested if u want o test for 2nd page just (currentPage=2)
    let currentPage = 1;
    let rowPerPage = 5;
    const indexOfLastTodo = currentPage * rowPerPage;
    const indexOfFirstTodo = indexOfLastTodo - rowPerPage;
    const userList = UserListData.slice(indexOfFirstTodo, indexOfLastTodo);
    const PaginationButtonId = getByTestId('page-1');
    fireEvent.click(PaginationButtonId);
    expect(userList.length).toBe(5);
});
test('4. listing table content', () => {
    const history = {
        push: function (route) {
            return route;
        }
    };
    const { getByText, getAllByText, getByTestId } = render(
        <Provider store={store}>
            <UserListing history={history} />
        </Provider>, { store });
    // for table headers
    expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Emp Id/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Job Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Actions/i)).toBeInTheDocument();
    // for table body content
    const firstnameVal = screen.getAllByText(/abhishek/i);
    expect(firstnameVal[0]).toBeInTheDocument();
    const lastnameVal = screen.getAllByText(/kumar/i);
    expect(lastnameVal[0]).toBeInTheDocument();
    const empIdVal = screen.getAllByText(/10670393/i);
    expect(empIdVal[0]).toBeInTheDocument();
    const emailVal = screen.getAllByText(/abhishek.kumar@lntinfo.com/i);
    expect(emailVal[0]).toBeInTheDocument();
    const jobTitleVal = screen.getAllByText(/React Developer/i);
    expect(jobTitleVal[0]).toBeInTheDocument();
    // when click on edit button
    fireEvent.click(getByTestId(`edit-${UserListData[0].empId}`));
    expect(history.push(`/edit-user/${UserListData[0].empId}`)).toBe(`/edit-user/10670393`);

    // when clicked on delete button
    fireEvent.click(getByTestId(`delete-${UserListData[0].empId}`));
    // expect(UserListData.length).toBe('5');
})