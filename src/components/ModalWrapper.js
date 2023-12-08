import Modal from 'react-bootstrap/Modal';
/**
* @description Wraps the given component in a modal.
*
* @param {string} title - The title to display in the modal header.
* @param {component} Component - The component to display in the modal body.
* @param {boolean} show - Whether or not to show the modal.
* @param {function} handleClose - The function to call when the user clicks the close button.
*
*/

const ModalWrapper = ({title, Component, show, handleClose  }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Component />
      </Modal.Body>
    </Modal>
  );
};

export default ModalWrapper;