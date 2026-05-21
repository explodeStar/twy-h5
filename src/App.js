import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  // Link,
} from "react-router-dom";
import "@/app.scss";
const Login = React.lazy(() => import("@/pages/Login"));
const Home = React.lazy(() => import("@/pages/Layout"));

export default function App() {
  return (
    <Router>
      <div className="app">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home/*" element={<Home />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
