Diploy Link : https://write-wave-gamma.vercel.app/

# 📝 WriteWave - Blog Application

WriteWave is a full-stack blog application where users can register, log in, create, edit, and delete posts. Users can also view and comment on others' posts. The application is built using **React.js, Node.js, Express.js, and MongoDB**.

## 🚀 Features

- User authentication (Register/Login/Logout)  
- Create, edit, and delete blog posts  
- View all blog posts  
- View individual blog posts with author details  
- Upload images for blog posts  
- Comment on posts (nested comments support)  
- Secure authentication using JWT  
- Responsive UI  

## 🛠️ Tech Stack

### Frontend:
- React.js (with Vite)
- React Router
- Context API
- Rich text editor (Quill)

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose for schema management)
- JWT Authentication
- Multer for image uploads
- Bcrypt for password hashing
- Cookie-based authentication

---

## 📂 Project Structure

### Frontend (`/frontend`)

/src   │── /components   │ ├── Header.jsx   │ ├── Layout.jsx   │ ├── Post.jsx   │ ├── Editor.jsx   │ ├── CreatePost.jsx   │ ├── EditPost.jsx   │ ├── PostPage.jsx   │ ├── Register.jsx   │ ├── LoginPage.jsx   │ ├── UserContext.jsx   │── App.jsx   │── main.jsx   │── index.css   │── package.json

### Backend (`/backend`)

/backend   │── /models   │ ├── user.js   │ ├── post.js   │ ├── comment.js   │── /routes   │ ├── commentRoutes.js   │── /uploads (Stores uploaded images)   │── index.js   │── .env   │── package.json  


## 🎯 Installation and Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/shivamgurjar07/WriteWave.git
cd writewave


2️⃣ Backend Setup

cd backend
npm install


Create a .env file in the /backend directory and add the following:

PORT=8080
JWT_SECRET=shivam

Start the backend server:

npm start
3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

🔗 API Endpoints
Authentication
Method	Endpoint	Description
POST	/register	Register a new user
POST	/login	Login user and receive JWT token
GET	/profile	Get current user profile
POST	/logout	Logout user
Blog Posts
Method	Endpoint	Description
POST	/post	Create a new post (requires authentication)
PUT	/post	Edit an existing post (requires authentication)
GET	/post	Get all posts
GET	/post/:id	Get a single post by ID
DELETE	/post/:id	Delete a post (requires authentication)
Comments
Method	Endpoint	Description
POST	/comments/:postId	Add a comment to a post
GET	/comments/:postId	Get comments for a post



🔥 Deployment
Backend:

The backend is deployed on Render/Vercel at:
```https://writewave-5o94.onrender.com```


Frontend:

The frontend is hosted on Vercel at:
```https://write-wave-gamma.vercel.app```


👤 Author
Shivam Gurjar
GitHub: shivamgurjar07
LinkedIn:  shivamgurjar07

📜 License
This project is MIT Licensed.