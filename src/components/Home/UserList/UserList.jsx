import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import UserAction from '../../../redux/User'
import CommonAction from '../../../redux/Common'
class UserList extends React.Component {
    column = [
        { title: 'Name', dataIndex: 'name', key: 'name'},
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record) =>  
                <React.Fragment>
                    <span onClick={() => this.actionList('edit', record.key)}>Edit</span> | <span onClick={() => this.actionList('delete', record.key)}>Delete</span>
                </React.Fragment>,
        }
    ]

    actionList = (action, value) => {
        if(action === 'edit') {
            this.props.toggleModal(true, true)
            this.props.getEditUserList(value)
        } else {
            this.props.deleteList(value)
        }
    }


    render() {
        const { userList } = this.props
        return (
            <Table
                columns={this.column}
                dataSource={userList}
            />
        )
    }
}

const mapStateToProps = state => ({
    userList: state.user.userList
})

const mapDispatchToProps = {
    getEditUserList: UserAction.getEditUserList,
    toggleModal: CommonAction.toggleModal,
    deleteUser: UserAction.deleteUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)