import React from 'react'
import { Modal, Input, DatePicker, Form, Button } from 'antd'
import { connect } from 'react-redux'
import CommonAction from '../../redux/Common.js'
import TodoAction from '../../redux/Todo'
import UserAction from '../../redux/User'
import moment from 'moment'
async function wait(duration = 1000) {
    await new Promise(resolve => setTimeout(resolve, duration));
}

const INITIAL_STATE  = {
    dateTime: moment(new Date()).format('YYYY-MM-DD HH:mm'),
    action: '',
    email: '',
    name: ''
}


class CustomModal extends React.Component {
    formRef = React.createRef();

    state = {
        dateTime: moment(new Date()).format('YYYY-MM-DD HH:mm'),
        action: '',
        email: '',
        name: ''
    }

    handleOk = async () => {
        const { submitForm, selectedTab, addTodoBegin, addUserBegin, isEditOpen, editTodoData, editUserData, toggleModal } = this.props
        const { action, dateTime, email, name } = this.state
        let postData = {};
        await submitForm();
        if(selectedTab === "1") {
            postData.action = action;
            postData.dateTime = dateTime;
            if(isEditOpen) {
                postData.key = editTodoData.key
            }
            await addTodoBegin(postData)
        } else {
            postData.email = email || editUserData.email;
            postData.name = name || editUserData.name;
            if(isEditOpen) {
                postData.key = editUserData.key
            }
            await addUserBegin(postData)
        }
        this.setState(INITIAL_STATE)
        await wait(1000)
        await toggleModal(false, false)
        this.formRef.current.resetFields();
        submitForm();
    };

    handleInputChange = (value, key) => {
        if(key === 'dateTime') {
            value = moment(new Date(value)).format('YYYY-MM-DD HH:mm')
        }
        this.setState({ [key]: value })
    }

    handleCancel = () => {
        this.props.toggleModal(false, false)
    }

    componentDidUpdate() {
        const { selectedTab, isEditOpen, editTodoData, editUserData, initialEdit, lockEdit } = this.props
        if(isEditOpen && initialEdit){
            lockEdit()
            if(selectedTab === "1") {
                this.formRef.current.setFieldsValue({
                    action: editTodoData.action,
                    dateTime: moment(new Date(editTodoData.dateTime))
                })
            } else if(selectedTab === "2") {
                this.formRef.current.setFieldsValue({
                    name: editUserData.name,
                    email: editUserData.email
                })
            }
        }
    }

    render() {
        const { isModalOpen, isConfirmLoading, selectedTab } = this.props
        return (
            <Modal
                title="Title"
                visible={isModalOpen}
                onCancel={this.handleCancel}
                footer={null}
            >
                {selectedTab === "1"  ?
                <React.Fragment>
                    <Form layout="vertical"
                     ref={this.formRef}
                    initialValues={{
                        action: "",
                        dateTime: moment(new Date())
                      }} name="todo">
                        <Form.Item name="action" label="Action" rules={[{ required: true }]}>
                        <Input onChange={(e) => this.handleInputChange(e.target.value, 'action')} />
                        </Form.Item>
                        <Form.Item name="dateTime" label="Date Time" rules={[{required: true}]}>
                            <DatePicker value={moment(new Date())} showTime onChange={(e, dateString) => this.handleInputChange(dateString, 'dateTime')} onOk={this.onOk} />
                        </Form.Item>
                    </Form> 
                </React.Fragment> :
                <React.Fragment>
                    <Form layout="vertical"
                    ref={this.formRef}
                    initialValues={{
                        name: '',
                        email: ''
                    }} name="user">
                        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input  onChange={(e) => this.handleInputChange(e.target.value, 'name')} />
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{required: true}]}>
                            <Input inputMode='email' onChange={(e) => this.handleInputChange(e.target.value, 'email')} />
                        </Form.Item>
                    </Form>
                </React.Fragment>
                }
                <Button type="primary" loading={isConfirmLoading} onClick={this.enterLoading}  onClickCapture={this.handleOk}>
                    Submit
                </Button>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    isModalOpen: state.common.isModalOpen,
    isEditOpen: state.common.isEditOpen,
    isConfirmLoading: state.common.isConfirmLoading,
    selectedTab: state.common.selectedTab,
    initialEdit: state.common.initialEdit,
    editTodoData: state.todo.editTodoData,
    editUserData: state.user.editUserData
})

const mapDispatchToProps = {
    submitForm: CommonAction.submitForm,
    addTodoBegin: TodoAction.addTodoBegin,
    addUserBegin: UserAction.addUserBegin,
    toggleModal: CommonAction.toggleModal,
    lockEdit: CommonAction.lockEdit
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomModal)