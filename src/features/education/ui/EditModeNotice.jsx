import PropTypes from 'prop-types';
import { Button } from '../../../ui/components/Button';

/**
 * Aviso de modo edición
 * 
 * Indica al usuario que seleccione un módulo para editar y ofrece 
 * botones para cancelar o proceder con la edición.
 * 
 * @param {Object} props
 * @param {Function} props.onCancel - Callback para salir del modo edición
 * @param {Function} props.onConfirm - Callback para confirmar edición de los seleccionados
 * @param {boolean} [props.hasSelected=false] - Indica si hay al menos un módulo seleccionado
 */
export const EditModeNotice = ({
  onCancel,
  onConfirm,
  hasSelected = false
}) => {
  return (
    <div>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <p className="text-yellow-700">
          Seleccione el módulo que desea modificar y oprima el botón "Editar seleccionado".
        </p>
      </div>
      
      <div className="flex flex-wrap gap-4 mt-8 justify-center">
        <Button 
          variant="white"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        
        <Button 
          variant="primary"
          onClick={onConfirm}
          disabled={!hasSelected}
        >
          Editar seleccionado
        </Button>
      </div>
    </div>
  );
};

EditModeNotice.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  hasSelected: PropTypes.bool
};