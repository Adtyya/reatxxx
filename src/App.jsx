import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { LoginContext } from "./ctx/context";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  let token;
  const { login, setLogin } = useContext(LoginContext);

  console.log(login);

  const handleInputChange = (event) => {
    const val = event.target;
    setCredentials((prev) => ({
      ...prev,
      [val.name]: val.value,
    }));
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const post = await axios.post(
      `https://dev-be.trijagabaya.co.id/api/login?adminpetugasusername=${credentials.email}&password=${credentials.password}`,
      credentials
    );
    const res = post.status;
    if (res === 200) {
      const userLogin = post.data;
      setLogin(userLogin);
      localStorage.setItem("accessToken", post.data?.access_token);
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/dashboard");
    }
    return;
  }, [token]);

  return (
    <div className="w-full h-screen bg-gray-300 flex flex-col items-center justify-center">
      <div className="w-1/4 h-max p-4 bg-white rounded shadow-md">
        <form onSubmit={handleSubmitForm}>
          <h1 className="text-2xl font-medium">Login</h1>
          <div className="py-3">
            <label htmlFor="email" className="block text-md mb-2">
              Email
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="yourname@mail.com"
              name="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="py-3">
            <label htmlFor="password" className="block text-md mb-2">
              Password
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
              name="password"
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 px-5 py-1 rounded text-white mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
