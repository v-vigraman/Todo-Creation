import { createActions, createReducer } from 'reduxsauce'
import { removeObjectByValue } from '../helper/utils'

/* ------------- Types & Action Creators ------------- */

const { Types, Creators } = createActions({
    addUserBegin: ['payload'],
    addUserSuccess: ['payload'],
    addUserError: null,
    getEditUserList: ['key'],
    deleteUser: ['key'],
    setAllUserData: null
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State -------------*/

export const INITIAL_STATE = {
    isLoading: false,
    isSubmitting: false,
    hasError: false,
    userList: [],
    editUserData: {}
}

/* ------------- Reducers ------------- */
export const addUserBegin = (state, {payload}) => {
    const list = [...state.userList]
    if(payload.hasOwnProperty('key')) {
        list.map((list, i) => {
            if(list.key === payload.key) {
                list.name = payload.name
                list.email = payload.email
            }
        })
    } else {
        payload.key = list.length + 1
        list.push(payload)
    }
    localStorage.setItem("user", JSON.stringify(list))
    return {...state, userList: list}
}

export const deleteUser = (state, {key}) => {
    const existList = [...state.userList]
    const userList = removeObjectByValue(existList, key)
    localStorage.setItem("user", JSON.stringify(userList))
    return {...state, userList}
}

export const getEditUSerList = (state, {key}) => {
    return {...state, editUserData: state.userList.filter(list => list.key === key)[0]}
}

export const setAllUserData = (state) => {
    const userList = JSON.parse(localStorage.getItem('user')) || []
    return {...state, userList}
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_USER_BEGIN]: addUserBegin,
    [Types.GET_EDIT_USER_LIST]: getEditUSerList,
    [Types.DELETE_USER]: deleteUser,
    [Types.SET_ALL_USER_DATA]: setAllUserData
});