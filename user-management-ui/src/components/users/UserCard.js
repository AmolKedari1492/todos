import React from "react";

const UserCard = (props) => {
    return(<div className="users__list--data">
        <div>{ props.user.accountId }</div>
        <div>{ props.user.fullName }</div>
        <div>{ props.user.age }</div>
    </div>)
};

export default UserCard;