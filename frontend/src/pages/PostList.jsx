import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { getPosts, deletePost } from "../api";
import { ACCESS_TOKEN } from "../constants";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";



import toast from "react-hot-toast";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN);

    const loadPosts = useCallback(async () => {
        try {
            const { data } = await getPosts();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
            toast.error("Failed to load posts.");
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line
        loadPosts();
    }, [loadPosts]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await deletePost(id);
                toast.success("Post deleted successfully!");
                loadPosts();
            } catch {
                toast.error("Failed to delete post.");
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <div className="font-sans">
            {/* Hero Section */}
            <section className="relative bg-slate-900 text-white rounded-3xl overflow-hidden mb-12 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90"></div>
                <div className="relative z-10 px-8 py-20 md:py-32 text-center max-w-4xl mx-auto">
                     <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
                     >
                        Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">Future</span> of Blogging
                     </motion.h1>
                     <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-lg md:text-xl text-indigo-100 mb-10 leading-relaxed max-w-2xl mx-auto"
                     >
                        Discover insightful stories, creative ideas, and the latest trends in technology and design. Join our community of thinkers.
                     </motion.p>
                     
                     {isAuthenticated && (
                         <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                         >
                            <Link 
                                to="/create" 
                                className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-slate-50 hover:shadow-xl transition-all transform hover:-translate-y-1"
                            >
                                Start Writing Now
                            </Link>
                         </motion.div>
                     )}
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 opacity-20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
            </section>

            <div className="flex justify-between items-baseline mb-8 border-b border-slate-200 pb-4">
                <h2 className="text-3xl font-bold text-slate-800">Latest Posts</h2>
                <span className="text-slate-500 text-sm font-medium">{posts.length} Articles</span>
            </div>

            {posts.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-slate-100">
                     <div className="text-6xl mb-4">✍️</div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">It's quiet here...</h3>
                    <p className="text-slate-500 text-lg mb-6">No posts found yet. Be the first to publish!</p>
                    {isAuthenticated && (
                         <Link to="/create" className="text-blue-600 font-semibold hover:underline">Create a Post &rarr;</Link>
                    )}
                </div>
            ) : (
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {posts.map((post) => (
                        <motion.div 
                            key={post.id} 
                            variants={itemVariants}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
                        >
                            <div className="p-8 flex-grow">
                                <span className="inline-flex items-center px-3 py-1 mb-4 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
                                    Article
                                </span>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-slate-600 text-base mb-6 line-clamp-3 leading-relaxed">
                                    {post.content.substring(0, 140)}...
                                </p>
                            </div>
                            
                            <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                                <Link to={`/posts/${post.id}`} className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center gap-1 group/link">
                                    Read Now 
                                    <span className="group-hover/link:translate-x-1 transition-transform">&rarr;</span>
                                </Link>
                                <div className="text-xs text-slate-400 font-medium">
                                    {new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </div>
                                {isAuthenticated && (
                                     <div className="flex gap-3">
                                        <Link to={`/edit/${post.id}`} className="text-amber-500 hover:text-amber-600" title="Edit">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                        </Link>
                                        <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:text-red-700" title="Delete">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                     </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default PostList;
