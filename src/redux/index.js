import {reducer as todo} from './Todo.js'
import {reducer as user} from './User.js'
import { reducer as common } from './Common.js'
import { combineReducers } from 'redux'

const reducers = combineReducers({
    todo,
    user,
    common
})

export default reducers