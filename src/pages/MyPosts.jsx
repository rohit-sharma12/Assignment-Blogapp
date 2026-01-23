import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyPosts = async () => {
        try {
            const res = await api.get("/posts/my-posts");
            setPosts(res.data);
        } catch (error) {
            console.error("Failed to fetch my posts", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyPosts();
    }, []);

    const handleDelete = async (id) => {
        const confirm = window.confirm(
            "Are you sure you want to delete this post?"
        );
        if (!confirm) return;

        try {
            await api.delete(`/posts/delete/${id}`);
            setPosts(posts.filter((post) => post._id !== id));
        } catch (error) {
            alert("Delete failed");
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">My Posts</h2>

            {posts.length === 0 ? (
                <p className="text-gray-500">You haven’t created any posts yet.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            className="bg-white rounded-xl shadow p-5 flex flex-col"
                        >
                            {post.imageURL && (
                                <img
                                    src={post.imageURL}
                                    alt={post.title}
                                    className="h-40 w-full object-cover rounded-lg mb-4"
                                />
                            )}

                            <h3 className="text-lg font-semibold mb-2">
                                {post.title}
                            </h3>

                            <p className="text-sm text-gray-500 mb-4">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </p>

                            <div className="mt-auto flex gap-3">
                                <Link
                                    to={`/edit/${post._id}`}
                                    className="flex-1 text-center py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => handleDelete(post._id)}
                                    className="flex-1 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyPosts;
