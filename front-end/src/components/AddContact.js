import React from "react";
import {Link} from "react-router-dom";

class AddContact extends React.Component {

    constructor(props) {
        super(props);
        let mode = this.props.mode;
        let email = '';
        let name = '';
        let id;
        if (mode === 'edit') {
            email = this.props.location.state.email;
            name = this.props.location.state.name;
            id = this.props.location.state.id;
        }

        let formSubmitButton = mode === 'add' ? 'Submit' : 'Update';
        mode = mode.charAt(0).toUpperCase() + mode.slice(1);
        this.state = {
            id,
            email,
            name,
            mode,
            formSubmitButton
        };
    }

    add = (e) => {
        e.preventDefault();
        if (this.state.name.trim() === '' || this.state.email.trim() === '') {
            alert('Value cannot be blank');
            return false;
        }
        if (this.props.mode === 'add') {
            this.props.addContactHandler(this.state);
        } else {
            this.props.updateContactHandler(this.state);
        }
        this.setState({name: '', email: ''});
        this.props.history.push('/contact-manager');
    }

    render() {
        return (
            <>
                <div className="new-section">
                    <div className="row">
                        <div className="col-md-8 col-xs-12">
                            <p className="h3">{this.state.mode} User Contact</p>
                        </div>
                        <div className="col-md-4 col-xs-12 ">
                            <Link
                                to="/contact-manager">
                                <button type="button" className="btn btn-primary float-end">Return Back</button>
                            </Link>
                        </div>
                    </div>
                    <div className="bd-example ">
                        <form onSubmit={this.add}>
                            <div className="mb-3">
                                <label htmlFor="nameFormControlInput" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nameFormControlInput"
                                    placeholder="Enter name"
                                    onChange={(e) => this.setState({name: e.target.value})}
                                    value={this.state.name}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="emailFormControlInput" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="emailFormControlInput"
                                    placeholder="name@example.com"
                                    onChange={(e) => this.setState({email: e.target.value})}
                                    value={this.state.email}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">{this.state.formSubmitButton}</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default AddContact;