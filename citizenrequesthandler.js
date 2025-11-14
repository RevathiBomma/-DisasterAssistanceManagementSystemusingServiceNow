CitizenRequestHandler (GlideAjax)
var CitizenRequestHandler = Class.create();
CitizenRequestHandler.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    markAsReceived: function() {
        try {
            var sys_id = this.getParameter('sysparm_sys_id');
            if (!sys_id) return 'missing_sys_id';

            // Update citizen request
            var citizenGR = new GlideRecord('u_citizen_requests');
            if (!citizenGR.get(sys_id)) return 'record_not_found';

            citizenGR.u_status = 'Resolved';
            citizenGR.update();

            // Update corresponding volunteer task
            var taskGR = new GlideRecord('u_volunteer_task');
            taskGR.addQuery('u_citizen_request', sys_id);
            taskGR.query();
            while (taskGR.next()) {
                taskGR.u_status = 'Resolved';
                taskGR.update();
            }

            // Log the event for debugging
            gs.info('CitizenRequestHandler: Citizen & Volunteer updated for ' + sys_id);
            return 'success';

        } catch (e) {
            gs.error('CitizenRequestHandler error: ' + e);
            return 'error';
        }
    },

    type: 'CitizenRequestHandler'
});
