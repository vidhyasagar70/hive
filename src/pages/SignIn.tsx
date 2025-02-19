import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/signin.css";
import CarouselComponent from "../components/CarouselComponent";
import { signInUser } from "../services/authService";

import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await signInUser(formData.email, formData.password);

      if (response?.error) {
        setError(response.error);
      } else if (response?.token) {
        localStorage.setItem("authToken", response.token);
        navigate("/dashboard");
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="carousel-container">
        <CarouselComponent />
      </div>

      <div className="signin-form-container">
        <div className="signin-form">
          <h3>Sign In</h3>
          <p>Access the Admin panel using your email and password.</p>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 password-container">
              <label className="form-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'yes' : 'no'}
              </span>
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
