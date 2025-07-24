import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "", org_id: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", form);
      localStorage.setItem("access_token", res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials or organization.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('/assets/login-bg.jpg')`, // You can replace this path
      }}
    >
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-4xl flex overflow-hidden">
        {/* Left Side - Branding */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 text-white p-10">
          <img
            src="/assets/company-logo.png" // ← Dynamic via config or CMS
            alt="Company Logo"
            className="w-32 h-32 object-contain mb-4"
          />
          <h1 className="text-3xl font-bold">Welcome to AspireHR</h1>
          <p className="mt-2 text-center">
            Streamline HR, Payroll, and Leave Management in one place.
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Sign In</h2>
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600">Organization ID</label>
              <input
                type="text"
                name="org_id"
                value={form.org_id}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
