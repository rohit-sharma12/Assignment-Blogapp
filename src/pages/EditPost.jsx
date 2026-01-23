import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        imageURL: "",
        content: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    const validate = () => {
        const newErrors = {};

        if (!form.title || form.title.length < 5 || form.title.length > 120) {
            newErrors.title = "Title must be 5–120 characters";
        }

        if (!form.content || form.content.length < 50) {
            newErrors.content = "Content must be at least 50 characters";
        }

        if (
            form.imageURL &&
            !/^https?:\/\/.+\..+/.test(form.imageURL)
        ) {
            newErrors.imageURL = "Enter a valid image URL";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const fetchPost = async () => {
        try {
            const res = await api.get(`/posts/get/${id}`); setForm({
                title: res.data.title,
                imageURL: res.data.imageURL || "",
                content: res.data.content,
            });
        } catch (error) {
            alert("You are not allowed to edit this post");
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await api.put(`/posts/update/${id}`, form);
            navigate(`/posts/${id}`);
        } catch (error) {
            alert(error.response?.data?.message || "Update failed");
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading post...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Edit Post
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Title
                        </label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Image URL
                        </label>
                        <input
                            name="imageURL"
                            value={form.imageURL}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.imageURL && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.imageURL}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Content
                        </label>
                        <textarea
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            rows="6"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.content}
                            </p>
                        )}
                    </div>

                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                        Update Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditPost;
