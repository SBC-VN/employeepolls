import Nav from 'react-bootstrap/Nav';
import { useSelector, useDispatch } from 'react-redux';
const _ = require('underscore');

function NavBar({parent}) {
    let data = useSelector(store => store.authUser);
    let userData = useSelector(store => store.users);
    let loggedIn = !(_.isEmpty(data.value));

    let userRec = data.value == null ? null : userData.values[data.value];

    return (
        <Nav variant="tabs" defaultActiveKey={parent}>
        <Nav.Item>
            <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="/leaderboard"  disabled={!loggedIn}>Leaderboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="/new" disabled={!loggedIn}>New Poll</Nav.Link>
        </Nav.Item>
        <Nav.Item className="nav-rightjustify">
            <Nav.Link href="/new" disabled={true}>
                {
                (userRec !== null) ? (<img src={userRec.avatarURL} alt={userRec.name} className="nav-avatar" />) : ""
                }
            </Nav.Link>
        </Nav.Item>
        <Nav.Item className="justify-content-end">
            {
                (_.isEmpty(data.value)) ? (<Nav.Link href="/login">Login</Nav.Link>) : 
                    (<Nav.Link href="/logout">Logout</Nav.Link>)
            }
        </Nav.Item>
        </Nav>
    );
};

//onClick={dispatch(logoff())}
export default NavBar;