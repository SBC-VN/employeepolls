import { useSelector, useDispatch } from 'react-redux';
import User from './User';

const LeaderBoard = () => {
  let data = useSelector(store => store.users);

  let users = data.value.sort((a, b) => {
    let aTotal = a.answers.length + a.questions.length;
    let bTotal = b.answers.length + b.questions.length;
    return bTotal - aTotal;
  });

  return (
    <div className="leader-board">
      {users.map(user => {
        return <User key={user.id} user={user} />
      })}
    </div>
  );
};

export default PollSummary;