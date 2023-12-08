import Modal from 'react-bootstrap/Modal';

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