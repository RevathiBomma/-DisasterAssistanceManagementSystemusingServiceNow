RECORD PRDUCER(Citizen Request)
(function () {
    try {
        var citizenName = producer.u_citizen_name;
        var citizenLocationSysId = producer.u_location;

        if (!citizenName || !citizenLocationSysId) {
            gs.addInfoMessage('Your request could not be submitted because the location or citizen name was not provided.');
            producer.portal_redirect = '/sp?id=sc_cat_item&sys_id=' + producer.sys_id;
            return;
        }

        // Find a volunteer whose location matches the citizen's
        var volunteerGr = new GlideRecord('u_volunteer_members');
        volunteerGr.addQuery('u_location', citizenLocationSysId);
        volunteerGr.query();

        if (volunteerGr.next()) {
            // Match this volunteer to a sys_user using email
            var volunteerUserGr = new GlideRecord('sys_user');
            volunteerUserGr.addQuery('email', volunteerGr.u_email);
            volunteerUserGr.query();

            if (volunteerUserGr.next()) {
                // Now we have a valid sys_user record for the volunteer
                var volunteerUserSysId = volunteerUserGr.getUniqueValue();

                // Check if volunteer is already busy
                var busyTaskGr = new GlideRecord('u_volunteer_task');
                busyTaskGr.addQuery('u_assigned_volunteer', volunteerUserSysId);
                busyTaskGr.addQuery('u_status', 'InProgress');
                busyTaskGr.query();

                if (busyTaskGr.next()) {
                    // Volunteer is busy → assign citizen but mark as waiting
                    current.u_assigned_volunteer = volunteerUserSysId;
                    current.u_status = 'Assigned';
                    gs.addInfoMessage('Your request has been submitted. The volunteer is currently serving another citizen. Please wait until it completes.');
                } else {
                    // Volunteer is free → create new volunteer task
                    var taskGr = new GlideRecord('u_volunteer_task');
                    taskGr.initialize();
                    taskGr.u_citizen_request = current.getUniqueValue();
                    taskGr.u_assigned_volunteer = volunteerUserSysId;
                    taskGr.u_status = 'InProgress';
                    taskGr.insert();

                    current.u_assigned_volunteer = volunteerUserSysId;
                    current.u_status = 'InProgress';
                    gs.addInfoMessage('Your request has been assigned to ' + volunteerGr.u_full_name + '. For any queries, reach out to ' + volunteerGr.u_email + '.');
                }
            } else {
                // No sys_user found for volunteer email
                current.u_status = 'Open';
                gs.addInfoMessage('Your request has been submitted, but no sys_user record was found for the volunteer email.');
            }
        } else {
            // No volunteer with matching location
            current.u_status = 'Open';
            gs.addInfoMessage('Your request has been submitted, but no volunteer was found in your location.');
        }

    } catch (ex) {
        gs.error('Error in Citizen Request Record Producer script: ' + ex);
        gs.addInfoMessage('An error occurred during your request submission. Please try again or contact support.');
    }
})();
