import React from 'react'
import { connect } from 'react-redux'
import TodoAction from '../../../redux/Todo'
import CommonAction from '../../../redux/Common'
import { Table } from 'antd'

class TodoList extends React.Component {

    column = [
        { title: 'Description', dataIndex: 'action', key: 'desc'},
        { title: 'Time', dataIndex: 'dateTime', key: 'dateTime'},
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record) => <React.Fragment><span onClick={() => this.actionList('edit', record.key)}>Edit</span> | <span onClick={() => this.actionList('delete', record.key)}>Delete</span></React.Fragment>,
        }
    ]

    actionList = (action, value) => {
        if(action === 'edit') {
            this.props.toggleModal(true, true)
            this.props.getEditList(value)
        } else {
            this.props.deleteList(value)
        }
    }

    render() {
        const { todoList } = this.props
        return(
            <Table
                columns={this.column}
                dataSource={todoList}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    todoList: state.todo.todoList
})

const mapDispatchToProps = {
    deleteList: TodoAction.deleteList,
    getEditList: TodoAction.getEditList,
    toggleModal: CommonAction.toggleModal
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)