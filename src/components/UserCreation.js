import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
export const userCreationFields = [
    { id: 'firstName', label: 'First Name', placeholder: 'First Name', type: 'text', },
    { id: 'lastName', label: 'Last Name', placeholder: 'Last Name', type: 'text' },
    { id: 'empId', label: 'Emp Id', placeholder: 'Emp Id', type: 'number' },
    { id: 'email', label: 'Email', placeholder: 'Email', type: 'text' },
    { id: 'jobTitle', label: 'Job Title', placeholder: 'Job Title', type: 'text' },
]

function UserCreation(props) {
    const [userFields, setUserFields] = useState(userCreationFields);
    const [submitErrMsg, setSubmitErrMsg] = useState("");
    const dispatch = useDispatch();
    const submitUser = () => {
        const finalUserCreationFieldData = userFields.reduce((data, obj) => {
            return data = { ...data, [obj.id]: obj.value }
        }, {});

        const objectValuesInArray = Object.values(finalUserCreationFieldData);
        const isEmpty = objectValuesInArray.every((data) => data !== undefined);
        if (isEmpty) {
            dispatch({ type: 'USER_CREATION_DATA', payload: finalUserCreationFieldData });
            props.history.push('/');
        }
        else {
            setSubmitErrMsg("Please fill all the fields");
        }

    }
    const handleChange = (index, data, event) => {
        setUserFields([...userFields.slice(0, index),
        {
            ...userFields[index], value: event.target.value,
        },
        ...userFields.slice(index + 1)
        ]);
        setSubmitErrMsg("");
    }
    return (
        <div>
            <h3>Create User</h3>
            <div className="card" style={{ margin: 'auto', width: '40%', height: '50%', height: '320px' }}>
                <div className="container">
                    {
                        userFields.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <label>{item.label}</label>&nbsp; : &nbsp;
                                    <input data-testid={item.id} id={item.id} type={item.type} placeholder={item.placeholder} onChange={(event) => handleChange(index, item, event)} /><br /><br />
                                </React.Fragment>
                            )
                        })
                    }
                    <span style={{ color: 'red', fontSize: '12px' }}>{submitErrMsg}</span>
                    <div style={{ padding: '5px' }}>
                        <span style={{ marginRight: '5px' }}>
                            <button type="button" onClick={submitUser} >Submit</button>
                        </span>
                        <button data-testid="back-btn" type="button" onClick={() => props.history.push('/')} >Back</button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default UserCreation;