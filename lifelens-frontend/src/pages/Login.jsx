import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Navigating to signup...");
    navigate("/"); // simulate successful login or switch to signup
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#C2E9FB] to-[#A1C4FD]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-700">
          Don’t have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
