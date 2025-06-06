import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { educationService } from '../services/educationService';

/**
 * Tarjeta que muestra información resumida de un módulo educativo
 * 
 * Este componente implementa dos modos de funcionamiento:
 * 1. Modo enlace: Actúa como un link navegable al detalle del módulo
 * 2. Modo seleccionable: Permite seleccionar el módulo para edición/eliminación
 * 
 * 
 * @param {Object} props - Propiedades del componente
 * @param {number|string} props.id - ID único del módulo
 * @param {string} props.title - Título del módulo
 * @param {Array} props.tags - Etiquetas del módulo
 * @param {boolean} props.isAdmin - Si el usuario es administrador
 * @param {boolean} props.isSelectable - Si el módulo puede seleccionarse (modo edición/eliminación)
 * @param {boolean} props.isSelected - Si el módulo está actualmente seleccionado
 * @param {Function} props.onSelect - Función a ejecutar al seleccionar el módulo
 */
export const ModuleCard = ({ 
  id,
  title, 
  tags = [],
  isAdmin = false,
  isSelectable = false, // Nuevo prop para indicar si estamos en modo selección
  isSelected = false,   // Nuevo prop para indicar si está seleccionado
  onSelect = () => {}   // Nuevo prop para manejar la selección
}) => {
  const [counters, setCounters] = useState({
    videos: 0,
    articles: 0,
    guides: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // NOTA TÉCNICA: Cargamos los contadores de forma asíncrona para mejorar el rendimiento
  // esto evita bloquear la renderización inicial de la tarjeta mientras esperamos datos secundarios
  useEffect(() => {
    const fetchCounters = async () => {
      try {
        // Obtener datos en paralelo para mejorar rendimiento
        // IMPORTANTE: Usamos Promise.all para realizar las peticiones simultáneamente
        // en lugar de secuencialmente, reduciendo el tiempo de carga
        const [articles, guides, videos] = await Promise.all([
          educationService.getArticlesByModuleId(id).catch(() => ({ data: [] })),
          educationService.getGuidesByModuleId(id).catch(() => ({ data: [] })),
          educationService.getVideosByModuleId(id).catch(() => ({ data: [] }))
        ]);
        
        // NOTA: Añadimos manejo de errores individualizado por tipo de contenido
        // permitiendo mostrar parcialmente los contadores aunque falle alguna petición
        setCounters({
          videos: Array.isArray(videos.data) ? videos.data.length : 0,
          articles: Array.isArray(articles.data) ? articles.data.length : 0,
          guides: Array.isArray(guides.data) ? guides.data.length : 0
        });
      } catch (error) {
        console.error(`Error obteniendo contadores para módulo ${id}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCounters();
    }
  }, [id]);

  // Contenido de la tarjeta
  const cardContent = (
    <div className={`p-4 rounded-sm shadow-md hover:shadow-lg transition-shadow 
      ${isAdmin ? 'bg-green-50 border border-green-100' : 'bg-white'}
      ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
      {/* Título del módulo */}
      <h3 className="font-medium mb-2 text-base">{title}</h3>
      
      {/* Etiquetas */}
      <div className="flex flex-wrap gap-1 mb-2">
        {tags.map((tag, index) => (
          <span key={tag.id || index} className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
            #{typeof tag === 'object' ? tag.name : tag}
          </span>
        ))}
      </div>
      
      {/* Contadores de contenido */}
      <div className="text-xs text-gray-600 flex gap-1">
        {isLoading ? (
          <span>Cargando contadores...</span>
        ) : (
          <>
            <span>{counters.videos} Videos</span>
            <span>-</span>
            <span>{counters.articles} Artículos</span>
            <span>-</span>
            <span>{counters.guides} Guías</span>
          </>
        )}
      </div>
    </div>
  );

  // Si estamos en modo seleccionable, renderizamos un div clickable
  if (isSelectable) {
    return (
      <div 
        onClick={() => onSelect(id)} 
        className="cursor-pointer"
        aria-label={`Seleccionar módulo ${title}`}
      >
        {cardContent}
      </div>
    );
  }

  // En modo normal, renderizamos un enlace
  return (
    <Link to={`/education/module/${id}`} className="block">
      {cardContent}
    </Link>
  );
};