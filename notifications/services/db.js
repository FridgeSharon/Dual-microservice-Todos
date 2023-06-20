const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");

const uri = "mongodb+srv://PayboxNotifications:PayboxNotifications123@freetier.yz5x7ud.mongodb.net/Paybox?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true});

const notificationSchema = new mongoose.Schema({
    todoId: ObjectId,
    deadline: Date,
    notificationSent: Boolean
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = {Notification};