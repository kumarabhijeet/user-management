import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
function UserEdit(props) {
    const EditUserData = useSelector((state) => {
        return state.UserListReducer.editUserData
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'EDIT_USER', payload: props.match.params.id })
    }, [])

    const handleChange = (index, data, event) => {
        dispatch({ type: 'USER_EDIT_VALUE', payload: { index, data, value: event.target.value } });
    }
    // when you click on update in edit user page
    const updateUser = () => {
        const finalUserUpdationFieldData = EditUserData.reduce((data, obj) => {
            return data = { ...data, [obj.id]: obj.value }
        }, {});
        dispatch({ type: 'UPDATE_USER_SUCCESSFULLY', payload: { finalUserUpdationFieldData, empId: props.match.params.id } });
        props.history.push('/')
    }
    return (
        < div >
            <h3 data-testid="edit-user">Edit User</h3>
            <div className="card" style={{ margin: 'auto', width: '40%', height: '50%', height: '320px' }}>
                <div className="container">
                    {
                        EditUserData && EditUserData.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <span data-testid={`field-label`}>{item.label}</span> :
                                <input
                                        data-testid={item.id}
                                        id={item.id}
                                        type={item.type}
                                        value={item.value}
                                        placeholder={item.placeholder}
                                        onChange={(event) => handleChange(index, item, event)} /><br /><br />
                                </React.Fragment>
                            )
                        })
                    }
                    <div style={{ padding: '5px' }}>
                        <span style={{ marginRight: '5px' }}
                        ><button data-testid="update" type="button" onClick={updateUser} >Update</button></span>
                        <button data-testid="back" type="button" onClick={() => props.history.push('/')} >Back</button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default UserEdit;