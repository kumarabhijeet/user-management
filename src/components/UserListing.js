import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
function UserListing(props) {
    const dispatch = useDispatch();
    // reducer state date store in this constant variable
    const UserListData = useSelector((state) => {
        return state.UserListReducer.userListData
    });
    // act as did mount called only once
    useEffect(() => {
        if (UserListData.length === 0 || UserListData.length === 4) {
            dispatch({ type: 'GET_USER_DETAILS' })
        }
    }, [])
    // when click on add user button route to create-user-page
    const addUserClicked = () => {
        props.history.push('/create-user');
    }
    // when clicked on delete button
    const deleteUser = (item) => {
        dispatch({ type: 'DELETE_USER', payload: item })
    }
    // when click on edit user
    const editUser = (item) => {
        props.history.push(`/edit-user/${item.empId}`)
    }
    // for pagination do this with your store state data
    const [currentPage, setCurrentPage] = useState(1);
    const [rowPerPage, setRowPerPage] = useState(5);
    const renderPagination = (UserListData) => {
        const handleClick = (event) => {
            setCurrentPage(Number(event.target.id))
        }
        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * rowPerPage;
        const indexOfFirstTodo = indexOfLastTodo - rowPerPage;
        const userList = UserListData.slice(indexOfFirstTodo, indexOfLastTodo);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(UserListData.length / rowPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    data-testid={`page-${number}`}
                    key={number}
                    id={number}
                    onClick={handleClick}
                >
                    {number}
                </li>
            );
        });
        return (
            <React.Fragment>
                <table style={{ width: '90%', margin: 'auto' }}>
                    <thead>
                        <tr>
                            <th data-testid="firstname">First Name</th>
                            <th data-testid="lastname">Last Name</th>
                            <th data-testid="empid">Emp Id</th>
                            <th data-testid="email">Email</th>
                            <th data-testid="job">Job Title</th>
                            <th data-testid="actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.empId}</td>
                                    <td>{item.email}</td>
                                    <td>{item.jobTitle}</td>
                                    <td>
                                        <span style={{ marginRight: '4px' }}>
                                            <button data-testid={`edit-${item.empId}`} onClick={() => editUser(item)}>Edit</button>
                                        </span>
                                        <button data-testid={`delete-${item.empId}`} onClick={() => deleteUser(item)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
            </React.Fragment>
        );
    }
    // return from functional component
    return (
        <React.Fragment>
            <div style={{ paddingBottom: '10px' }}>
                <h2 data-testid="user-management">Welcome to User Mangement Project</h2>
                <button data-testid="add-user" type="button" onClick={addUserClicked}>Add User</button>
            </div>
            {renderPagination(UserListData)}
        </React.Fragment>
    );
}

export default UserListing;



