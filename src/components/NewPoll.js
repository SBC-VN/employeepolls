import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRef } from "react";
import { useState } from "react";
import { addPoll } from '../store/pollsSlice';
import { addUserPoll } from '../store/usersSlice';
import { useNavigate  } from 'react-router-dom';
import { _saveQuestion } from '../backend/Reader';

/**
* @description Collects the data for a new poll and submits it to the backend.
*
*/

const NewPoll = () => {
    const [state, setState] = useState({message: "Please enter two options.", enableButton: false});
    let users = useSelector(store => store.users);
    let auth = useSelector(store => store.authUser);

    let authUser = users.values[auth.value];

    let option1 = useRef();
    let option2 = useRef();

    let enableButton = false;

    let dispatch = useDispatch();
    const navigate = useNavigate();

    // Create the poll.   
    //   Note the lack of oportunistic updates.  This is deliberate, as it allows the user to resubmit the same poll with much less
    //     data entry.
    //
    let createPoll = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setState({message: "Processing submission", enableButton: false});

        let newrec = { "optionOneText" : option1.current.value, "optionTwoText": option2.current.value, author : authUser.id };

        _saveQuestion(newrec).then((result) => {
            dispatch(addPoll(result));
            dispatch(addUserPoll({userId: authUser.id, pollId: result.id}));
            option1.current.value = "";
            option2.current.value = "";
            navigate("/unanswered");
        });
    };

    // Enable the submit button if both options have been entered.   Also set the message to indicate that the user can submit.
    let onChange = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (option1.current.value.length > 0 && option2.current.value.length > 0) {
            setState({message: "Click Submit to create your poll.", enableButton: true});
        }
    };

    return (
        <div>
            <div>
            <span className="span-center"><h3>Create Your Own Poll</h3></span>
            </div>
            <hr></hr>
            <img className = "avatar-large" src={authUser.avatarURL} alt={authUser.name} />
            <span className="span-center"><h3>{authUser.name}</h3></span>
            <div className="detail-wouldyou">Would You Rather:</div>
            <div className="form-center">
                <Form onSubmit={createPoll}>
                    <Form.Group className="mb-3">
                    <Form.Label>Option 1:</Form.Label>
                    <Form.Control placeholder="Enter an option" ref={option1} onChange={onChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Option 2:</Form.Label>
                    <Form.Control placeholder="Enter an option" ref={option2} onChange={onChange} />
                    </Form.Group>
                    <div className="div-center">{state.message}</div>
                    {state.enableButton && (<Button type="submit" disabled={enableButton ? true : false}>Submit</Button>)}
                </Form>
            </div>
        </div>
    )
};

export default NewPoll;