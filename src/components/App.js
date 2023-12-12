import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { _getUsers, _getQuestions } from '../backend/_data';
import { _getUsers, _getQuestions } from '../backend/Reader';
import { loadUsers } from '../store/usersSlice';
import { loadPolls } from '../store/pollsSlice';
import { logoff } from '../store/authUserSlice';
import NavBar from './NavBar';
import ModalWrapper from './ModalWrapper';
import LoginForm from './LoginForm';
import NewPoll from './NewPoll';
import LeaderBoard from './LeaderBoard';
import { Routes, Route, Navigate } from 'react-router-dom';
import QuestionDetails from './QuestionDetails';
import PollGroup from './PollGroup';
import Navagator from './CheckAuth';
import NotFound from './NotFound';

/**
* @description Main App.  Kicks off the data load, routes to /dashboard by default.
* 
*/


const App = () => {    
    let users = useSelector(store => store.users);
    let polls = useSelector(store => store.polls);
    let auth = useSelector(store => store.authUser);

    let handleClose = () => { };  // Actually handled by auth.loaded so don't need to do anything here

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoff());

        _getUsers().then(users => {
            dispatch(loadUsers(users)) });
        _getQuestions().then(polls => {
            dispatch(loadPolls(polls)) });
    }, [dispatch]);

    return (
        <div className="App">
            <NavBar parent="unanswered" />
            {(polls.loaded === false || users.loaded === false) ?  (<h3>Loading</h3>) :
                (<Routes>
                    <Route exact path="/" element={<Navigate to="/unanswered" />} />           
                    <Route exact path="/unanswered" element={<Navagator Component = {PollGroup} />} />
                    <Route exact path="/leaderboard" element={<Navagator Component = {LeaderBoard} />} />
                    <Route exact path="/add" element={<Navagator Component = {NewPoll} />} />
                    <Route exact path="/new" element={<Navagator Component = {NewPoll} />} />
                    <Route path="/questions/:id" element={<Navagator Component = {QuestionDetails} />} />
                    <Route exact path="/answered" element={<Navagator Component = {PollGroup} />} />
                    <Route exact path="/unanswered" element={<Navagator Component = {PollGroup} />} />
                    <Route path="*" element={<NotFound itemType="path"/>} />
                </Routes>)}
            <ModalWrapper title={`Login`} Component={() => <LoginForm handleClose={handleClose} />} show={auth.value==null} handleClose={handleClose} />
        </div>
    );
};
//         <Route exact path="/" element={<Navagator Component = {PollGroup} />} />          
export default App;