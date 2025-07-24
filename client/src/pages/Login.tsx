
import { useState } from "react";
import { Tab } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [ldapUser, setLdapUser] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = () => {
    // TODO: Add login API
  };

  const handleLdapLogin = () => {
    // TODO: Add LDAP login API
  };

  const handleSSOLogin = () => {
    window.location.href = "https://your-backend.com/auth/google";
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="hidden md:flex flex-col justify-center items-center bg-indigo-600 w-1/2 text-white px-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to PeopleForge</h1>
        <p className="text-lg opacity-80">Your AI-powered HR suite</p>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <Tab.Group>
          <Tab.List className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
            {["Email Login", "LDAP Login", "SSO Login"].map((tab, idx) => (
              <Tab
                key={idx}
                className={({ selected }) =>
                  `w-full py-2.5 text-sm font-medium leading-5 rounded-lg ${
                    selected
                      ? "bg-white shadow text-indigo-600"
                      : "text-gray-500 hover:bg-white hover:shadow"
                  }`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-4">
            <Tab.Panel>
              <input
                type="email"
                placeholder="Email"
                className="input-field"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn-primary" onClick={handleEmailLogin}>
                Login
              </button>
            </Tab.Panel>

            <Tab.Panel>
              <input
                type="text"
                placeholder="LDAP Username"
                className="input-field"
                onChange={(e) => setLdapUser(e.target.value)}
              />
              <input
                type="password"
                placeholder="LDAP Password"
                className="input-field"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn-primary" onClick={handleLdapLogin}>
                Login with LDAP
              </button>
            </Tab.Panel>

            <Tab.Panel>
              <button className="btn-primary" onClick={handleSSOLogin}>
                Sign in with Google
              </button>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        <div className="mt-6 text-sm">
          First time here?{" "}
          <button
            className="text-indigo-600 underline"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
