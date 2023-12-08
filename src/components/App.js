import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { _getUsers, _getQuestions } from '../backend/_data';
import { loadUsers } from '../store/usersSlice';
import { loadPolls } from '../store/pollsSlice';
import NavBar from './NavBar';
import ModalWrapper from './ModalWrapper';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import NewPoll from './NewPoll';
import LeaderBoard from './LeaderBoard';
import { Routes, Route } from 'react-router-dom';
import QuestionDetails from './QuestionDetails';

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
        _getUsers().then(users => {
            dispatch(loadUsers(users)) });
        _getQuestions().then(polls => {
            dispatch(loadPolls(polls)) });
    }, [dispatch]);

    return (
        <div className="App">
            <NavBar parent="dashboard" />
            {(polls.loaded === false || users.loaded === false || auth.value == null) ?  (<h3>Loading</h3>) :
                (<Routes>
                    <Route exact path="/" element={<Dashboard />} />
                    <Route exact path="/dashboard" element={<Dashboard />} />
                    <Route exact path="/leaderboard" element={<LeaderBoard />} />
                    <Route exact path="/add" element={<NewPoll />} />
                    <Route path="/questions" element={<QuestionDetails />} />
                </Routes>)}
            <ModalWrapper title={`Login`} Component={() => <LoginForm handleClose={handleClose} />} show={auth.value==null} handleClose={handleClose} />
        </div>
    );
};

export default App;