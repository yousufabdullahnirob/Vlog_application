import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createPost, getPost, updatePost } from "../api";
import toast from "react-hot-toast";

const PostForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        is_published: true
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPost = async () => {
            try {
                const { data } = await getPost(id);
                setFormData({
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    is_published: data.is_published
                });
            } catch {
                toast.error("Failed to load post data.");
            }
        };

        if (isEdit) {
            loadPost();
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Simple slug generation if empty
        if (!formData.slug) {
            formData.slug = formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }

        try {
            if (isEdit) {
                await updatePost(id, formData);
                toast.success("Post updated successfully!");
            } else {
                await createPost(formData);
                toast.success("Post created successfully!");
            }
            navigate("/");
        } catch (err) {
            console.error(err);
            toast.error("Failed to save post. Ensure you are authorized.");
            setError("Failed to save post.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Cancel
            </Link>
            
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-10">
                <h2 className="text-3xl font-bold text-slate-800 mb-8 pb-4 border-b border-slate-100">
                    {isEdit ? "Edit Post" : "Create New Post"}
                </h2>
                
                {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title} 
                            onChange={handleChange} 
                            required 
                            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-400"
                            placeholder="Enter an engaging title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Slug (URL)</label>
                        <input 
                            type="text" 
                            name="slug" 
                            value={formData.slug} 
                            onChange={handleChange} 
                            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-400 bg-slate-50"
                            placeholder="auto-generated-from-title"
                        />
                        <p className="text-xs text-slate-400 mt-1">Leave empty to auto-generate from title.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Content</label>
                        <textarea 
                            name="content" 
                            value={formData.content} 
                            onChange={handleChange} 
                            required 
                            rows="8"
                            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-400 font-sans"
                            placeholder="Write your masterpiece here..."
                        />
                    </div>

                    <div className="flex items-center gap-3 py-2">
                        <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                            <input 
                                type="checkbox" 
                                name="is_published" 
                                id="is_published" 
                                checked={formData.is_published}
                                onChange={handleChange}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 checked:right-0 checked:border-blue-600 transition-all duration-300"
                                style={{ right: formData.is_published ? '0' : 'auto', left: formData.is_published ? 'auto' : '0' }} 
                            />
                            <label htmlFor="is_published" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${formData.is_published ? 'bg-blue-600' : 'bg-slate-300'} transition-colors duration-300`}></label>
                        </div>
                        <label htmlFor="is_published" className="text-sm font-medium text-slate-700 cursor-pointer">Publish immediately</label>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 px-6 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? "Saving..." : (isEdit ? "Update Post" : "Create Post")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostForm;
