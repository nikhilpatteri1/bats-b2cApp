
self.addEventListener('activate', function (event) {

});

self.addEventListener('fetch', function (event) {

});

self.addEventListener('push', function (event) {

});

self.addEventListener('deviceready', function () {
    // Schedule notification for tomorrow to remember about the meeting
    cordova.plugins.notification.local.schedule({
        id: 10,
        title: "Meeting in 15 minutes!",
        text: "Jour fixe Produktionsbesprechung",
        at: tomorrow_at_8_45_am,
        data: { meetingId: "#123FG8" }
    });

    // Join BBM Meeting when user has clicked on the notification 
    cordova.plugins.notification.local.on("click", function (notification) {
        if (notification.id == 10) {
            joinMeeting(notification.data.meetingId);
        }
    });

    // Notification has reached its trigger time (Tomorrow at 8:45 AM)
    cordova.plugins.notification.local.on("trigger", function (notification) {
        if (notification.id != 10)
            return;

        // After 10 minutes update notification's title 
        setTimeout(function () {
            cordova.plugins.notification.local.update({
                id: 10,
                title: "Meeting in 5 minutes!"
            });
        }, 600000);
    });

    // Determine permission to show local notifications

    cordova.plugins.notification.local.hasPermission(function (granted) {
        console.log('Permission has been granted: ' + granted);
    });
    // Register permission to show local notifications

    // Of course you can call the method yourself, but the plugin will do that for you when trying to schedule local notifications.

    cordova.plugins.notification.local.registerPermission(function (granted) {
        console.log('Permission has been granted: ' + granted);
    });

    // cordova.plugins.notification.local.schedule({
    //     text: "Wake up!",
    //     // sound: "file://sounds/alert.caf",
    //     every: 30 // every 30 minutes
    // });

}, false);