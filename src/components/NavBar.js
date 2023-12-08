import Nav from 'react-bootstrap/Nav';
import { useSelector, useDispatch } from 'react-redux';
import { logoff } from '../store/authUserSlice';
import { clearUsersData } from '../store/usersSlice';
import { clearPollsData } from '../store/pollsSlice';
const _ = require('underscore');


function NavBar({parent}) {
    let data = useSelector(store => store.authUser);
    let userData = useSelector(store => store.users);
    let loggedIn = !(_.isEmpty(data.value));

    const dispatch = useDispatch();

    const resetData = () => {
        dispatch(clearUsersData());
        dispatch(clearPollsData());
        dispatch(logoff());
        console.log("Clearing data");
    };

    let userRec = !data.value ? null : userData.values[data.value];

    return (
        <Nav variant="tabs" defaultActiveKey={parent}>
        <Nav.Item>
            <Nav.Link href="/dashboard">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="/leaderboard"  disabled={!loggedIn}>Leaderboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="/add" disabled={!loggedIn}>New Poll</Nav.Link>
        </Nav.Item>
        <Nav.Item className="nav-rightjustify">
            <Nav.Link onClick={() => resetData()} href="/dashboard">
                {
                (userRec) ? (<img src={userRec.avatarURL} alt={userRec.name} className="avatar-nav" />) : ""
                }
            </Nav.Link>
        </Nav.Item>
        <Nav.Item className="justify-content-end">
            {
                (_.isEmpty(data.value)) ? (<Nav.Link href="/dashboard">Login</Nav.Link>) : 
                    (<Nav.Link onClick={() => {dispatch(logoff())}}>Logout</Nav.Link>)
            }
        </Nav.Item>
        </Nav>
    );
};

//onClick={dispatch(logoff())}
export default NavBar;