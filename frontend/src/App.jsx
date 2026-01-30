import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import PostForm from "./components/PostForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ACCESS_TOKEN } from "./constants";

// ProtectedRoute Wrapper:
// This component checks if an ACCESS_TOKEN exists in localStorage.
// If the token is found, it renders the child component (the protected page).
// If not, it redirects the user to the Login page.
// This is a common pattern for securing routes in React.
function ProtectedRoute({ children }) {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return token ? children : <Navigate to="/login" />;
}

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PostList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route 
                    path="/create" 
                    element={
                        <ProtectedRoute>
                            <PostForm />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/edit/:id" 
                    element={
                        <ProtectedRoute>
                            <PostForm />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
  const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN);

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
        {/* Sticky Glass Navbar */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
                <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                    My Amazing Blog
                </Link>
                <div className="flex gap-4 items-center">
                    {!isAuthenticated ? (
                         <div className="space-x-4">
                             <Link to="/login" className="text-slate-600 hover:text-blue-600 font-semibold transition-colors text-sm">Login</Link>
                             <Link to="/register" className="px-5 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 font-bold shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 text-sm">Get Started</Link>
                         </div>
                    ) : (
                         <button 
                           onClick={() => {
                             localStorage.clear();
                             window.location.href = '/login';
                           }}
                           className="text-slate-500 hover:text-red-600 font-medium transition-colors text-sm"
                         >
                           Logout
                         </button>
                    )}
                </div>
            </div>
        </header>

        <Toaster position="bottom-right" reverseOrder={false} />

        {/* Main Content Area */}
        <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
            <AnimatedRoutes />
        </main>

        <footer className="bg-white border-t border-slate-100 py-8 text-center text-slate-400 text-sm">
            <div className="max-w-6xl mx-auto px-4">
                <p>&copy; {new Date().getFullYear()} My Amazing Blog. Crafted with ❤️ and React.</p>
            </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
