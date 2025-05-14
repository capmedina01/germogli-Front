import React, { useEffect } from "react";
import { useCommunity } from "../context/CommunityContext";

import { HomeComunity } from "./HomeComunity";
import { Forum } from "./Forum";
import { GroupDetail } from "./GroupDetail";

export const Groups = ({ onViewDetail }) => {
  const { groups, loadingGroups, joinGroup, fetchAllGroups } = useCommunity();

  // Cargar los grupos al montar el componente
  useEffect(() => {
    fetchAllGroups();
  }, []);

  const toggleJoin = async (id, isJoined) => {
    try {
      await joinGroup(id);
    } catch (error) {
      console.error("Error al unirse/abandonar grupo:", error);
    }
  };

  if (loadingGroups) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Cargando grupos...</p>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">No hay grupos disponibles</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Grupos de Interés</h1>
      <div className="space-y-4">
        {groups.map((group) => (
          <div
            key={group.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div
              className="cursor-pointer hover:text-primary"
              onClick={() => onViewDetail(group.id)} // Cambiar a la vista de detalle del grupo
            >
              {group.name}
            </div>
            <button
              onClick={() => toggleJoin(group.id, group.joined)}
              className={`px-4 py-1 rounded text-white ${
                group.joined ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {group.joined ? "Salir" : "Unirse"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AppContent = ({
  activeContent,
  posts,
  loadingPosts,
  handleViewGroupDetail,
  selectedGroupId,
  setActiveContent,
}) => {
  const { groups, loadingGroups } = useCommunity();

  const renderContent = () => {
    switch (activeContent) {
      case "content1":
        return <HomeComunity posts={posts} loading={loadingPosts} />;
      case "forum":
        return <Forum posts={posts} loading={loadingPosts} />;
      case "groups":
        return (
          <Groups
            onViewDetail={handleViewGroupDetail} // Función para manejar el detalle del grupo
          />
        );
      case "groupDetail":
        return (
          <GroupDetail
            groupId={selectedGroupId}
            onBack={() => setActiveContent("groups")} // Volver a la vista de grupos
          />
        );
      default:
        return <HomeComunity posts={posts} loading={loadingPosts} />;
    }
  };

  return <div>{renderContent()}</div>;
};
