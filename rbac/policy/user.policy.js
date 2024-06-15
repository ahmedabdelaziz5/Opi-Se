const {
    GET_USER_PROFILE,
    GET_NOTIFICATIONS,
    CHANGE_PASSWORD,
    CHANGE_PROFILE_IMAGE,
    EDIT_PROFILE,
} = require('../../endpoints/user.endpoints');

const {
    GET_PARTNER_CHAT,
    GET_CHAT_MEDIA,
    UPLOAD_CHAT_MEDIA,
} = require('../../endpoints/chat.endpoints');

const {
    GET_MATCH_REQUEST,
    SEARCH_FOR_SPECIFIC_PARTNER,
    SEND_PARTNER_REQUEST,
    ACCEPT_MATCH_REQUEST,
    DECLINE_MATCH_REQUEST,
    DISMATCH_WITH_PARTNER,
} = require('../../endpoints/match.endpoints');

const {
    GET_ALL_NOTES,
    ADD_NOTE,
    UPDATE_NOTE,
    PIN_NOTE,
    DELETE_NOTE,
    RESTORE_NOTE,
} = require('../../endpoints/note.endpoints');

const {
    GET_PARTNER_RECOMMENDATION,
    SUBMIT_USER_PREFERS,
    EDIT_USER_PREFERS,
} = require('../../endpoints/recommendation.endpoints');

const {
    GET_ALL_TASKS,
    GET_SPECIFIC_TASKS_TYPE,
    ADD_TASK,
    EDIT_TASK,
    DELETE_TASK,
    DELETE_ALL_TASKS_TYPE,
} = require('../../endpoints/task.endpoints');

const {
    GET_ALL_TRASH_NOTES,
    DELETE_NOTE_FROM_TRASH,
    FLUSH_TRASH,
} = require('../../endpoints/trash.endpoints');


module.exports = [

    // user policies
    GET_USER_PROFILE,
    GET_NOTIFICATIONS,
    CHANGE_PASSWORD,
    CHANGE_PROFILE_IMAGE,
    EDIT_PROFILE,

    // chat policies
    GET_PARTNER_CHAT,
    GET_CHAT_MEDIA,
    UPLOAD_CHAT_MEDIA,

    // match policies
    GET_MATCH_REQUEST,
    SEARCH_FOR_SPECIFIC_PARTNER,
    SEND_PARTNER_REQUEST,
    ACCEPT_MATCH_REQUEST,
    DECLINE_MATCH_REQUEST,
    DISMATCH_WITH_PARTNER,

    // note policies
    GET_ALL_NOTES,
    ADD_NOTE,
    UPDATE_NOTE,
    PIN_NOTE,
    DELETE_NOTE,
    RESTORE_NOTE,

    // recommendation policies
    GET_PARTNER_RECOMMENDATION,
    SUBMIT_USER_PREFERS,
    EDIT_USER_PREFERS,

    // task policies
    GET_ALL_TASKS,
    GET_SPECIFIC_TASKS_TYPE,
    ADD_TASK,
    EDIT_TASK,
    DELETE_TASK,
    DELETE_ALL_TASKS_TYPE,

    // trash policies
    GET_ALL_TRASH_NOTES,
    DELETE_NOTE_FROM_TRASH,
    FLUSH_TRASH,
];