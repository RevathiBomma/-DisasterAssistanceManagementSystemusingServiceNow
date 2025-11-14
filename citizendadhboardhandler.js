CitizenDashboardHandler(GLIDEAJAX):
var CitizenDashboardHandler = Class.create();
CitizenDashboardHandler.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    
    // This function fetches all requests made by the currently logged-in citizen
    getCitizenRequests: function() {
        var result = [];
        try {
            var userName = gs.getUserDisplayName(); // Logged-in user's display name
            
            var gr = new GlideRecord('u_citizen_requests');
            gr.addQuery('u_citizen_name', userName);
            gr.orderByDesc('sys_created_on');
            gr.query();
            
            while (gr.next()) {
                var record = {};
                record.sys_id = gr.getUniqueValue();
                record.citizen_name = gr.getDisplayValue('u_citizen_name');
                record.resource = gr.getDisplayValue('u_resource_type');
                record.volunteer = gr.getDisplayValue('u_assigned_volunteer');
                record.status = gr.getDisplayValue('u_status');
                result.push(record);
            }
        } catch (e) {
            gs.error('Error in CitizenDashboardHandler: ' + e);
        }
        return JSON.stringify(result);
    }
});
