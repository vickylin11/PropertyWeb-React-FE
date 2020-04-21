const initialState = {
    user: null,
    errorMessage: null
};

function updateUser(state, payload) {
    return {
        ...state,
        user: payload
    };
}

function getErrorMessage(state, payload) {
    return {
        ...state,
        errorMessage: payload
    };
}

const userReducer = (state = initialState, action ) => {
    switch (action.type) {
        case 'SIGN_UP_SUCCESS':
            return updateUser(state, action.payload);
        case 'SIGN_UP_FAILURE':
            return getErrorMessage(state, action.payload);
        case 'LOGIN_SUCCESS':
            return updateUser(state, action.payload.data);
        case 'LOGIN_FAILURE':
            return getErrorMessage(state, action.payload);
        default:
            return state;
    }
};

export default userReducer;