import PollGroup from './PollGroup';
import NavBar from './NavBar';

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