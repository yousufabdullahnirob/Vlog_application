import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPost, deletePost } from "../api";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const { data } = await getPost(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    loadPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        navigate("/");
      } catch (error) {
         console.error("Delete error:", error);
         alert("Failed to delete post. You might need to be logged in.");
      }
    }
  };

  if (!post) {
      return (
          <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
      );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Home
      </Link>
      
      <article className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12">
          <header className="mb-8 border-b border-slate-100 pb-8">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                Article
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">{post.title}</h1>
              <div className="flex items-center text-slate-500 text-sm">
                  <span className="font-medium text-slate-700">{post.author?.username || "Admin"}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
          </header>

          <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-100 flex gap-4">
            <Link to={`/edit/${post.id}`} className="px-6 py-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 font-medium transition-colors">
              Edit Post
            </Link>
            <button onClick={handleDelete} className="px-6 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition-colors">
              Delete Post
            </button>
          </div>
      </article>
    </div>
  );
};

export default PostDetail;
