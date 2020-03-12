import {createActions, createReducer} from 'reduxsauce'

/* ------------- Types & Action Creators ------------- */
const { Types, Creators } = createActions({
    toggleModal: ['open','edit'],
    submitForm: ['loading', 'payload'],
    setSelectedTab: ['key'],
    lockEdit: null
})

export const CommonTypes = Types
export default Creators

/* ------------- Initial State -------------*/

export const INITIAL_STATE = {
    isModalOpen: false,
    isEditOpen: false,
    isConfirmLoading: false,
    selectedTab: '1',
    initialEdit: false
}

/* ------------- Reducers ------------- */

export const toggleModal = (state, { open, edit }) => {
    const initial = edit
    return { ...state, isModalOpen: open, isEditOpen: edit, initialEdit: initial}
}

export const submitForm = (state) => {
    const { isConfirmLoading } = state
    return {...state, isConfirmLoading: !isConfirmLoading, isModalOpen: !isConfirmLoading}
}

export const setSelectedTab = (state, {key}) => {
    return {...state, selectedTab: key}
}

export const lockEdit = (state) => {
    return {...state, initialEdit: false}
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.TOGGLE_MODAL]: toggleModal,
    [Types.SUBMIT_FORM]: submitForm,
    [Types.SET_SELECTED_TAB]: setSelectedTab,
    [Types.LOCK_EDIT]: lockEdit
});
