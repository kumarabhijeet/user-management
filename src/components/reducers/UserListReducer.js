import { userCreationFields } from '../UserCreation';
// initial data for the reducer to display list of users 
export const userDetails = [
    { firstName: "abhishek", lastName: 'kumar', empId: "10670393", email: 'abhishek.kumar@lntinfo.com', jobTitle: 'React Developer' },
    { firstName: "aditya", lastName: 'kumar', empId: "10670394", email: 'aditya.kumar@lntinfo.com', jobTitle: 'Java Developer' },
    { firstName: "abhishek", lastName: 'kumar', empId: "10670395", email: 'abhishek.kumar@lntinfo.com', jobTitle: 'React Developer' },
    { firstName: "dibya", lastName: 'kumar', empId: "10670396", email: 'abhishek.kumar@lntinfo.com', jobTitle: 'React Developer' },
    { firstName: "rakesh", lastName: 'kumar', empId: "10670396", email: 'abhishek.kumar@lntinfo.com', jobTitle: 'React Developer' },
    { firstName: "deb", lastName: 'kumar', empId: "10670389", email: 'abhishek.kumar@lntinfo.com', jobTitle: 'React Developer' },
    { firstName: "dheeraj", lastName: 'kumar', empId: "10670385", email: 'abhishek.kumar@lntinfo.com', jobTitle: 'React Developer' },
    { firstName: "alok", lastName: 'kumar', empId: "10670387", email: 'abhishek.kumar@lntinfo.com', jobTitle: 'React Developer' },
    { firstName: "samir", lastName: 'kumar', empId: "10670390", email: 'abhishek.kumar@lntinfo.com', jobTitle: 'React Developer' }
];
export const INTIAL_STATE = {
    userListData: userDetails
}
const UserListReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        // for listing the users
        case 'GET_USER_DETAILS': return {
            ...state,
            userListData: state.userListData
        }
        // when u create a user
        case 'USER_CREATION_DATA':
            return {
                ...state,
                userListData: [...state.userListData, action.payload]
            }
        // when u delete a user
        case 'DELETE_USER':
            const filterUserListData = state.userListData.filter((data) => data.empId !== action.payload.empId)
            return {
                ...state,
                userListData: filterUserListData
            }
        // when u click on edit button in user list so for the user edit page prepoulated data
        case 'EDIT_USER':
            const editUserFieldData = state.userListData.find((data) => data.empId == action.payload);
            const finalEditData = userCreationFields.map((data) => {
                return { ...data, value: editUserFieldData[`${data.id}`] }
            })
            return {
                ...state,
                editUserData: finalEditData
            }
        // when u changing the value in user edit page
        case 'USER_EDIT_VALUE':
            const { index, data, value } = action.payload;
            const finalEditFieldValue = [...state.editUserData.slice(0, index),
            {
                ...state.editUserData[index], value: value,
            },
            ...state.editUserData.slice(index + 1)
            ];
            return {
                ...state,
                editUserData: finalEditFieldValue
            }
        // final update user data successful
        case 'UPDATE_USER_SUCCESSFULLY':
            const { finalUserUpdationFieldData, empId } = action.payload;
            const finalUpdateUserData = state.userListData.map((data) => {
                if (data.empId === empId) {
                    return { ...data, ...finalUserUpdationFieldData }
                }
                else {
                    return data;
                }
            })
            return {
                ...state,
                userListData: finalUpdateUserData
            }
        default: return state;
    }
}
export default UserListReducer;