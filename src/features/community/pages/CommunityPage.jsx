import React, { useEffect, useState } from "react";
import { HomeComunity } from "../layouts/HomeComunity";
import { Header } from "../../../ui/layouts/Header";
import { useContent } from "../hooks/useContent";
import { BarIcons_layout } from "../layouts/BarIcons_layout";
import { Navbar_layout } from "../layouts/Navbar_layout";
import { Forum } from "../layouts/Forum";
import { Groups } from "../layouts/Groups";
import { GroupDetail } from "../layouts/GroupDetail";
import { Threads } from "../layouts/Threads";
import { useCommunity } from "../context/CommunityContext";

export const CommunityPage = () => {
  const { activeContent, setActiveContent } = useContent();
  // Usando el contexto de comunidad para obtener datos
  const { 
    fetchAllPosts, 
    fetchAllGroups, 
    fetchAllThreads,
    posts,
    groups,
    threads,
    loadingPosts,
    loadingGroups,
    loadingThreads
  } = useCommunity();
  
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedThreadId, setSelectedThreadId] = useState(null);

  // Cargar datos cuando se monta el componente
  useEffect(() => {
    fetchAllPosts();
    fetchAllGroups();
    fetchAllThreads();
  }, []);

  // Función para cambiar de vista a detalle de grupo
  const handleViewGroupDetail = (groupId) => {
    setSelectedGroupId(groupId);
    setActiveContent("groupDetail");
  };

  // Función para cambiar de vista a detalle de hilo
  const handleViewThreadDetail = (threadId) => {
    setSelectedThreadId(threadId);
    setActiveContent("threadDetail");
  };

  const renderContent = () => {
    switch (activeContent) {
      case "content1":
        return <HomeComunity posts={posts} loading={loadingPosts} />;
      case "forum":
        return <Forum posts={posts} loading={loadingPosts} />;
      case "groups":
        return <Groups 
          groups={groups} 
          loading={loadingGroups}
          onViewDetail={handleViewGroupDetail} 
        />;
      case "groupDetail":
        return <GroupDetail 
          groupId={selectedGroupId} 
          onBack={() => setActiveContent("groups")}
        />;
      case "threads":
        return <Threads 
          threads={threads} 
          loading={loadingThreads}
          onViewDetail={handleViewThreadDetail}
        />;
      default:
        return <HomeComunity posts={posts} loading={loadingPosts} />;
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
        {/* Sección 1: Barra con íconos */}
        <BarIcons_layout onSectionChange={setActiveContent} activeSection={activeContent} />
        {/* Sección 2: Navegación */}
        <Navbar_layout />
        {/* Sección 3: Contenido principal */}
        <div className="flex-1 p-4">
          {loadingPosts && loadingGroups && loadingThreads ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Cargando datos...</p>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    </>
  );
};
// import React from "react";
// import { HomeComunity } from "../layouts/HomeComunity";
// import { Forum } from "../layouts/Forum";
// import { Header } from "../../../ui/layouts/Header";

// import { useContent } from "../hooks/useContent";
// import { BarIcons_layout } from "../layouts/BarIcons_layout";
// import { Navbar_layout } from "../layouts/Navbar_layout";

// export const CommunityPage = () => {
//   const { activeContent } = useContent();

//   const renderContent = () => {
//     switch (activeContent) {
//       case "content1":
//         return <HomeComunity />;
//       case "content2":
//         return <Forum />;

//       default:
//         return <HomeComunity />;
//     }
//   };
//   return (
//     <>
//       <Header />
//       <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
//         {/* Sección 1: Barra con íconos */}
//         <BarIcons_layout />
//         {/* Sección 2: Navegación */}
//         <Navbar_layout />
//         {/* Sección 3: Contenido principal */}
//         <div className="flex-1 p-1">{renderContent()}</div>
//       </div>
//     </>
//   );
// };
