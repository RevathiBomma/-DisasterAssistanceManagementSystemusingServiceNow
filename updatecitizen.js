Business Rule:
(function executeRule(current, previous) {
    var volunteerId = current.u_assigned_volunteer;

    // Find the next waiting citizen assigned to same volunteer
    var nextCitizen = new GlideRecord('u_citizen_requests');
    nextCitizen.addQuery('u_assigned_volunteer', volunteerId);
    nextCitizen.addQuery('u_status', 'Assigned');
    nextCitizen.orderBy('sys_created_on');
    nextCitizen.query();

    if (nextCitizen.next()) {
        nextCitizen.u_status = 'InProgress';
        nextCitizen.update();

        // Create or update corresponding volunteer task
        var nextTask = new GlideRecord('u_volunteer_task');
        nextTask.addQuery('u_citizen_request', nextCitizen.sys_id);
        nextTask.query();

        if (nextTask.next()) {
            nextTask.u_status = 'InProgress';
            nextTask.update();
        } else {
            var newTask = new GlideRecord('u_volunteer_task');
            newTask.initialize();
            newTask.u_assigned_volunteer = volunteerId;
            newTask.u_citizen_request = nextCitizen.sys_id;
            newTask.u_status = 'InProgress';
            newTask.insert();
        }
    }
})(current, previous);
