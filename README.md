# Bank-IT-Support-Management-System
The Bank IT Support Management System is a comprehensive solution designed to streamline support request tracking for bank branches and facilitate efficient communication between IT managers and officers. This system is built with a user-friendly interface and utilizes modern technologies for both frontend and backend development.

## Features
### For Branches
- **Request Support:**
   _- Branches can submit support requests, specifying the nature of the issue they're facing.
- **Track Requests:**
   _- View the status of their support requests, including assignment details and resolution status.
- **View Assigned IT Officer:**
   _- Identify the assigned IT Officer for each request.
- **View Fixed Requests:**
   _- Access a separate section to see already fixed requests.

### For IT Officers
- **Assigned Requests:**
   _- IT Officers can view and manage the support requests assigned to them.
- **Resolve Requests:**
   _- Mark requests as resolved once the issue is fixed.
- **Unmark Requests:**
   _- Officers can unmark resolved requests within a 45-minute time frame.

### For IT Managers
- **Manage Requests:**
   _- View and manage all support requests for every branch.
   _- Assign IT Officers to specific requests and change assignments within a 30-minute window.
- **User Management:**
   _- Create, edit, and delete IT Officer accounts.
   _- Add additional IT Managers with a unique passcode.
- **Branch Management:**
   _- Add, edit, and delete branches.

## Technologies Used
- **Frontend:**
   _- React Library
   _- Tailwind CSS for styling
   _- Material Icons
   _- React-Bootstrap
   _- Redux for state management

- **Backend:**
   _- ExpressJS framework
   _- MongoDB for the database

### Installation
1. Clone the repository.

bash
Copy code
git clone https://github.com/Dagi07/Bank-IT-Support-Management-System.git
2. Install dependencies for the frontend.

bash
Copy code
cd bank-it-support-management-system/frontend
npm install
3. Install dependencies for the backend.

bash
Copy code
cd ../backend
npm install
4. Configure MongoDB connection in the backend. Update the .env file with your MongoDB URI.

5. Start the frontend and backend servers.

bash
Copy code
# In frontend directory
npm start

# In backend directory
npm start
### Usage
   _- Access the application at http://localhost:5173 in your browser.
   _- Login with your credentials (branch, IT Officer, or IT Manager) to start using the system.
### Contributing
   _- If you would like to contribute to the project, contact me.
### License
This project is licensed under the MIT License.

### Acknowledgments
   _- Special thanks to the contributors and users who have provided valuable feedback and support.
