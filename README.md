 
# Prism-Food-CVR
=======

# 🍽️ Prism Canteen Food Ordering System from CVR college (Rohit)

🚀 Live Demo: [Prism Canteen CVR](https://prism-canteen-cvr-rohit.vercel.app/)

## 📌 Overview
The **Prism Canteen Food Ordering System** is a web application that allows students to pre-order meals from the college canteen, eliminating long queues and wait times. The system streamlines food ordering, payment, and token collection.

## 🎯 Features
- 🔹 **User Authentication** (Login/Signup)
- 🔹 **Browse Menu & Add to Cart**
- 🔹 **Online Payments** Integration
- 🔹 **Order Tracking & Notifications**
- 🔹 **Admin Panel for Canteen Management**

## 🛠️ Tech Stack
### **Frontend:**
- React.js
- Tailwind CSS
- Vite
- Axios

### **Backend:**
- Node.js (Express.js)
- MongoDB (Mongoose)
- JWT Authentication

### **Deployment:**
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

## 📂 Project Structure
```
project/
│── client/  # Frontend (React.js)
│── server/  # Backend (Express.js)
│── .gitignore
│── package.json
│── README.md
```

## 🚀 Getting Started
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Rohit009s/Prism-Food-CVR.git
cd Prism-Food-CVR
```

### **2️⃣ Setup Backend**
```sh
cd server
npm install  # Install dependencies
npm start    # Start the backend server
```

### **3️⃣ Setup Frontend**
```sh
cd ../client
npm install  # Install dependencies
npm run dev  # Start the frontend
```

## 🔧 Environment Variables
Create a `.env` file inside `server/` and add:
```env
PORT=8080
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```

## 📜 API Endpoints
| Endpoint          | Method | Description                |
|------------------|--------|----------------------------|
| `/api/auth/login` | POST   | User Login                |
| `/api/auth/signup`| POST   | User Signup               |
| `/api/foods`      | GET    | Get All Food Items        |
| `/api/orders`     | POST   | Place an Order            |
| `/api/orders/:id` | GET    | Get Order Status          |

## 🎯 Contributors
👤 **Rohit Neelam**  
🚀 Developed as part of own project by considering the **CVR College of Engineering** .




