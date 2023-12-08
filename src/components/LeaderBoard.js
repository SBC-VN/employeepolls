import { useSelector, useDispatch } from 'react-redux';
import User from './User';

const LeaderBoard = () => {
  let data = useSelector(store => store.users);

  // Convert the users json object into an array
  let usernames = Object.keys(data.values);
  let users = usernames.map(username => data.values[username]);

  // Sort the users by their total number of answers and questions
  let sortedusers = users.sort((a, b) => {
    let aTotal = Object.keys(a.answers).length + a.questions.length; 
    let bTotal = Object.keys(b.answers).length + b.questions.length;
    return bTotal - aTotal;
  });

  // Display the user grid in sorted order
  return (
    <div className="leader-board">
      {sortedusers.map(user => {
        return <User key={user.id} user={user} />
      })}
    </div>
  );
};

export default LeaderBoard;