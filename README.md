# Restaurant POS System - Front-End Design


## Demo Video

https://github.com/user-attachments/assets/703564f6-f58c-4234-96cf-509e88d9cce9



## Project Overview
This repository contains the front-end design for a restaurant POS system and online ordering platform built using React Native. The application focuses on creating a simple and visually appealing order-taking interface, utilizing TailwindCSS for modern and responsive styling. The app allows users to take orders, view menu items, and handle transactions seamlessly.
## Features

- **Menu Navigation**: Browse categories and select menu items.
- **Cart Management**: Add items to the cart, update quantities, and review the order.
- **Order Submission**: User can submit orders.
- **Responsive UI**: Ensures smooth performance on both iOS and Android devices.

## Tech Stack

- **React Native**: Mobile application framework for building cross-platform apps.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **External API**: Using external API for fetching menu items.

## Installation & Setup

1. **Clone and Navigate**:
   
   Open a terminal and run the following command to clone the repository to your local machine:
   
   ```bash
   git clone https://github.com/Pawank06/pos-assignment.git
   ```
   Navigate to the directory
   
   ```bash
   cd pos-assignment
   ```
   
2. **Install dependencies and run the app**:
   
   Open terminal and run the command
   
   ```bash
   npm install
   ```

   Run the app

   ```bash
   npm start
   ```

3. **Install expo app and scan the QR using your mobile**:

![qr](https://github.com/user-attachments/assets/bfc06eaf-ca4c-42ca-b605-c529332fdac0)


4. **Using API key**:

   ```bash
   cb6f1bb487f942b58e78017cc89c209e
   ```
   Copy and paste the above api key in app/index.tsx
   
  ![api](https://github.com/user-attachments/assets/9ca088fc-c045-4f09-988d-da35fd48ec3d)


---

## Design Choices for POS System Frontend

### 1. Dark Mode
- The app uses a dark background with bright buttons to make it easy on the eyes. It also gives the app a modern and professional look.

### 2. Order List with Status
- The order list shows the customer’s name, table number, and how many items they ordered. Color-coded labels like "Ready to Serve" (green) and "Waiting" (yellow) help staff quickly see the order status.

### 3. Easy Menu Navigation
- There are tabs for **Food** and **Snack** at the top, making it simple to switch between categories. This design is user-friendly and fits well with the dark theme.

### 4. Clear Menu Cards
- Each menu item shows a picture, name, calories, rating, and price. The "Add" button is easy to find and use, so staff can quickly add items to the cart.

### 5. Action Bar at the Bottom
- A green button at the bottom shows the total price and allows users to "Proceed Transaction." This makes it easy to complete the order no matter where they are on the page.

---

## Notable Implementations

- **State Management**: Managed the cart and menu item selections using the Context API.
- **External API Integration**: Used an external API to provide endpoints for retrieving menu items.
- **Performance Optimization**: Ensured smooth user interactions and minimized load times.
