import React from 'react';



const EmployeeCard = (props) => {

    return (
        <div>
           <p>{props.dane.FIRST_NAME} {props.dane.LAST_NAME}</p>
           <p>{props.dane.PHONE_NUMBER}</p>
        </div>
    )
}


export default EmployeeCard;