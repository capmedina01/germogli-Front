import React, { useState, useEffect } from "react";

// Simulación de grupos temporales
const exampleGroups = [
  { id: 1, name: "Cultivos orgánicos" },
  { id: 2, name: "Hidroponía en casa" },
];

export const ThreadFormModal = ({ onClose, onThreadCreated }) => {
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Simula fetch de grupos (en producción usa communityService.getAllGroups)
  useEffect(() => {
    setGroups(exampleGroups);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulamos el usuario logueado (ajusta según tu auth)
    const user_id = 1;
    const newThread = {
      id: Date.now(),
      group_id: parseInt(groupId),
      user_id,
      title,
      content,
      authorName: "Usuario Actual",
      createdAt: new Date().toISOString(),
    };
    onThreadCreated(newThread);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-4 text-xl text-gray-400 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Crear nuevo hilo</h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Título</label>
          <input
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Contenido</label>
          <textarea
            required
            className="w-full border rounded px-3 py-2"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Grupo</label>
          <select
            required
            className="w-full border rounded px-3 py-2"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          >
            <option value="">Seleccione un grupo</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 w-full"
        >
          Publicar hilo
        </button>
      </form>
    </div>
  );
};