import React from 'react'

export default function (props) {

    const styles = {
        image: {
            background: "url('" + props.url + "')",
            height: "100px",
        }
    };

    return (
        <div className="ui inverted vertical masthead left aligned segment" style={styles.image}>
            <div className="ui container">
                <div onClick={props.history.goBack}>
                    <i className="inverted white huge angle left icon" style={{cursor:'pointer'}}></i>
                </div>
            </div>
        </div>
    )
}