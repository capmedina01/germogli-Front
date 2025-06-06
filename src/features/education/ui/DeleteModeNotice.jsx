import PropTypes from 'prop-types';
import { Button } from '../../../ui/components/Button';

/**
 * Aviso de modo eliminación
 * 
 * Muestra instrucciones para seleccionar módulos a eliminar y botones 
 * para cancelar o confirmar la acción en lote.
 * 
 * @param {Object} props
 * @param {Function} props.onCancel - Callback para salir del modo eliminación
 * @param {Function} props.onConfirm - Callback para confirmar eliminación de los seleccionados
 * @param {boolean} [props.hasSelected=false] - Indica si hay al menos un módulo seleccionado
 */
export const DeleteModeNotice = ({
  onCancel,
  onConfirm,
  hasSelected = false
}) => {
  return (
    <div>
      <div
        role="alert"
        className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4"
      >
        <p className="text-yellow-700 font-semibold mb-2">
          ⚠️ Eliminar módulo educativo
        </p>
        <p className="text-red-600 font-bold mb-2">
          ¡CUIDADO! Esta acción es irreversible.
        </p>
        <ul className="list-decimal list-inside text-yellow-700">
          <li>Selecciona el módulo que quieres borrar.</li>
          <li>Haz clic en <strong>“Eliminar seleccionado”</strong>.</li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-4 mt-8 justify-center">
        <Button
          variant="white"
          onClick={onCancel}
        >
          Cancelar
        </Button>

        <Button
          variant="danger"
          onClick={onConfirm}
          disabled={!hasSelected}
        >
          Eliminar seleccionado
        </Button>
      </div>
    </div>
  );
};

DeleteModeNotice.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  hasSelected: PropTypes.bool
};