const { scheduleJob } = require('node-schedule')
const Notification = require('../models/notification.model');

// this runs the job every 15 seconds.
const pattern = '*/15 * * * * *';
const startSchedule = () => {
    scheduleJob(pattern, sendNotificationsReachingDeadline);
}

async function sendNotificationsReachingDeadline() {
    const notifications = await Notification.getNotificationsToSend();
    await sendNotifications(notifications);
}

const sendNotifications = async (notifications) => {
    if(!notifications || notifications.length === 0){
        console.log('no notifications to send');
        return;
    }

    const promises = notifications.map(noti => {
        console.log(`assuming actual send function is implemented. sending notification for TodoID: ${noti.todoId}`);
        return Notification.updateSent(noti);
    })
    return Promise.all(promises);
};

module.exports = {startSchedule};