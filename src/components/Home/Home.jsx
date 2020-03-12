import React from 'react' 
import { Tabs } from 'antd'
import "antd/dist/antd.css";
import '../../App.css'
import './Home.css'
import TodoList from './TodoList/TodoList';
import Modal from '../Common/Modal.jsx';
import CommonAction from '../../redux/Common.js'
import UserAction from '../../redux/User'
import TodoAction from '../../redux/Todo'
import { CustomButton } from '../Common/CustomButton';
import { connect } from 'react-redux';
import UserList from './UserList/UserList';
const { TabPane } = Tabs;
class Home extends React.Component {

    componentDidMount() {
        const {setAllUserData, setAllTodoData} = this.props
        setAllTodoData()
        setAllUserData()
    }

    openModal = () => {
        const { toggleModal } = this.props;
        toggleModal(true, false)
    }

    callback = (key) => {
        this.props.setSelectedTab(key)
    }

    render() {
        return (
            <React.Fragment>
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="TODO" key="1">
                        <CustomButton buttonText="Add TODO" click={() => this.openModal()}/>
                        <TodoList/>
                    </TabPane>
                    <TabPane tab="USERS" key="2">
                        <CustomButton buttonText="Add user" click={() => this.openModal()}/>
                        <UserList/>
                    </TabPane>
                </Tabs> 
                <Modal/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    todoList: state.todo.todoList
})

const mapDispatchToProps = {
    toggleModal: CommonAction.toggleModal,
    setSelectedTab: CommonAction.setSelectedTab,
    setAllTodoData: TodoAction.setAllTodoData,
    setAllUserData: UserAction.setAllUserData
}


export default  connect(mapStateToProps, mapDispatchToProps)(Home)