import React, { useEffect, useState } from "react";
import { PostCard } from "../ui/PostCard";
import { useCommunity } from "../context/CommunityContext";

export const GroupDetail = ({ groupId, onBack }) => {
  const { fetchGroupById, group, loadingGroups, createPost, groupPosts, fetchGroupPosts } =
    useCommunity();
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  // Cargar los detalles del grupo y las publicaciones al montar el componente
  useEffect(() => {
    fetchGroupById(groupId);
    fetchGroupPosts(groupId);
  }, [groupId]);

  const handlePost = async () => {
    if (!newPost.title || !newPost.content) return;
    try {
      await createPost(groupId, newPost); // Crear una nueva publicación en el grupo
      setNewPost({ title: "", content: "" });
      fetchGroupPosts(groupId); // Actualizar las publicaciones después de crear una nueva
    } catch (error) {
      console.error("Error al publicar:", error);
    }
  };

  if (loadingGroups) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Cargando detalles del grupo...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <button onClick={onBack} className="text-primary hover:underline">
        Volver a Grupos
      </button>
      <h1 className="text-2xl font-bold mb-4">{group?.name}</h1>
      <p className="mb-4">{group?.description}</p>

      {/* Formulario para crear una nueva publicación */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Título"
          className="w-full border p-2 rounded mb-2"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Contenido"
          className="w-full border p-2 rounded"
          value={newPost.content}
          onChange={(e) =>
            setNewPost({ ...newPost, content: e.target.value })
          }
        />
        <button
          className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
          onClick={handlePost}
        >
          Publicar
        </button>
      </div>

      {/* Lista de publicaciones del grupo */}
      <div className="space-y-4">
        {groupPosts.length > 0 ? (
          groupPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="text-gray-500">No hay publicaciones en este grupo.</p>
        )}
      </div>
    </div>
  );
};
