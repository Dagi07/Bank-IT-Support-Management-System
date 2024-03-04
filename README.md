# Bank-IT-Support-Management-System
The Bank IT Support Management System is a comprehensive solution designed to streamline support request tracking for bank branches and facilitate efficient communication between IT managers and officers. This system is built with a user-friendly interface and utilizes modern technologies for both frontend and backend development.

## Features
### For Branches
- **Request Support:**
   - Branches can submit support requests, specifying the nature of the issue they're facing.
- **Track Requests:**
   - View the status of their support requests, including assignment details and resolution status.
- **View Assigned IT Officer:**
   - Identify the assigned IT Officer for each request.
- **View Fixed Requests:**
   - Access a separate section to see already fixed requests.

### For IT Officers
- **Assigned Requests:**
   - IT Officers can view and manage the support requests assigned to them.
- **Resolve Requests:**
   - Mark requests as resolved once the issue is fixed.
- **Unmark Requests:**
   - Officers can unmark resolved requests within a 45-minute time frame.

### For IT Managers
- **Manage Requests:**
   - View and manage all support requests for every branch.
   - Assign IT Officers to specific requests and change assignments within a 30-minute window.
- **User Management:**
   - Create, edit, and delete IT Officer accounts.
   - Add additional IT Managers with a unique passcode.
- **Branch Management:**
   - Add, edit, and delete branches.

## Technologies Used
- **Frontend:**
   - React Library
   - Tailwind CSS for styling
   - Material Icons
   - React-Bootstrap
   - Redux for state management

- **Backend:**
   - ExpressJS framework
   - MongoDB for the database

### Installation
1. Clone the repository.


git clone https://github.com/Dagi07/Bank-IT-Support-Management-System.git
2. Install dependencies for the frontend.


cd bank-it-support-management-system/frontend
npm install
3. Install dependencies for the backend.


cd ../backend
npm install
4. Configure MongoDB connection in the backend. Update the .env file with your MongoDB URI.

5. Start the frontend and backend servers.


# In frontend directory
npm start

# In backend directory
npm start
### Usage
   - Access the application at http://localhost:5173 in your browser.
   - Login with your credentials (branch, IT Officer, or IT Manager) to start using the system.
### Contributing
   - If you would like to contribute to the project, contact me.
### License
This project is licensed under the MIT License.

### Acknowledgments
   - Special thanks to the contributors and users who have provided valuable feedback and support.
