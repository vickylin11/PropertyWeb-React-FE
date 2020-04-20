const initialState = {
    propertyList: [],
    currentProperty: null,
    currentPage: 1,
    totalPage: null,
    pageSize: 12
};

function updatePropertyList(state, payload)  {
    return {
        ...state,
        propertyList: payload.content,
        currentPage: payload.pageable.pageNumber +1,
        totalPage: payload.totalPages,
        pageSize: payload.pageable.pageSize
    };
}

function updatePropertyListByType(state, payload)  {
    return {
        ...state,
        propertyList: payload.data.content,
        currentPage: payload.data.pageable.pageNumber +1,
        totalPage: payload.data.totalPages,
        pageSize: payload.data.pageable.pageSize
    };
}

function updatePropertyDetails(state, payload) {
    return {
        ...state,
        currentProperty: payload.data
    }
}

const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PROPERTIES_SUCCESS':
            return updatePropertyList(state, action.payload);
        case 'FETCH_PROPERTY_DETAIL_SUCCESS':
            return updatePropertyDetails(state, action.payload);
        case 'FETCH_PROPERTIES_BY_TYPE_SUCCESS':
            return updatePropertyListByType(state, action.payload);
        default:
            return state;
    }
};

export default propertyReducer;