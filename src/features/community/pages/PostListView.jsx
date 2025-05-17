import React, { useEffect, useState } from "react";
import { PostCard } from "../ui/PostCard";
import { SearchBar } from "../ui/SearchBar";
import { PostFormModal } from "../ui/PostFormModal";
import { communityService } from "../services/communityService";

export const PostListView = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    communityService
      .getAllPosts()
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
          setFilteredPosts(data);
        } else {
          console.error("La API no devolvió un array:", data);
          setPosts([]);
          setFilteredPosts([]);
        }
      })
      .catch((error) => {
        console.error("Error al obtener publicaciones:", error);
        setPosts([]);
        setFilteredPosts([]);
      });
  }, []);

  const handleSearch = (query) => {
    const filtered = posts.filter(
      (post) =>
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.user_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
    setFilteredPosts([newPost, ...filteredPosts]);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <SearchBar onSearch={handleSearch} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Crear Nuevo Post
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {Array.isArray(filteredPosts) && filteredPosts.map((post) => (
          <PostCard key={post.post_id} post={post} />
        ))}
      </div>

      {isModalOpen && (
        <PostFormModal
          onClose={() => setIsModalOpen(false)}
          onPostCreated={handlePostCreated}
        />
      )}
    </div>
  );
};