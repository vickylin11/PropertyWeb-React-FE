import React, { Component } from 'react';
import { connect } from 'react-redux';
import './propertyDetail.css';

class PropertyDetail extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { getPropertyDetails } = this.props;
        const { id } = this.props.match.params;
        getPropertyDetails(id);
    }


    render() {
        const { propertyDetails } = this.props;
        console.log(propertyDetails !== null && propertyDetails);
        return(
            propertyDetails === null ?
                <h2>loading ... </h2> :
                <div className='item-details'>
                    <img src= {propertyDetails.image} alt="Property Image" />
                    <div>
                        <h1> {propertyDetails.name} </h1>
                        <h2> {propertyDetails.purpose} </h2>
                        <h2> House Type: {propertyDetails.type} </h2>
                        <h2> Price: $ {propertyDetails.price} </h2>
                        <h2> Address: {propertyDetails.address} </h2>
                    </div>
                </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        propertyDetails: state.property.currentProperty
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPropertyDetails: (id) => dispatch({type: 'FETCH_PROPERTY_DETAIL', payload: id})
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetail);