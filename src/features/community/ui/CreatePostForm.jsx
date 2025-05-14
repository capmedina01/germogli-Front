// src/features/community/ui/CreatePostForm.jsx
import React, { useState } from "react";
import { usePost } from "../hooks/usePost";

export const CreatePostForm = ({ onSuccess, onCancel }) => {
  const { formData, handleChange, handleCreatePost, formErrors, resetForm } = usePost();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar
    if (!title.trim() || !content.trim()) {
      return;
    }
    
    // Preparar datos
    formData.title = title;
    formData.content = content;
    formData.postType = "FORUM";
    
    try {
      // Enviar post
      const result = await handleCreatePost();
      
      // Resetear formulario
      setTitle("");
      setContent("");
      resetForm();
      
      // Notificar éxito
      if (onSuccess) onSuccess(result);
    } catch (error) {
      console.error("Error al crear post:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h2 className="text-lg font-semibold mb-2">
        Crear nueva publicación
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Título"
            className={`w-full p-2 border rounded ${formErrors.title ? 'border-red-500' : 'border-gray-300'}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {formErrors.title && (
            <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>
          )}
        </div>
        
        <div className="mb-3">
          <textarea
            placeholder="Contenido"
            className={`w-full p-2 border rounded ${formErrors.content ? 'border-red-500' : 'border-gray-300'}`}
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {formErrors.content && (
            <p className="text-red-500 text-xs mt-1">{formErrors.content}</p>
          )}
        </div>
        
        <div className="flex justify-end space-x-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
          )}
          
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
};