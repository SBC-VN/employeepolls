import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


const PollSummary = ({ poll }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <div className="summary">
            <div className="summary-question">{poll.optionOne.text}</div>
            <div className="summary-question">{poll.optionTwo.text}</div>
            <div className="summary-date">{poll.timestamp}</div>
            <Button variant="outline-success" size="lg" onClick={handleShow}>Show</Button>{' '}
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{poll.timestamp}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="detail-question">{poll.optionOne.text}</div>
            <div className="detail-question">{poll.optionTwo.text}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    );
};

export default PollSummary;