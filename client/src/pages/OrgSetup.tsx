
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function OrgSetup() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    orgName: "",
    orgType: "",
    industry: "",
    size: "",
    region: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Form submitted with:', formData);
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const payload = {
      name: formData.orgName,
      org_type: formData.orgType,
      industry: formData.industry,
      org_size: formData.size,
      description: formData.region, // You can map region to description or add a new field in backend
      website: "",
      logo_url: "",
    };

    try {
      console.log('Submitting org setup:', payload);
      const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiBase}/api/org/setup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      console.log('Org setup response:', response);
      if (response.ok) {
        const orgData = await response.json();
        localStorage.setItem('organization', JSON.stringify(orgData));
        navigate('/dashboard');
      } else {
        const data = await response.json();
        alert(data.detail || 'Error');
        console.error('Org setup error:', data);
      }
    } catch (error) {
      alert('Network error');
      console.error('Setup failed:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Setup Your Organization</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="orgName" placeholder="Organization Name" className="w-full p-2 border rounded-md" onChange={handleChange} required />

        <select name="orgType" className="w-full p-2 border rounded-md" onChange={handleChange} required>
          <option value="">Select Organization Type</option>
          <option value="Private">Private</option>
          <option value="Public">Public</option>
          <option value="Non-profit">Non-profit</option>
          <option value="Government">Government</option>
        </select>

        <select name="industry" className="w-full p-2 border rounded-md" onChange={handleChange} required>
          <option value="">Select Industry</option>
          <option value="IT">IT</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Finance">Finance</option>
        </select>

        <select name="size" className="w-full p-2 border rounded-md" onChange={handleChange} required>
          <option value="">Select Company Size</option>
          <option value="1-10">1-10</option>
          <option value="11-50">11-50</option>
          <option value="51-200">51-200</option>
          <option value="201+">201+</option>
        </select>

        <input name="region" placeholder="Region / Country" className="w-full p-2 border rounded-md" onChange={handleChange} required />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Continue
        </button>
      </form>
    </div>
  );
}
