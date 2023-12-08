import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import PollDetail from './PollDetail';


const PollSummary = ({ poll }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <div className="poll-summary">
            <div className="summary-date">{poll.timestamp}</div>
            <div className="summary-question">{poll.optionOne.text}</div>
            <div className="summary-or">or</div>
            <div className="summary-question">{poll.optionTwo.text}</div>
            <div className="summary-buttons">
              <Button variant="outline-success" size="lg" onClick={handleShow}>Show</Button>{' '}
            </div>
        </div>
        <ModalWrapper title={`Poll by ${poll.author}`} Component={() => <PollDetail data={poll} handleClose={handleClose} />} show={show} handleClose={handleClose} />
        </>
    );
};

export default PollSummary;