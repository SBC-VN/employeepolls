import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { logon } from '../store/authUserSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LoginForm = ({handleClose}) => {    
    const dispatch = useDispatch();
    let userData = useSelector(store => store.users);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(logon(selectedUser));
        handleClose();
    };

    let userNames = Object.keys(userData.values).map(key => { return userData.values[key].id; });
    const [selectedUser, setSelectedUser] = useState(userNames[0]);

    return (
        <div className="detail">
            <Form onSubmit={handleSubmit}>
                <Form.Select aria-label="Select Username" onChange={e => setSelectedUser(e.target.value)} >
                    {userNames.map(name => {
                        return (<option value={name} key = {name}>{name}</option>)})
                    }
                </Form.Select>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
        </div>
    );
};

export default LoginForm;