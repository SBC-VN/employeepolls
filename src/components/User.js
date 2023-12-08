
const User = ({user}) => {
    return (
        <div>
            <div>
            <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className='avatar' />
            <h3>{user.id}</h3>
            </div>
            <div className = "user-name">
                {user.name}
            </div>
            <div className ="user-activity-count">
                {user.answers.length}
            </div>
            <div className ="user-activity-count">
                {user.questions.length}
            </div>  
        </div>
    )
};

export default User;