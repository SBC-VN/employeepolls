import { useSelector } from 'react-redux';
import PollSummary from './PollSummary';

/**
* @description  Selects the polls to display based on the type of poll group requested.
*
* @param {string} type - The poll data to display.  One of New, Unanswered, Answered, or Closed.
*
*/

const PollGroup = ({type}) => {   
    let data = useSelector(store => store.polls);
    let authUserData = useSelector(store => store.authUser);
    let authUser = authUserData.value;

    let polls = [];
    Object.keys(data.values).forEach(key => {
        let record = data.values[key];
        switch (type) {
            case "New":
                if ((record.optionOne.votes.length === 0) && (record.optionTwo.votes.length === 0)) {
                    polls.push(record);
                }
                break;
            case "Unanswered":
                if ((record.optionOne.votes.includes(authUser) === false) && (record.optionTwo.votes.includes(authUser) === false)) {
                    if (!(record.optionOne.votes.length === 0 && record.optionTwo.votes.length === 0) && record.closed !== false) {
                        polls.push(record);
                    }
                }
                break;
            case "Answered":
                if ((record.optionOne.votes.includes(authUser) === true) || (record.optionTwo.votes.includes(authUser) === true)) {
                    polls.push(record);
                }
                break;
            case "Closed":
                if (record.closed === true) {
                    polls.push(record);
                }
                break;
            default:
                break;
        }
    });

    return (
        polls.length === 0 ? null : 
            <div className="poll-group">
                <div className="poll-group-header">{type}</div>
                {polls.map(poll => {
                    return <PollSummary key={poll.id} poll={poll} />
                })}    
            </div>
    );
};

export default PollGroup;