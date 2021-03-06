import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Pagination, Menu, Dropdown, Input, Radio, Select, Button} from 'antd/lib/index';
import { PlusOutlined } from '@ant-design/icons';
import './property.css';

class Property extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radioValue: "all",
            dropdownValue: "House Type",
            searchText: null,
            sorting: null
        };
    }

    componentDidMount() {
        const { getPropertyList } = this.props;
        getPropertyList();
    }

    changePage = value => {
        const { getPropertyList } = this.props;
        const { searchText, sorting } = this.state;
        if (searchText || sorting) {
            getPropertyList({page: value-1, key: searchText, sort: sorting});
        } else {
            getPropertyList({page: value-1});
        }
    };

    handleMenuClick = e => {
        const { getPropertyListByType, getPropertyList } = this.props;
        e.key === "All" ? getPropertyList() : getPropertyListByType(e.key);
        this.setState({dropdownValue: e.key })
    };

    handleSearch = value => {
        const { getPropertyList } = this.props;
        this.setState({searchText: value});
        getPropertyList({key: value});
    };

    handleRadioChange = e => {
        const { getPropertyList } = this.props;
        const { sorting } = this.state;
        const value = e.target.value;
        this.setState({searchText: null});
        if(sorting) {
            value === "all" ? getPropertyList({sort: sorting}) : getPropertyList({key: value, sort: sorting});
        } else {
            value === "all" ? getPropertyList() : getPropertyList({key: value});
        }
        this.setState( {
            radioValue: value,
            searchText: value
        });
    };

    handlePriceChange = value => {
        const { getPropertyList } = this.props;
        const { searchText } = this.state;
        searchText ? getPropertyList({sort: value, key: searchText})
            : getPropertyList({sort: value});
        this.setState({sorting: value});
    };

    handleAddButton = () => {
        this.props.history.push('/add-property');
    };

    render() {
        const { Meta } = Card;
        const { Search } = Input;
        const { Option } = Select;
        const menu = (
            <Menu onClick={(e) => this.handleMenuClick(e)}>
                <Menu.Item key="All">
                    All
                </Menu.Item>
                <Menu.Item key="Apartment">
                    Apartment
                </Menu.Item>
                <Menu.Item key="House">
                    House
                </Menu.Item>
                <Menu.Item key="Unit">
                    Unit
                </Menu.Item>
                <Menu.Item key="Other">
                    Other
                </Menu.Item>
            </Menu>
        );

        return(
            <div>
                <div className="page-head">
                    <Dropdown.Button className="filter-dropdown" overlay={menu}>
                        {this.state.dropdownValue}
                    </Dropdown.Button>
                    <Select defaultValue="Price" style={{ width: 120 }} onChange={this.handlePriceChange}>
                        <Option value="price,desc">High to low</Option>
                        <Option value="price,asc">Low to high</Option>
                    </Select>
                    <Search
                        className="search-bar"
                        placeholder="Input search text"
                        enterButton="Search"
                        size="large"
                        allowClear={true}
                        onSearch={value => this.handleSearch(value)}
                    />
                    <Radio.Group onChange={this.handleRadioChange} value={this.state.radioValue}>
                        <Radio value="all">All</Radio>
                        <Radio value="rent">For Rent</Radio>
                        <Radio value="sale">For Sale</Radio>
                    </Radio.Group>
                    <Button type="primary" icon={<PlusOutlined />} onClick={this.handleAddButton} >
                        Add Property
                    </Button>
                </div>
                <div className="items-tab">
                    {this.props.propertyList.map(property => (
                        <div key={property.id} className="item-display">
                            <Link to={`/property/${property.id}`}>
                                <Card
                                    hoverable
                                    style={{ width: 250 }}
                                    cover={<img alt="example" src={property.image} />}
                                >
                                    <Meta title={property.name} description={"$" + property.price} />
                                </Card>
                            </Link>
                        </div>
                    ))}
                    <Pagination className="pagination" current={this.props.currentPage} total={this.props.totalPage * 10} onChange={value => this.changePage(value)}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        propertyList: state.property.propertyList,
        currentPage: state.property.currentPage,
        totalPage: state.property.totalPage,
        pageSize: state.property.pageSize
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPropertyList: (params) => dispatch({ type: 'FETCH_PROPERTIES', payload: params }),
        getPropertyListByType: (type) => dispatch ({ type: 'FETCH_PROPERTIES_BY_TYPE', payload: type })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Property);