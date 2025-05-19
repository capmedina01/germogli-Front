import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHashtag } from "react-icons/fa";
import { communityService } from "../services/communityService";
import { ThreadList } from "../ui/ThreadList";

export const GroupDetailsView = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);

  // Datos de ejemplo para los hilos
  const exampleThreads = [
    {
      id: 1,
      authorName: "Santiago Ramirez",
      createdAt: "2024-04-27T13:09:00",
      content:
        "¡Hola a todos! Estoy comenzando con hidroponía y quiero saber qué tipo de sistema es mejor para cultivos de lechuga. ¿Alguna recomendación?",
    },
    {
      id: 2,
      authorName: "Yeiron Manyoma",
      createdAt: "2024-05-04T16:16:00",
      content:
        "Hola, Para lechugas, el sistema NFT (Nutrient Film Technique) es una excelente opción. Es eficiente y fácil de manejar.",
    },
    {
      id: 3,
      authorName: "Carlos Nael",
      createdAt: "2024-05-29T13:09:00",
      content:
        "¡Hola a todos! Estoy comenzando con hidroponía y quiero saber qué tipo de sistema es mejor para cultivos de lechuga. ¿Alguna recomendación?",
    },
  ];

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const data = await communityService.getGroupById(groupId);
        setGroup(data.data); // Ajusta según la respuesta real de tu API
      } catch (error) {
        setGroup(null);
      }
    };
    fetchGroupDetails();
  }, [groupId]);

  if (!group)
    return <p className="text-gray-500">Cargando detalles del grupo...</p>;

  return (
    <div className="max-w-3xl mx-auto my-8 p-4 bg-white rounded shadow">
      {/* Header con icono numeral y nombre */}
      <div className="flex items-center gap-2 mb-6">
        <FaHashtag className="text-2xl text-gray-700" />
        <h1 className="text-2xl font-bold">{group.name}</h1>
      </div>

      {/* Mensaje de bienvenida */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          ¡Te damos la bienvenida a <span className="text-primary"># {group.name}!</span>
        </h2>
        <p className="text-lg text-gray-800 mt-2">
          Un espacio para aprender, compartir experiencias sobre hidroponía.
        </p>
      </div>

      {/* Descripción y fecha */}
      <div className="mb-6">
        <div className="text-gray-700 mb-1">
          <strong>Descripción:</strong> {group.description}
        </div>
        <div className="text-gray-500 text-sm">
          <strong>Fecha de creación:</strong>{" "}
          {group.creationDate
            ? new Date(group.creationDate).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Sin fecha"}
        </div>
      </div>

      {/* Botón para unirse */}
      <div className="mb-8">
        <button
          className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700"
          onClick={() => alert("Funcionalidad para unirse al grupo")}
        >
          Unirse al grupo
        </button>
      </div>

      {/* Sección de hilos */}
      <div>
        <ThreadList threads={exampleThreads} />
      </div>
    </div>
  );
};

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { communityService } from "../services/communityService";

// export const GroupDetailsView = () => {
//   const { groupId } = useParams();
//   const [group, setGroup] = useState(null);
//   const [threadsCount, setThreadsCount] = useState(0);
//   const [postsCount, setPostsCount] = useState(0);

//   useEffect(() => {
//     const fetchGroupDetails = async () => {
//       try {
//         const data = await communityService.getGroupById(groupId);
//         console.log("Detalle del grupo recibido de la API:", data);
//         setGroup(data.data); // <-- ¡AQUÍ ESTÁ LA CLAVE!
//         // Si tienes los métodos para threads/posts, agrégalos aquí:
//         // const threadsRes = await communityService.getThreadsByGroupId(groupId);
//         // setThreadsCount(Array.isArray(threadsRes.data) ? threadsRes.data.length : 0);
//         // const postsRes = await communityService.getPostsByGroupId(groupId);
//         // setPostsCount(Array.isArray(postsRes.data) ? postsRes.data.length : 0);
//       } catch (error) {
//         setGroup(null);
//       }
//     };

//     fetchGroupDetails();
//   }, [groupId]);

//   if (!group)
//     return <p className="text-gray-500">Cargando detalles del grupo...</p>;

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-2">{group.name}</h2>
//       <p className="text-gray-600 mb-2">{group.description}</p>
//       <p className="text-sm text-gray-500 mb-2">
//         Fecha de creación:{" "}
//         {group.creationDate
//           ? new Date(group.creationDate).toLocaleDateString()
//           : "Sin fecha"}
//       </p>
//       <div className="flex gap-4 mb-4">
//         <span className="text-sm text-gray-700">
//           Hilos: <strong>{threadsCount}</strong>
//         </span>
//         <span className="text-sm text-gray-700">
//           Posts: <strong>{postsCount}</strong>
//         </span>
//       </div>
//       <div className="flex gap-2 mt-4">
//         <button
//           onClick={() => alert("Crear hilo (implementa aquí la lógica o el modal)")}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//         >
//           Crear Hilo
//         </button>
//         <button
//           onClick={() => alert("Crear post (implementa aquí la lógica o el modal)")}
//           className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//         >
//           Crear Post
//         </button>
//       </div>
//     </div>
//   );
// };