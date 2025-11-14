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
1.After creating tables ,impersonate by any user and open the service portal which looks like this:
<img width="1920" height="1080" alt="Screenshot (244)" src="https://github.com/user-attachments/assets/d0fa853f-9082-4851-aef9-3c817dabae8c" />


2.Service portal consists of Category"Disaster Assistance" with catalog items "citizenrequest" and "volunteersignup".Impersonate as a user into service portal and signup as a volunteer.Volunteer page looks like this:
<img width="1920" height="1080" alt="Screenshot (244)" src="https://github.com/user-attachments/assets/22c1673b-89cc-4266-a864-fc10dd2ec6bd" />
fill in the details it is mandatory to provide location  and "volunteer member" table gets updated like this:
<img width="1920" height="1080" alt="Screenshot (244)" src="https://github.com/user-attachments/assets/e3f242a9-7779-4c02-ba9b-936645042286" />


3.Now the affected citizen also fills the record producer of citizen request which looks like this:
<img width="1920" height="1080" alt="Screenshot (244)" src="https://github.com/user-attachments/assets/6b6e9789-0b38-41ea-97ec-4f575e8def9a" />
<img width="1920" height="1080" alt="Screenshot (224)" src="https://github.com/user-attachments/assets/0251c2de-33df-4220-900d-6ef998bd7af4" />
fill in the details by providing location and the "citizenrequest table"gets updated and a popup message will be displayed according to the availability of the volunteers :
<img width="1920" height="1080" alt="Screenshot (225)" src="https://github.com/user-attachments/assets/b84d54f0-6436-4ac9-9c4f-7bf20fe02bba" />







