import { useSelector, useDispatch } from 'react-redux';
import PollSummary from './PollSummary';

const PollGroup = ({type}) => {
    
    let data = useSelector(store => store.polls);
    let polls = [];
    Object.keys(data.value).forEach(key => {
        let record = data.value[key];
        if (record.closed === true && type === "closed") {
            polls.push(record);
        }
        else if (record.optionOne.votes.length === 0 && record.optionTwo.votes.length === 0 && type === "new") {
            polls.push(record);
        }
        else if (record.optionOne.votes.length > 0 || record.optionTwo.votes.length > 0 && type === "answered") {
            polls.push(record);
        }
    });


    return (
        <div className="poll-group">
            {polls.map(poll => {
                return <PollSummary key={poll.id} poll={poll} />
            })}    
        </div>
    );
};

export default PollGroup;