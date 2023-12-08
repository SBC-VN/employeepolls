import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { addUserResponse } from '../store/usersSlice';
import { addPollVote } from '../store/pollsSlice';
import Button from 'react-bootstrap/Button';


const PollDetail = ({data, handleClose}) => {
    const [selected, setSelected] = useState(0);
    const handleSelect = (value) => setSelected(value);

    const dispatch = useDispatch();
    let poll = data;


    let userData = useSelector(store => store.users);
    let pollAuthor = userData.values[poll.author];

    let authUserData = useSelector(store => store.authUser);
    let authUser = authUserData.value;

    const handleVote = () => {
        let selectedOption = selected == "1" ? "optionOne" : "optionTwo";
        dispatch(addPollVote({pollId: poll.id, option: selectedOption, authedUser: authUser}));
        dispatch(addUserResponse({userId: poll.author, pollId: poll.id, option: selectedOption}));
        handleClose();
    };

    let allowVote = true;
    if (poll.optionOne.votes.includes(authUser) || poll.optionTwo.votes.includes(authUser) || poll.closed === true || selected === 0) {
        allowVote = false;
    }  

    return (
        <div className="detail">
            <img src={pollAuthor.avatarURL} alt={pollAuthor.name} />
            <div className="detail-wouldyou">Would You Rather</div>
            <div>
                <Form.Check // prettier-ignore
                type="switch"
                id="detail-question"
                label={poll.optionOne.text}
                checked={selected === 1}
                onChange={() => handleSelect(1)}
                />

                <Form.Check // prettier-ignore
                type="switch"
                id="detail-question"
                label={poll.optionTwo.text}
                checked={selected === 2}
                onChange={() => handleSelect(2)}
                />
            </div>
            <div className="detail-buttons">
                <div className="button-div-left">
                    <Button variant="secondary" onClick={handleClose}>Quit</Button>
                </div>
                <div className="button-div-right">
                    {allowVote && <Button className="pull-right" variant="primary" onClick={handleVote}>Vote</Button>}
                </div>                
            </div>
        </div>
    );
};

export default PollDetail;