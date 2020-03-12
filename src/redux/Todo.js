import {createActions, createReducer} from 'reduxsauce'
import { removeObjectByValue } from '../helper/utils'

/* ------------- Types & Action Creators ------------- */

const { Types, Creators } = createActions({
    addTodoBegin: ['payload'],
    addTodoSuccess: ['payload'],
    addTodoError: null,
    deleteList: ['key'],
    getEditList: ['key'],
    setAllTodoData: null
})

export const TodoTypes = Types
export default Creators

/* ------------- Initial State -------------*/

export const INITIAL_STATE = {
    isLoading: false,
    isSubmitting: false,
    hasError: false,
    todoList: [],
    editTodoData: {}
}

/* ------------- Reducers ------------- */
export const addTodoBegin = (state, {payload}) => {
    let list = [...state.todoList]
    if(payload.hasOwnProperty('key')) {
        list.map((list, i) => {
            if(list.key === payload.key) {
                list.action = payload.action
                list.dateTime = payload.dateTime
            }
        })
    } else {
        payload.key = list.length + 1
        list.push(payload)
    }
    localStorage.setItem('todo', JSON.stringify(list))
    return {...state, todoList: list}
}

export const deleteList = (state, {key}) => {
    const existList = [...state.todoList]
    const todoList = removeObjectByValue(existList, key)
    localStorage.setItem('todo', JSON.stringify(todoList))
    return {...state, todoList}
}

export const getEditList = (state, {key}) => {
    return {...state, editTodoData: state.todoList.filter(list => list.key === key)[0]}
}

export const setAllTodoData = (state) => {
    const todoList = JSON.parse(localStorage.getItem('todo')) || []
    return {...state, todoList}
}


/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_TODO_BEGIN]: addTodoBegin,
    [Types.DELETE_LIST]: deleteList,
    [Types.GET_EDIT_LIST]: getEditList,
    [Types.SET_ALL_TODO_DATA]: setAllTodoData
});
