import { API } from '../../../common/config/api';

// Centralización de endpoints de la API
const ENDPOINTS = {
  POSTS: '/posts',
  POST_BY_ID: (id) => `/posts/${id}`,
  MESSAGES: '/messages',
  MESSAGE_BY_ID: (id) => `/messages/${id}`,
  GROUPS: '/groups',
  GROUP_BY_ID: (id) => `/groups/${id}`,
  THREADS: '/threads',
  THREAD_BY_ID: (id) => `/threads/${id}`,
  REACTIONS: '/reactions',
  REACTION_BY_ID: (id) => `/reactions/${id}`,
};

// Manejo centralizado de errores
const handleError = (error, context) => {
  console.error(`Error en ${context}:`, error);
  throw error;
};

export const communityService = {
  // ==================== Peticiones para posts ====================
  createPost: async (postData) => {
    try {
      if (postData.file) {
        const formData = new FormData();
        Object.keys(postData).forEach((key) => {
          if (key === 'file') {
            formData.append('file', postData.file);
          } else if (postData[key] !== null && postData[key] !== undefined) {
            formData.append(key, postData[key]);
          }
        });

        const response = await API.post(ENDPOINTS.POSTS, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
      } else {
        const response = await API.post(ENDPOINTS.POSTS, postData);
        return response.data;
      }
    } catch (error) {
      handleError(error, 'crear post');
    }
  },

  getPostById: async (id) => {
    try {
      const response = await API.get(ENDPOINTS.POST_BY_ID(id));
      return response.data;
    } catch (error) {
      handleError(error, `obtener post con ID ${id}`);
    }
  },

  getAllPosts: async () => {
    try {
      const response = await API.get(ENDPOINTS.POSTS);
      return response.data;
    } catch (error) {
      handleError(error, 'obtener todos los posts');
    }
  },

  updatePost: async (id, updateData) => {
    try {
      const response = await API.put(ENDPOINTS.POST_BY_ID(id), updateData);
      return response.data;
    } catch (error) {
      handleError(error, `actualizar post con ID ${id}`);
    }
  },

  deletePost: async (id) => {
    try {
      const response = await API.delete(ENDPOINTS.POST_BY_ID(id));
      return response.data;
    } catch (error) {
      handleError(error, `eliminar post con ID ${id}`);
    }
  },

  // ==================== Peticiones para mensajes ====================
  createMessage: async (messageData) => {
    try {
      const response = await API.post(ENDPOINTS.MESSAGES, messageData);
      return response.data;
    } catch (error) {
      handleError(error, 'crear mensaje');
    }
  },

  getAllMessages: async () => {
    try {
      const response = await API.get(ENDPOINTS.MESSAGES);
      return response.data;
    } catch (error) {
      handleError(error, 'obtener todos los mensajes');
    }
  },

  // ==================== Peticiones para grupos ====================
  createGroup: async (groupData) => {
    try {
      const response = await API.post(ENDPOINTS.GROUPS, groupData);
      return response.data;
    } catch (error) {
      handleError(error, 'crear grupo');
    }
  },

  getGroupById: async (id) => {
    try {
      const response = await API.get(ENDPOINTS.GROUP_BY_ID(id));
      return response.data;
    } catch (error) {
      handleError(error, `obtener grupo con ID ${id}`);
    }
  },

  getAllGroups: async () => {
    try {
      const response = await API.get(ENDPOINTS.GROUPS);
      return response.data;
    } catch (error) {
      handleError(error, 'obtener todos los grupos');
    }
  },

  updateGroup: async (id, updateData) => {
    try {
      const response = await API.put(ENDPOINTS.GROUP_BY_ID(id), updateData);
      return response.data;
    } catch (error) {
      handleError(error, `actualizar grupo con ID ${id}`);
    }
  },

  deleteGroup: async (id) => {
    try {
      const response = await API.delete(ENDPOINTS.GROUP_BY_ID(id));
      return response.data;
    } catch (error) {
      handleError(error, `eliminar grupo con ID ${id}`);
    }
  },

  // ==================== Peticiones para hilos ====================
  createThread: async (threadData) => {
    try {
      const response = await API.post(ENDPOINTS.THREADS, threadData);
      return response.data;
    } catch (error) {
      handleError(error, 'crear hilo');
    }
  },

  getThreadById: async (id) => {
    try {
      const response = await API.get(ENDPOINTS.THREAD_BY_ID(id));
      return response.data;
    } catch (error) {
      handleError(error, `obtener hilo con ID ${id}`);
    }
  },

  getAllThreads: async () => {
    try {
      const response = await API.get(ENDPOINTS.THREADS);
      return response.data;
    } catch (error) {
      handleError(error, 'obtener todos los hilos');
    }
  },

  updateThread: async (id, updateData) => {
    try {
      const response = await API.put(ENDPOINTS.THREAD_BY_ID(id), updateData);
      return response.data;
    } catch (error) {
      handleError(error, `actualizar hilo con ID ${id}`);
    }
  },

  deleteThread: async (id) => {
    try {
      const response = await API.delete(ENDPOINTS.THREAD_BY_ID(id));
      return response.data;
    } catch (error) {
      handleError(error, `eliminar hilo con ID ${id}`);
    }
  },

  // ==================== Peticiones para reacciones ====================
  toggleReaction: async (reactionData) => {
    try {
      const response = await API.post(ENDPOINTS.REACTIONS, reactionData);
      return response.data;
    } catch (error) {
      handleError(error, 'crear o eliminar reacción');
    }
  },

  getAllReactions: async () => {
    try {
      const response = await API.get(ENDPOINTS.REACTIONS);
      return response.data;
    } catch (error) {
      handleError(error, 'obtener todas las reacciones');
    }
  },
};