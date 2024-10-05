# Employee Management System

## Overview

This Employee Management System is a comprehensive web application built with React and Vite. It provides a robust platform for managing various aspects of employee data, performance, and organizational structure.

## Features

- **Multi-Role Access**: Supports different user roles including Employee, Manager, HR, Admin, and Owner.
- **Dashboard**: Customized dashboards for different user roles.
- **Employee Management**: Add and manage employee information.
- **Attendance Tracking**: Manage and monitor employee attendance.
- **Leave Management**: Handle leave requests and approvals.
- **Performance Management**: View and manage employee performance.
- **Salary Management**: Manage employee salaries and payroll.
- **Document Management**: Upload and manage employee documents.
- **Reporting**: Generate and view various reports including team performance and financial overviews.
- **User Role Management**: Manage user roles and permissions.

## Tech Stack

- React
- Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- Radix UI
- React Hook Form
- Zod
- Recharts
- Framer Motion
- jsPDF

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/employee-management-system.git
   cd employee-management-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add necessary environment variables:
   ```
   VITE_API_URL=your_api_url_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser to view the application.

## Building for Production

To create a production build, run:

```
npm run build
```

This will generate a `dist` folder with the production-ready files.

## Deployment

This project is configured for easy deployment on Vercel. To deploy:

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Run the deployment command:
   ```
   vercel
   ```

3. Follow the prompts to complete the deployment.

## Project Structure

- `src/`: Source files
  - `components/`: Reusable React components
  - `pages/`: Page components for different routes
  - `store/`: Redux store setup and slices
  - `hooks/`: Custom React hooks
  - `utils/`: Utility functions
  - `styles/`: Global styles and Tailwind CSS configuration
- `public/`: Static assets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.