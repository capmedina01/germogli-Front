import { useContext, useState } from 'react';
import { ThreadContext } from '../context/ThreadContext';

/**
 * Hook personalizado para manejar la lógica de hilos.
 * Este hook encapsula:
 * - Estados de carga y errores relacionados con los hilos.
 * - Handlers para crear, actualizar y eliminar hilos.
 */
export const useThreads = () => {
  const { threads, loading, error, fetchThreads } = useContext(ThreadContext);
  const [formData, setFormData] = useState({ groupId: null, title: '', content: '' });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'El título es obligatorio';
    if (!formData.content.trim()) errors.content = 'El contenido es obligatorio';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({ groupId: null, title: '', content: '' });
    setFormErrors({});
  };

  const handleCreateThread = async () => {
    setSuccessMessage('');
    if (!validateForm()) return null;
    try {
      // Aquí llamaría a una función que interactúe con la API (communityService)
      setSuccessMessage('Hilo creado correctamente');
      resetForm();
    } catch (error) {
      setFormErrors({ general: error.message || 'Error al crear el hilo' });
    }
  };

  return {
    threads,
    loading,
    error,
    formData,
    formErrors,
    successMessage,
    fetchThreads,
    handleChange,
    resetForm,
    handleCreateThread,
  };
};