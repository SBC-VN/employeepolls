/**
* @description Simply creates 4 PollGroups, one for New, Unanswered, Answered, and Closed polls.
*/

import PollGroup from './PollGroup';


const DashBoard = () => { 
    return (
        <div className="dashboard-container">
            <PollGroup type="New"/>
            <PollGroup type="Unanswered"/>
            <PollGroup type="Answered"/>
            <PollGroup type="Closed"/>
        </div>
    );
};
//            
export default DashBoard;