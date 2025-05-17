import React, { useState } from "react";
import { communityService } from "../services/communityService";

export const PostFormModal = ({ onClose, onPostCreated }) => {
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState("general");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Verificar que el archivo sea una imagen y no supere 1 MB
      if (!file.type.startsWith("image/")) {
        setError("El archivo debe ser una imagen.");
        setImageFile(null);
        return;
      }
      if (file.size > 1024 * 1024) {
        setError("La imagen no debe pesar más de 1 MB.");
        setImageFile(null);
        return;
      }

      setError(""); // Limpiar errores previos
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un FormData para manejar la imagen y otros datos
    const formData = new FormData();
    formData.append("content", content);
    formData.append("post_type", postType);
    formData.append("user_id", 1); // Cambiar al ID del usuario autenticado
    if (imageFile) {
      formData.append("multimedia_content", imageFile);
    }

    try {
      const createdPost = await communityService.createPost(formData);
      onPostCreated(createdPost);
      onClose();
    } catch (error) {
      console.error("Error al crear el post:", error);
      setError("Hubo un problema al crear el post. Intenta nuevamente.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Crear Nuevo Post</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Contenido
            </label>
            <textarea
              className="w-full border rounded-md p-2 mt-1 text-sm"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Post
            </label>
            <select
              className="w-full border rounded-md p-2 mt-1 text-sm"
              value={postType}
              onChange={(e) => setPostType(e.target.value)}
            >
              <option value="general">General</option>
              <option value="thread">Hilo</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Imagen (opcional, máximo 1 MB)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-1 text-sm"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-green-600"
              disabled={!!error} // Deshabilitar si hay un error
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};