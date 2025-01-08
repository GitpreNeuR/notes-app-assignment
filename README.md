# Notes App - Fullstack MERN Application

Welcome to the **Notes App**, a fullstack application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). This app allows users to create, edit, and delete notes seamlessly, with a clean and minimal design. It also includes user authentication with OTP verification for enhanced security.

---

## Features

- **User Authentication**: Secure user authentication with OTP verification.
- **Note Management**:
  - Create new notes.
  - Edit existing notes.
  - Delete notes.
- **Responsive Design**: A clean, minimal, and responsive design for a great user experience on all devices.
- **Environment Variables**: Uses `.env` for secure configuration.

---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens) and OTP verification
- **Styling**: CSS (or any preferred library like TailwindCSS)

---

## Prerequisites

Before running the app, ensure you have the following installed:

- Node.js (v16 or higher)
- MongoDB (or a MongoDB Atlas URI)
- Git

---

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/GitpreNeuR/notes-app-assignment.git
   cd notes-app-assignment
   ```

2. **Install Dependencies**:
   - For the server:
     ```bash
     npm install
     ```
   - For the client:
     ```bash
     cd client
     npm install
     cd ..
     ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   MONGODB_URI=your_mongodb_uri
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the Application**:
   - Start the server:
     ```bash
     nodemon start
     ```
   - Start the client:
     ```bash
     npm run dev
     ```

5. **Access the App**:
   Open your browser and navigate to `http://localhost:3000` to view the app.

---

## Folder Structure

```
notes-app-assignment/
    ├── client/
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── postcss.config.js
    │   ├── tailwind.config.js
    │   ├── vite.config.js
    │   ├── .env
    │   ├── .gitignore
    │   ├── public/
    │   └── src/
    │       ├── App.jsx
    │       ├── index.css
    │       ├── main.jsx
    │       ├── assets/
    │       ├── components/
    │       │   └── Note.jsx
    │       ├── layouts/
    │       │   ├── AuthLayout.jsx
    │       │   └── MainLayout.jsx
    │       ├── pages/
    │       │   ├── Home.jsx
    │       │   ├── LandingPage.jsx
    │       │   ├── SignIn.jsx
    │       │   └── SignUp.jsx
    │       └── store/
    │           ├── store.js
    │           └── slices/
    │               ├── authSlice.js
    │               └── notesSlice.js
    └── server/
        ├── package.json
        ├── server.js
        ├── .gitIgnore
        ├── controller/
        │   ├── auth-controller.js
        │   ├── note-controller.js
        │   └── otp-controller.js
        ├── middleware/
        │   └── auth-middleware.js
        ├── models/
        │   ├── Note.js
        │   ├── Otp.js
        │   └── User.js
        ├── routes/
        │   ├── auth-routes.js
        │   └── note-routes.js
        └── utils/
            ├── generate-token.js
            └── mailer.js

```

---

## Key Features in Detail

### 1. **User Authentication**
   - Users can sign up and log in using their email.
   - OTP verification is implemented for secure authentication.
   - JWT tokens are used for session management.

### 2. **Note Management**
   - **Create Notes**: Users can add new notes with a title and content.
   - **Edit Notes**: Existing notes can be updated.
   - **Delete Notes**: Notes can be permanently deleted.

### 3. **Responsive Design**
   - The app is designed to be fully responsive, ensuring a seamless experience on desktops, tablets, and mobile devices.

---

## Environment Variables

| Variable       | Description                          |
|----------------|--------------------------------------|
| `MONGODB_URI`  | MongoDB connection URI.              |
| `PORT`         | Port for the backend server.         |
| `JWT_SECRET`   | Secret key for JWT token generation. |

---

## Available Scripts

- **Start the server**:
  ```bash
  nodemon start
  ```
- **Start the client**:
  ```bash
  npm run dev
  ```

---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Thanks to the MERN stack community for providing excellent resources and tools.
- Special thanks to [GitpreNeuR](https://github.com/GitpreNeuR) for the project inspiration.

---

Enjoy using the **Notes App**! If you have any questions or feedback, feel free to open an issue or reach out. 😊
