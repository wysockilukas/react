import React from 'react';



const SearchBar = (props) => {

    return (
        <div>
            <input
                type="text"
                value={props.query}
                onChange={props.change}
            />
        <button type="button" onClick={props.clicked}>
            Search
        </button>           
        </div>
    )
}


export default SearchBar;