import { Link } from "react-router";

function Home() {
  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-white px-6">
      <div className="max-w-2xl text-center">
        
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 leading-tight mb-6">
          Write. Share. Inspire.
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 text-lg mb-10">
          A simple and distraction-free platform to publish your thoughts and connect with readers.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-800 font-medium hover:bg-gray-100 transition"
          >
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Home;