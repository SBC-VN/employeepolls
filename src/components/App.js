import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { _getUsers, _getQuestions } from '../backend/_data';
import { loadUsers } from '../store/usersSlice';
import { loadPolls } from '../store/pollsSlice';
import PollGroup from './PollGroup';

const App = () => {
    
    let users = useSelector(store => store.users);
    let polls = useSelector(store => store.polls);

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
            <PollGroup type="new"/>
        </div>
    );
};

export default App;