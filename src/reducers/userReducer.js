const initialState = {
    user: null,
    errorMessage: null,
    isLogin: false
};

function updateUser(state, payload) {
    console.log(payload);
    return {
        ...state,
        user: payload,
        isLogin: true
    };
}

function getErrorMessage(state, payload) {
    return {
        ...state,
        errorMessage: payload
    };
}

function logOut(state) {
    return {
        ...state,
        isLogin: false
    }
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
        case 'SIGN_OUT_SUCCESS':
            return logOut(state);
        default:
            return state;
    }
};

export default userReducer;