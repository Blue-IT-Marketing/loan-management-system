import * as settings from '../../constants/program_constants'
export const chat_server = "http://localhost:5000";
export const chat_server_online = "https://gentle-coast-76722.herokuapp.com/";

export const chat_message_init = {
    chat_id : '',
    message_id : '',
    author:'',
    message:'',
    timestamp:'',
    attachments : ''
};

export const chat_room_init = {
    chat_id : settings.app_name,
    created_by : settings.email,
    messages : [],
    users : []
};

export const chat_user_init = {
    chat_id : '',
    author : ''
};

export const feedback_init = { author: "", message: "" };
