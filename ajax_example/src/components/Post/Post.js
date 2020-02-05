import React from 'react';
// import {withRouter} from 'react-router-dom';  //to nam pozwala pzrekazywac propsy z obiektu roouter w dół, bo do tego komponetu POST nie ma bezosedniegi routingu

import './Post.css';

const post = (props) => (
    <article className="Post" onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className="Info">
        <div className="Author">{props.author}</div>
        {/* {console.log(props)} */}
        </div>
    </article>
);

// export default  withRouter(post);  //jak tak obejmujemy to znaczy ze withRouter to higher object component
export default  post;  //jak tak obejmujemy to znaczy ze withRouter to higher object component