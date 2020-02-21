import React from 'react';


// ID : String
// required : Boolean
// initialValue : String : Optional
class TextBox extends React.Component {
    constructor(params) {
        super(params);
        this.state = { value: params.value || "" }
    }

    changeHandler = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    render() {
        var required = "";
        if (this.props.required) {
            required = "required";
        }
        return (
            <div className="field">
                <div className="field">
                    <label>Where</label>
                    <input
                        type="text"
                        id={this.props.ID}
                        name={this.props.name}
                        value={this.state.value}
                        onChange={this.props.onChange}
                        required={required}
                    />
                </div>
            </div>
        )
    };
}

export default TextBox;
