import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const Header = () => {
    const isLogin = useSelector((state) => state.isLogin);
    console.log("isLogin:", isLogin);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = () => {
        try {
            dispatch(authActions.logout());
            alert("Logout successfully")
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <header className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                <Link to="/" className="text-2xl font-bold text-blue-600">
                    BlogApp
                </Link>

                <nav className="flex items-center gap-6">

                    {isLogin ? (
                        <>
                            <Link to="/create" className="text-gray-700 hover:text-blue-600">
                                Create Post
                            </Link>

                            <Link to="/my-posts" className="text-gray-700 hover:text-blue-600">
                                My Posts
                            </Link>

                            <button onClick={handleLogout} className="px-4 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-700 hover:text-blue-600">
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="px-4 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Singup
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
