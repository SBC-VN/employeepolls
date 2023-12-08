
const User = ({user}) => {
    return (
        <div className = "user-row">
            <div className = "user-avatar-column">
                <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className='avatar-small' />
                <span className = "span-inline"><h3>{user.id}</h3></span>                                
                <div className = "user-username">
                    {user.name}
                </div>
            </div>
            <div className ="user-activity-count">
                {Object.keys(user.answers).length}
            </div>
            <span className="span-columndivider"></span>
            <div className ="user-activity-count">
                {user.questions.length}
            </div>  
        </div>
    )
};

export default User;