# Cash Here

Cash Here is a modern Point of Sale (POS) and Cashier Management system built with React and Vite. It provides a comprehensive solution for managing products, categories, cashiers, and sales transactions.

## 🚀 Features

-   **User Authentication**: Secure login, account verification, and password reset functionality.
-   **Dashboard**: A central hub for monitoring activities (`/home`).
-   **Product Management**: Create, update, and organize products.
-   **Category Management**: Manage product categories for better organization.
-   **Cashier Management**: Administer cashier accounts and roles.
-   **Profile Management**: Update user profile settings.
-   **Security**: Protected routes ensure only authenticated users access the system.

## 🛠️ Tech Stack

This project uses a robust stack of modern web technologies:

-   **Frontend Framework**: [React](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Chakra UI](https://chakra-ui.com/) & [Emotion](https://emotion.sh/)
-   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [React Redux](https://react-redux.js.org/)
-   **Routing**: [React Router DOM](https://reactrouter.com/) (v7)
-   **Form Handling**: [Formik](https://formik.org/)
-   **Validation**: [Yup](https://github.com/jquense/yup)
-   **HTTP Client**: [Axios](https://axios-http.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## 📦 Getting Started

### Prerequisites

Ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (v16+ recommended)
-   [npm](https://www.npmjs.com/) or [Bun](https://bun.sh/)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Hafizh24/cash-here.git
    cd cash-here
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    bun install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory (you can use `.env.example` as a reference if available) and configure your environment variables.

### Running the Application

-   **Start Development Server**
    ```bash
    npm run dev
    ```
    The app will run at `http://localhost:5173` (default).

-   **Build for Production**
    ```bash
    npm run build
    ```

-   **Preview Production Build**
    ```bash
    npm run preview
    ```

-   **Lint Code**
    ```bash
    npm run lint
    ```

## 📂 Project Structure

```
src/
├── api/            # API service calls
├── assets/         # Static assets (images, etc.)
├── components/     # Reusable UI components
├── context/        # React Context (AuthContext, etc.)
├── lib/            # Utility libraries
├── pages/          # Application pages (Home, Login, Product, etc.)
├── redux/          # Redux slices and store configuration
├── App.jsx         # Main application component and routing
└── main.jsx        # Entry point
```

## 📄 License

This project is licensed under the MIT License.
