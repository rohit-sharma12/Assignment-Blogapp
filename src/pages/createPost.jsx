import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreatePost = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        imageURL: "",
        content: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setLoading(true);
            await api.post("/posts/create", form);
            navigate("/");
        } catch (error) {
            console.error("Create post error", error);
            alert(error.response?.data?.message || "Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Create New Post
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
                            placeholder="Enter blog title"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Image URL (optional)
                        </label>
                        <input
                            name="imageURL"
                            value={form.imageURL}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="https://example.com/image.jpg"
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
                            placeholder="Write your blog content..."
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.content}
                            </p>
                        )}
                    </div>
                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Publishing..." : "Publish Post"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
