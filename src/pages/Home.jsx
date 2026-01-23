import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/posts?search=${search}&page=${page}&limit=6`);
            setPosts(res.data.posts || res.data);
        } catch (error) {
            console.error("Failed to fetch posts", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [search, page]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                        >
                            {post.imageURL && (
                                <img
                                    src={post.imageURL}
                                    alt={post.title}
                                    className="h-48 w-full object-cover"
                                />
                            )}

                            <div className="p-5">
                                <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                                    {post.title}
                                </h2>

                                <p className="text-sm text-gray-500 mb-3">
                                    By {post.username} •{" "}
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </p>

                                <Link
                                    to={`/posts/${post._id}`}
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center gap-4 mt-8">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                    Prev
                </button>

                <button
                    onClick={() => setPage((p) => p + 1)}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;
