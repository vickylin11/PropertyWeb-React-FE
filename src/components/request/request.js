import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination, Table } from "antd";
import '../app/app.css';
import './request.css';

class Request extends Component {

    componentDidMount() {
        const { user, getAllRequests, getMyRequests } = this.props;
        if(user && user.type === "admin") {
            getAllRequests();
        } else {
            getMyRequests({userId: user.id});
        }
    }

    changePage = value => {
        const { getAllRequests, getMyRequests, user } = this.props;
        if(user && user.type === "admin") {
            getAllRequests({page: value-1});
        } else {
            getMyRequests({page: value-1, userId: user.id});
        }
    };

    handleRowClick = record => {
        this.props.history.push(`/request/${record.id}`);
    };

    render() {
        const { allRequestList, currentPage, totalPage, user, clientRequestList } = this.props;

        const columns = [
            {
                title: 'Request Title',
                dataIndex: 'title',
                key: 'title',
                width: 100,
                ellipsis: true,
                render: text => <a>{text}</a>,
            },
            {
                title: 'Request Contents',
                dataIndex: 'content',
                key: 'content',
                width: 200,
                ellipsis: true
            }
        ];

            return(
                <div>
                    <h1 className="page-head">Request List</h1>
                    {user && user.type === "admin" ?
                        <Table
                            dataSource={allRequestList}
                            columns={columns}
                            pagination={false}
                            onRow={(record) => ({
                                onClick: () => {this.handleRowClick(record)}
                            })}
                        />
                        :
                        <Table
                            dataSource={clientRequestList}
                            columns={columns}
                            pagination={false}
                            onRow={(record) => ({
                                onClick: () => {this.handleRowClick(record)}
                            })}
                        />
                    }
                    <Pagination className="pagination" current={currentPage} total={totalPage * 10} onChange={value => this.changePage(value)}/>
                </div>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        allRequestList: state.request.allRequestList,
        clientRequestList: state.request.clientRequestList,
        currentPage: state.request.currentPage,
        totalPage: state.request.totalPage,
        user: state.user.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllRequests: (page) => dispatch({type: 'GET_ALL_REQUESTS', payload: page}),
        getMyRequests: (params) => dispatch({type: 'GET_MY_REQUESTS', payload: params})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Request);