import PollDetail from './PollDetail';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const QuestionDetails = () => {
    const location = useLocation(); 
    let id = location.search.split('=').pop();
    let data = useSelector(store => store.polls);
    let poll = id && data.values[id];

    const navigate = useNavigate();
    let handleClose = () => { navigate('/dashboard'); }; 

    return (
        poll ? <div className="details-page-main"> <PollDetail data={poll} handleClose={handleClose} /> </div> : <div>404 Invalid Poll '{id}'</div>
    );

}

export default QuestionDetails;