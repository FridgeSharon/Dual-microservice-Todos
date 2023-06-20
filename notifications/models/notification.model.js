const {Notification} = require('../services/db');

function getAll() {
    return Notification.find();
}

function createNew(reqBody) {
    const {todoId, deadline} = reqBody
    const notification = new Notification({
        todoId,
        deadline
    });
    return notification.save();
}

function getByAllIds(ids) {
    return Notification.find({todoId:{$in:ids}})
}

function getByTodoId(todoId) {
    return Notification.findOne({todoId});
}

function updateDeadline(notification, deadline){
    notification.deadline = deadline;
    notification.notificationSent = false;
    return notification.save();
}

function deleteNotification(notification) {
    return Notification.deleteOne(notification);
}

function getNotificationsToSend() {
    return Notification.find({deadline:{$lt:new Date()},notificationSent:{$ne:true}});
}

function updateSent(notification) {
    notification.notificationSent = true;
    return notification.save();
}

module.exports = {getAll, createNew, getByAllIds, getByTodoId, updateDeadline, deleteNotification,getNotificationsToSend, updateSent}