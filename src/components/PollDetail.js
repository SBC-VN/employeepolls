import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { addUserResponse } from '../store/usersSlice';
import { addPollVote } from '../store/pollsSlice';
import Button from 'react-bootstrap/Button';
import { _saveQuestionAnswer } from '../backend/_data';

const PollDetail = ({data, handleClose}) => {
    // Determine the initial 'message' state of the poll.
    let alreadyVoted = false;
    let initialMessage = "Please select an option.";
    let userSetOptionOne = false;
    let allowVote = false;
    let poll = data;

    let authUserData = useSelector(store => store.authUser);
    let authUser = authUserData.value;

    if (poll.closed === true) {
        alreadyVoted = true;
        initialMessage = "This poll is already closed.";
    }
    else if (poll.optionOne.votes.includes(authUser) || poll.optionTwo.votes.includes(authUser)) {
        alreadyVoted = true;
        userSetOptionOne = poll.optionOne.votes.includes(authUser);
        initialMessage = "You have already voted on this poll.";
    }
    else {
        allowVote = true;
        initialMessage = "Click Vote to submit your vote.";
    }

    const [state, setState] = useState({message: initialMessage, selected: 0});
    const handleSelect = (value) => setState({message: state.message, selected:value});

    const dispatch = useDispatch();
    
    let userData = useSelector(store => store.users);
    let pollAuthor = userData.values[poll.author];

    if (state.selected === 0) {
        allowVote = false;
    }

    const handleVote = () => {
        let selectedOption = state.selected === 1 ? "optionOne" : "optionTwo";
        setState({message: "Processing submission", selected: state.selected});

        let answerRec = {authedUser: authUser, qid: poll.id, answer: selectedOption};
        console.log(answerRec);

        _saveQuestionAnswer(answerRec).then(() => {
            dispatch(addPollVote({pollId: poll.id, option: selectedOption, authedUser: authUser}));
            dispatch(addUserResponse({userId: poll.author, pollId: poll.id, option: selectedOption}));
            handleClose();
        }).catch((err) => {
            setState({message: "Error submitting vote, please retry", selected: state.selected});
            // The back end does not persist, so when a question gets added to the store, it gets wiped out when the page is refreshed.
        });
    }

    let totalVotes = poll.optionOne.votes.length + poll.optionTwo.votes.length;

    return (
        <div className="detail">
            <img className = "avatar-large" src={pollAuthor.avatarURL} alt={pollAuthor.name} />
            <hr></hr>
            {(!alreadyVoted) && <div className="detail-wouldyou">Would You Rather</div>}
            <div className="detail-questions">

                <Form.Check // prettier-ignore
                type="switch"
                id="detail-question"
                label={`${poll.optionOne.text} ${alreadyVoted ?  `[${poll.optionOne.votes.length}/${totalVotes} = ${poll.optionOne.votes.length/totalVotes*100}] ` : ""}`}
                checked={state.selected === 1 || (alreadyVoted && userSetOptionOne)}
                onChange={() => handleSelect(1)}
                />

                <Form.Check // prettier-ignore
                type="switch"
                id="detail-question"
                label={`${poll.optionTwo.text} ${alreadyVoted ? `[${poll.optionTwo.votes.length}/${totalVotes} = ${poll.optionTwo.votes.length/totalVotes*100}] ` : ""}`}
                checked={state.selected === 2 || (alreadyVoted && !userSetOptionOne)}
                onChange={() => handleSelect(2)}
                />
            </div>
            <hr></hr>
            <div className="detail-buttons">
                <div className="button-div-left">
                    <Button variant="secondary" onClick={handleClose}>Quit</Button>
                </div>
                {state.message}
                <div className="button-div-right">
                    {(allowVote && !alreadyVoted) && <Button className="pull-right" variant="primary" onClick={handleVote}>Vote</Button>}
                </div>                
            </div>
        </div>
    );
};

export default PollDetail;