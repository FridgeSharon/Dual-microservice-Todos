const express = require('express');
const Notification = require('./models/notification.model')
const {startSchedule} = require("./services/notificationSender.service");

const notificationsMS = express();
notificationsMS.use(express.json());

const status500 = (res, message) => res.status(500).send(message);
const status200 = (res, message) => res.status(200).send(message);


// Get all
notificationsMS.get('/notifications', async (req, res) => {
    try {
        const notifications = await Notification.getAll();
        status200(res, notifications);
    } catch (e) {
        status500(res, e.message);
    }
});

// getByTodoId
notificationsMS.get('/notifications/:todoId', async (req, res) => {
    try {
        const notifications = await Notification.getByTodoId(req.params.todoId);
        status200(res, notifications);
    } catch (e) {
        status500(res, e.message);
    }
});

// Create new
notificationsMS.post('/notifications', async (req, res) => {
    try {
        const notification = await Notification.createNew(req.body)
        status200(res, notification);
    } catch (e) {
        status500(res, e.message);
    }
});

// Get by many todos Ids
notificationsMS.post('/notifications/getByManyIds', async (req, res) => {
    try {
        const notifications = await Notification.getByAllIds(req.body)
        status200(res, notifications);
    } catch (e) {
        status500(res, e.message);
    }
});

// update by todoId
notificationsMS.post('/notifications/:todoId', async (req, res) => {
    try {
        const notification = await Notification.getByTodoId(req.params.todoId);
        const updatedNotification = await Notification.updateDeadline(notification, req.body.deadline);
        status200(res, updatedNotification);
    } catch (e) {
        status500(res, e.message);
    }
});

// Delete by ID
notificationsMS.get('/notifications/:todoId/delete', async (req, res) => {
    try {
        const notification = Notification.getByTodoId(req.params.todoId);
        await Notification.deleteNotification(notification);
        status200(res, 'Notification deleted');
    } catch (e) {
        status500(res, e.message);
    }
});

notificationsMS.listen(3001, () => console.log('Notifications listening on port 3001'));

startSchedule();