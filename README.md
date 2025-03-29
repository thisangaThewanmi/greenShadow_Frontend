# **GreenShadow Crop Management System** 🌱🚜  

GreenShadow is a comprehensive farm management system designed to streamline agricultural operations. It enables farm managers to efficiently oversee fields, crops, staff, vehicles, equipment, and observation logs. With a secure backend and an intuitive frontend, GreenShadow enhances productivity and decision-making.  

## 🌿 **Key Features:**  
- **Field & Crop Management** – Seamlessly add, update, and monitor crops across multiple fields.  
- **Staff & Equipment Tracking** – Assign tasks, track staff activities, and monitor equipment usage.  
- **Role-based Access Control** – Define access levels for Managers, Admins, and Staff.  
- **Observation Logs** – Log and analyze field observations in real-time.  
- **Vehicle & Equipment Management** – Keep records of vehicle assignments and equipment usage.  

## 🔐 **Security & Authentication:**  
- **JWT Authentication** – Ensures secure user authentication and session management.  
- **Hashed Passwords** – User credentials are securely stored with hashing techniques.  

## ⚙️ **Tech Stack:**  
- **Frontend:**  
  - HTML5, CSS3, JavaScript  
  - **Bootstrap** for responsive UI  
- **Backend:**  
  - **Spring Boot** for API development  
  - **Hibernate** for ORM (Object-Relational Mapping)  
- **Database:**  
  - **MySQL** for structured data storage  
- **Authentication:**  
  - **JWT** for user authentication  

## 📋 **Setup Instructions:**  

### Prerequisites:  
- **JDK 17** or higher  
- **MySQL Server**  
- **Postman** (optional, for API testing)  

### Steps to Deploy:  

1. **Clone the Repositories:**  
   ```bash
   git clone https://github.com/yourusername/GreenShadow-Backend.git  
   git clone https://github.com/yourusername/GreenShadow-Frontend.git  
   ```  

2. **Configure the Database:**  
   Update the `application-dev.properties` file in the backend repository with your MySQL credentials:  
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/green_shadow_farm?createDatabaseIfNotExist=true  
   spring.datasource.username=your-username  
   spring.datasource.password=your-password  
   ```  

3. **Build and Run the Backend:**  
   ```bash
   mvn spring-boot:run  
   ```  

4. **Launch the Frontend:**  
   ```bash
   npm install  
   npm start  
   ```  

5. **Access the Application:**  
   - Frontend: [http://localhost:3000](http://localhost:63342)  
   - Backend API: [http://localhost:8080/api/v1/](http://localhost:5050/api/v1/)  

## 📊 **API Endpoints:**  

```plaintext
Register User: POST /auth/signup  
User Login: POST /auth/login  
Get Fields: GET /fields  
Add Field: POST /fields  
Update Field: PUT /fields/{fieldId}  
Delete Field: DELETE /fields/{fieldId}  
Get Crops: GET /crops  
Add Crop: POST /crops  
Update Crop: PUT /crops/{cropId}  
Delete Crop: DELETE /crops/{cropId}  
Get Observation Logs: GET /logs  
Add Observation Log: POST /logs  
Delete Observation Log: DELETE /logs/{logId}  
Get Vehicles: GET /vehicles  
Modify Vehicle: PUT /vehicles/{vehicleCode}  
Delete Vehicle: DELETE /vehicles/{vehicleCode}  
Get Equipment: GET /equipments  
Add Equipment: POST /equipments  
Delete Equipment: DELETE /equipments/{equipmentId}  
```  

## 🎨 **Screenshots:**  
(Add screenshots of the application here.)  

## 📜 **License:**  
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.  
