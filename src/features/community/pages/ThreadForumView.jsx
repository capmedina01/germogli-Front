import React, { useState, useEffect } from "react";
import { FaUserCircle, FaSearch, FaPlus } from "react-icons/fa";
import { ThreadFormModal } from "../ui/ThreadFormModal";

const exampleThreads = [
  {
    id: 1,
    authorName: "Santiago Ramirez",
    createdAt: "2024-04-27T13:09:00",
    title: "¿Qué sistema de hidroponía es mejor?",
    content:
      "¡Hola a todos! Estoy comenzando con hidroponía y quiero saber qué tipo de sistema es mejor para cultivos de lechuga. ¿Alguna recomendación?",
  },
];

export const ThreadForumView = () => {
  const [threads, setThreads] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Aquí iría el fetch real de los hilos. Si no hay, usa los de ejemplo.
    setThreads(exampleThreads);
  }, []);

  const filteredThreads = threads
    .filter((thread) =>
      thread.content.toLowerCase().includes(search.toLowerCase()) ||
      thread.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  const handleThreadCreated = (newThread) => {
    setThreads([newThread, ...threads]);
    setShowModal(false);
  };

  return (
    <div className="w-full px-0 sm:px-4 my-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-2 mb-5">
        <h1 className="text-2xl font-bold">Foro de discusion</h1>
        <button
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700"
          onClick={() => setShowModal(true)}
        >
          <FaPlus /> Crear hilo
        </button>
      </div>
      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        {/* Ordenar */}
        <div className="border rounded p-2 min-w-[180px]">
          <div className="mb-2 font-semibold text-gray-700 flex items-center justify-between cursor-pointer">
            <span>Ordenar y ver</span>
            <span className="text-xs">▼</span>
          </div>
          <div>
            <label className="flex items-center gap-2 cursor-pointer mb-1">
              <input
                type="radio"
                name="sort"
                checked={sortOption === "recent"}
                onChange={() => setSortOption("recent")}
              />
              <span className="text-sm">Activo recientemente</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sort"
                checked={sortOption === "date"}
                onChange={() => setSortOption("date")}
              />
              <span className="text-sm">Fecha de publicacion</span>
            </label>
          </div>
        </div>
        {/* Buscar */}
        <div className="flex-grow flex items-center gap-2">
          <input
            type="text"
            className="border rounded-full px-4 py-2 w-full focus:outline-none"
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="text-gray-600">
            <FaSearch />
          </button>
        </div>
      </div>
      {/* Lista de hilos */}
      <div>
        {filteredThreads.length === 0 ? (
          <div className="text-gray-400 text-center py-10">
            No hay hilos disponibles.
          </div>
        ) : (
          filteredThreads.map((thread) => (
            <div key={thread.id} className="mb-7">
              <div className="flex items-start gap-3">
                <FaUserCircle className="text-3xl text-gray-400 mt-1" />
                <div className="flex-1">
                  <div className="font-semibold">
                    {thread.authorName}{" "}
                    <span className="text-xs font-normal text-gray-600">
                      —{" "}
                      {new Date(thread.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                      ,{" "}
                      {new Date(thread.createdAt).toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="font-bold text-lg">{thread.title}</div>
                  <div className="mt-1 text-gray-800">{thread.content}</div>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-2 mb-2 flex items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="mx-2">
                  {new Date(thread.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>
            </div>
          ))
        )}
      </div>
      {showModal && (
        <ThreadFormModal onClose={() => setShowModal(false)} onThreadCreated={handleThreadCreated} />
      )}
    </div>
  );
};