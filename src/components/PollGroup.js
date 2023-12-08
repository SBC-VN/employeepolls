import { useSelector } from 'react-redux';
import PollSummary from './PollSummary';

const PollGroup = ({type}) => {   
    let data = useSelector(store => store.polls);
    let polls = [];
    Object.keys(data.values).forEach(key => {
        if (key !== "loaded") { 
            let record = data.values[key];
            if ((record.closed === true) && (type === "Closed")) {
                polls.push(record);
            }
            else if ((record.optionOne.votes.length === 0) && (record.optionTwo.votes.length === 0) && (type === "New")) {
                polls.push(record);
            }
            else if ((record.optionOne.votes.length > 0 || record.optionTwo.votes.length > 0) && (type === "In-Progress")) {
                polls.push(record);
            }
        }
    });

    return (
        <div className="poll-group">
            <div className="poll-group-header">{type}</div>
            {polls.map(poll => {
                return <PollSummary key={poll.id} poll={poll} />
            })}    
        </div>
    );
};

export default PollGroup;