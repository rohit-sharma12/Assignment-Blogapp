import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPost = async () => {
        try {
            const res = await api.get(`/posts/get/${id}`);
            setPost(res.data);
        } catch (error) {
            console.error("Error fetching post", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    if (loading) {
        return <p className="text-center mt-10">Loading post...</p>;
    }

    if (!post) {
        return <p className="text-center mt-10">Post not found</p>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <Link
                to="/"
                className="text-blue-600 hover:underline text-sm mb-4 inline-block"
            >
                 Back to Home
            </Link>

            {post.imageURL && (
                <img
                    src={post.imageURL}
                    alt={post.title}
                    className="w-full h-72 object-cover rounded-xl mb-6"
                />
            )}

            <h1 className="text-3xl font-bold mb-3">
                {post.title}
            </h1>

            <p className="text-gray-500 text-sm mb-6">
                By <span className="font-medium">{post.username}</span> •{" "}
                {new Date(post.createdAt).toLocaleDateString()}
            </p>

            <div className="prose max-w-none">
                <p className="whitespace-pre-line leading-7 text-gray-800">
                    {post.content}
                </p>
            </div>
        </div>
    );
};

export default PostDetail;
