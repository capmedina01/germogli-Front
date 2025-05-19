import React, { useState, useEffect } from "react";
import { communityService } from "../services/communityService";

export const ThreadFormModal = ({ onClose, onThreadCreated }) => {
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch real groups from the API
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await communityService.getAllGroups();
        // data can be an array or { message, data: [...] }
        const groupsArr = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];
        setGroups(groupsArr);
      } catch (err) {
        setGroups([]); // fallback to empty array if error
      }
    };
    fetchGroups();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simula el usuario logueado (ajusta según tu auth)
    const user_id = 1;
    const newThread = {
      id: Date.now(),
      group_id: groupId ? parseInt(groupId) : null,
      user_id,
      title,
      content,
      authorName: "Usuario Actual",
      creation_date: new Date().toISOString(),
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
            className="w-full border rounded px-3 py-2"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          >
            <option value="">Selecciona un grupo (opcional)</option>
            {groups.length === 0 ? (
              <option value="">No hay grupos disponibles</option>
            ) : (
              groups.map((group) => (
                <option key={group.group_id || group.id} value={group.group_id || group.id}>
                  {group.name}
                </option>
              ))
            )}
          </select>
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-green-700 w-full"
        >
          Publicar hilo
        </button>
      </form>
    </div>
  );
};