import _swal from 'sweetalert2';

export const isValidNumber = (numberString: string) =>
  !isNaN(parseInt(numberString));

export const showInvalidIdMessage = (): void => {
  _swal.fire(
    'Id Invalido',
    'El ID que ha ingresado no pertenece a un ID de usuario válido. Verifique la ruta y vuelva a intentarlo',
    'error'
  );
};
