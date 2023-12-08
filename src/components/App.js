import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { _getUsers, _getQuestions } from '../backend/_data';
import { loadUsers } from '../store/usersSlice';
import { loadPolls } from '../store/pollsSlice';
import PollGroup from './PollGroup';
import NavBar from './NavBar';
import ModalWrapper from './ModalWrapper';
import LoginForm from './LoginForm';

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

    if (polls.loaded === false && users.loaded === false) {
        return <h3>Loading</h3>;
    }

    return (
        <div>
            <NavBar parent="polls" />
            <PollGroup type="New"/>
            <PollGroup type="In-Progress"/>
            <PollGroup type="Closed"/>
            <ModalWrapper title={`Login`} Component={() => <LoginForm handleClose={handleClose} />} show={auth.value==null} handleClose={handleClose} />

        </div>
    );
};

export default App;