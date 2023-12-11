import PollDetail from './PollDetail';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import NotFound from './NotFound';

/**
* @description Page for displaying the details of a question, reuses the PollDetail component that is also used elsewhere.
*/

const QuestionDetails = () => {
    const location = useLocation();
    var { id } = useParams()
    if (!id) {
        id = location.pathname.split('/').pop();
    }
    let data = useSelector(store => store.polls);
    let poll = id && data.values[id];

    //const navigate = useNavigate();
    //let handleClose = () => { navigate('/dashboard'); }; 

    return (
        poll ? <div className="details-page-main"> <PollDetail data={poll} handleClose={() => {}} /></div> : <NotFound itemType="question"/>
    );
}

export default QuestionDetails;