Disaster Assistance Management System (ServiceNow)
A ServiceNow-based disaster relief coordination system that connects citizens in need of resources with available volunteers.
The portal automates:
->Citizen request submission
->Volunteer matching based on location
->Workload-based assignment (busy/free logic)
->Task creation for volunteers
->Live dashboards for both citizens & volunteers
->Auto-updating status when a citizen marks “Received”
->Queue management (next citizen assigned when previous request is completed)
->This project demonstrates end-to-end design of a ServiceNow workflow automation system using custom tables, widgets, business rules, script includes, and GlideAjax.


1.Features:

✔ Citizen Portal
 Submit request for resources (food, medicine, clothes, etc.)
 Automatically matched with volunteer from same location
 Tracks live status
 “Mark as Received” button updates system instantly
 
✔ Volunteer Portal
 View currently assigned citizens
 Track number of citizens served
 See assigned resource and status
 Dynamic, auto-refreshing dashboard
 
✔ Automation Workflow
 Auto-assign volunteer only when free
 Queueing system (if volunteer busy → citizen status = Assigned)
 Auto-start next citizen when previous request becomes Resolved
 Sync between citizen, volunteer task, and volunteer status


 
 2.🗃 Database Design (Custom Tables)
   -> 1. u_citizen_requests
 | Field Label        | Field Name           |
| ------------------ | -------------------- |
| Citizen Name       | u_citizen_name       |
| Location           | u_location           |
| Resource Type      | u_resource_type      |
| Description        | u_description        |
| Special Condition  | u_special_condition  |
| Disaster Type      | u_disaster_type      |
| Assigned Volunteer | u_assigned_volunteer |
| Status             | u_status             |
  ->2.u_volunteer_members:
  | Field Label    | Field Name       |
| -------------- | ---------------- |
| Full Name      | u_full_name      |
| Email          | u_email          |
| Contact Number | u_contact_number |
| Location       | u_location       |
  ->3. u_volunteer_task:
  | Field Label                                      | Field Name           |
| ------------------------------------------------ | -------------------- |
| Assigned Volunteer (Reference → sys_user)        | u_assigned_volunteer |
| Citizen Request (Reference → u_citizen_requests) | u_citizen_request    |
| Status                                           | u_status             |




3.🧩 Workflow: Start to End:
1.Citizen submits the request (Record Producer).
2.System finds volunteer with same location.
3.If volunteer is free →
     Status = InProgress
     Task created
4.If volunteer is busy →
     Status = Assigned (queued)
5.Citizen clicks “Received” →
     Status updated to Resolved
     Next citizen in queue gets assigned automatically
6.Dashboards update live.



------working----
1.After creating tables ,impersonate by any user and open the service portal .
<img width="1920" height="1080" alt="Screenshot (244)" src="https://github.com/user-attachments/assets/8fb17945-9146-4fb0-a9b3-4f7aeebc5753" />




2.Service portal consists of Category"Disaster Assistance" with catalog items "citizenrequest" and "volunteersignup".Impersonate as a user into service portal and signup as a volunteer.Volunteer page looks like this;
<img width="1920" height="1080" alt="Screenshot (220)" src="https://github.com/user-attachments/assets/f71c4fb3-2648-47cc-826e-c92d7ef839fc" />




2.Fill in the details it is mandatory to provide location  and "volunteer member" table gets updated like this:
<img width="1920" height="1080" alt="Screenshot (222)" src="https://github.com/user-attachments/assets/81877e1e-42f9-487b-86a6-554d1b259b8e" />




3.Now the affected citizen also fills the record producer of citizen request which looks like this:
<img width="1920" height="1080" alt="Screenshot (223)" src="https://github.com/user-attachments/assets/1ce256ce-2591-42ef-a90b-80a533f2efe6" />
<img width="1920" height="1080" alt="Screenshot (224)" src="https://github.com/user-attachments/assets/6d42a565-a629-43dd-8de7-be713eb5581e" />



4.Fill in the details by providing location and the "citizenrequest table"gets updated and a pop up message will be displayed according to the availability of the volunteers :
<img width="1920" height="1080" alt="Screenshot (225)" src="https://github.com/user-attachments/assets/79adcd18-0a53-4ece-930b-682f5318ae65" />


5.Volunteer tasks table also gets updated by updating the status of volunteer to "In progress";
<img width="1920" height="1080" alt="Screenshot (227)" src="https://github.com/user-attachments/assets/89f83072-20c8-425e-b12e-45ef296660da" />


6.Suppose the volunteer is busy serving another citizen then the requested citizen will be informed  that the volunteer is busy.
<img width="1920" height="1080" alt="Screenshot (245)" src="https://github.com/user-attachments/assets/73d12749-9d43-4d7d-9775-aec60fad7a27" />



7.According to the status of citizen request their dashboard gets updated.There will be a button as"Mark as received" where the citizen should click after receiving the requested resources.
<img width="1920" height="1080" alt="Screenshot (226)" src="https://github.com/user-attachments/assets/00454efd-c56f-472f-8973-a781abded539" />


8.Volunteers dashboard consists of his status and count of the citizens served.
<img width="1920" height="1080" alt="Screenshot (239)" src="https://github.com/user-attachments/assets/e0093e5d-431e-4177-a88d-dd1fa321c0e1" />


9.Whenever the citizen clicks the button "mark as received" their dashboard changes ;
<img width="1920" height="1080" alt="Screenshot (240)" src="https://github.com/user-attachments/assets/3c722d6c-b3f8-41b3-932d-f819ac88ea1e" />


10.Similarly the dashboard of volunteer also gets updated.Volunteer task table gets updated according the citizens response and volunteers acceptance of requests.
<img width="1920" height="1080" alt="Screenshot (242)" src="https://github.com/user-attachments/assets/db6dd334-bfd8-45dd-95d8-b2a902030bdb" />




🛠 Technologies Used
 ServiceNow Platform (PDI)
 Script Includes
 GlideRecord API
 Business Rules
 Record Producers
 AngularJS (Service Portal Widgets)
 Bootstrap Styling
 GlideAjax
 Custom Tables













