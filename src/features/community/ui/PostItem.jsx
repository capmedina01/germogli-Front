import React, { useContext } from "react";
import { MessageCircle, Heart, ThumbsUp } from "lucide-react";
import { useReaction } from "../hooks/useReaction";
import { AuthContext } from "../../authentication/context/AuthContext";

export const PostItem = ({ post }) => {
  const { toggleReaction, hasUserReacted, getReactionCounts } = useReaction();
  const { isAuthenticated } = useContext(AuthContext);

  // Formatear fecha
  const formatPostDate = (dateString) => {
    if (!dateString) return "Fecha desconocida";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return "Ahora mismo";
    if (diffMins < 60) return `Hace ${diffMins} minutos`;
    if (diffHours < 24) return `Hace ${diffHours} horas`;
    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Ayer";
    
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Obtener conteo de reacciones si es un post del contexto (con postId)
  const reactionCounts = post.id ? getReactionCounts(post.id) : { LIKE: post.likes || 0 };

  // Manejar clic en reacción
  const handleReaction = () => {
    if (isAuthenticated && post.id) {
      toggleReaction(post.id, 'LIKE');
    }
  };

  return (
    <div className="border-b border-gray-200 p-4">
      {post.hasImage && post.imageType === "header" && (
        <div className="mb-3">
          <img
            src={post.imageUrl || post.multimediaContent || "/api/placeholder/800/200"}
            alt="Cultivo hidropónico"
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="flex items-start mb-2">
        <div className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
          <MessageCircle size={16} />
        </div>
        <div>
          <div className="font-medium text-sm">{post.author || post.user?.username || "Usuario"}</div>
          <div className="text-gray-500 text-xs">{post.time || formatPostDate(post.createdAt)}</div>
        </div>
      </div>

      <div className="ml-10">
        <p className="text-sm whitespace-pre-line mb-2">{post.content}</p>

        {post.hasImage && post.imageType === "dual" && (
          <div className="grid grid-cols-2 gap-2 mb-2">
            <img
              src={post.imageUrl || "/api/placeholder/400/300"}
              alt="Cultivo hidropónico"
              className="w-full h-24 object-cover rounded-lg"
            />
            <img
              src={post.imageUrl || "/api/placeholder/400/300"}
              alt="Cultivo tradicional"
              className="w-full h-24 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="flex items-center text-sm mt-1">
          <div className="flex items-center mr-4">
            <button 
              onClick={handleReaction}
              className="flex items-center focus:outline-none"
              disabled={!isAuthenticated}
            >
              <Heart
                size={14}
                className={`${post.id && hasUserReacted(post.id, 'LIKE') ? 'text-red-500 fill-current' : 'text-red-500'} mr-1`}
              />
              <span className="text-xs text-gray-600">{reactionCounts.LIKE || 0}</span>
            </button>
          </div>

          {(post.comments || (post.id && post._count?.messages > 0)) && (
            <div className="flex items-center">
              <ThumbsUp size={14} className="text-blue-500 mr-1" />
              <span className="text-xs text-gray-600">
                {post.comments || (post._count?.messages || 0)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};