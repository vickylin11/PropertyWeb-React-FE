const initialState = {
    allRequestList: [],
    currentRequest: null,
    clientRequestList: [],
    currentPage: 1,
    totalPage: null
};

function updateRequestList(state, payload) {
    return {
        ...state,
        allRequestList: payload.data.content,
        currentPage: payload.data.pageable.pageNumber +1,
        totalPage: payload.data.totalPages
    };
}

function updateMyRequestList(state, payload) {
    return {
        ...state,
        clientRequestList: payload.data.content,
        currentPage: payload.data.pageable.pageNumber +1,
        totalPage: payload.data.totalPages
    };
}

function updateRequestDetails(state, payload) {
    return {
        ...state,
        currentRequest: payload.data
    };
}

const requestReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_REQUESTS_SUCCESS':
            return updateRequestList(state, action.payload);
        case 'GET_CLIENT_REQUESTS_SUCCESS':
            return updateMyRequestList(state, action.payload);
        case 'FETCH_REQUEST_DETAIL_SUCCESS':
            return updateRequestDetails(state, action.payload);
        case 'RESOLVE_REQUEST_SUCCESS':
            return updateRequestDetails(state, action.payload);
        default:
            return state;
    }
};

export default requestReducer;