import { useSelector } from 'react-redux';
import PollSummary from './PollSummary';
import { useLocation, useNavigate } from 'react-router-dom';

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
    const location = useLocation();
    const navigate = useNavigate();

    if (!type) {
        // If we didn't get a type, then we need to figure out what type of poll group from the URL.
        console.log("PollGroup: location = " + location.pathname);
        if (location.pathname !== "/unanswered" && location.pathname !== "/answered") {
            console.log("Using navigate");
            navigate("/unanswered");
        }
        type = location.pathname.split('/').pop().toLowerCase();
    }

    let polls = [];
    Object.keys(data.values).forEach(key => {
        let record = data.values[key];
        switch (type) {
            case "new":
                if ((record.optionOne.votes.length === 0) && (record.optionTwo.votes.length === 0)) {
                    polls.push(record);
                }
                break;
            case "unanswered":
                if ((record.optionOne.votes.includes(authUser) === false) && (record.optionTwo.votes.includes(authUser) === false)) {
                    polls.push(record);
                }
                break;
            case "answered":
                if ((record.optionOne.votes.includes(authUser) === true) || (record.optionTwo.votes.includes(authUser) === true)) {
                    polls.push(record);
                }
                break;
            case "closed":
                if (record.closed === true) {
                    polls.push(record);
                }
                break;
            default:
                break;
        }
    });

    type = type.charAt(0).toUpperCase() + type.slice(1);  // Capitalize the first letter of the type.

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