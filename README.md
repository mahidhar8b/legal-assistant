# ⚖️ Legal Assistant System

An AI-powered web-based Legal Assistant System that provides users with legal assistance, lawyer discovery, and machine-learning-based case outcome prediction.

## 📌 Project Overview

The Legal Assistant System is a full-stack web application developed to provide users with a centralized platform for accessing legal-related services.

The system allows users to register and log in securely, explore lawyer information, provide case details, and obtain a possible case outcome prediction using a machine-learning model.

The application follows a modular architecture consisting of a React frontend, Spring Boot backend, MySQL database, and a Python-based machine-learning service using FastAPI.

> **Disclaimer:** The case prediction feature is intended only for informational and educational purposes. It does not provide guaranteed legal outcomes or replace professional legal advice.

---

## 🚀 Features

### 👤 User Management
- User registration and login
- Secure password hashing
- JWT-based authentication
- Protected application features

### ⚖️ Lawyer Discovery
- View available lawyer profiles
- Search/browse lawyer information
- View lawyer specialization and other profile details

### 🤖 AI-Based Case Prediction
- Enter relevant case information
- Process case details through the ML service
- Predict a possible case outcome
- Display the model's confidence percentage

### 🔐 Security
- JWT authentication
- BCrypt password hashing
- Protected backend APIs
- Role-based access where applicable

### 🗄️ Database Management
- Store user information
- Store lawyer information
- Manage application-related data using MySQL

---

## 🧠 Machine Learning

The project uses **Random Forest Classification** for case outcome prediction.

### ML Workflow

```text
Case Details
     ↓
Data Preprocessing
     ↓
Random Forest Classifier
     ↓
Multiple Decision Trees
     ↓
Final Classification
     ↓
Prediction + Confidence
