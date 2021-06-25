import React from "react";
import {Link} from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactsList = (props) => {
    const {contacts} = props;
    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard
                contact={contact}
                key = {contact.id}
                deleteContactHandler = {props.deleteContactHandler}
            />
        );
    });
    return (
        <>
            <div className="contact-list-container">
                <div className="new-section">
                    <div className="row">
                        <div className="col-md-8 col-xs-12">
                            <p className="h3">Contact List</p>
                        </div>
                        <div className="col-md-4 col-xs-12">
                            <Link
                                to="/add"
                            >
                                <button type="button" className="btn btn-primary float-end">Add Contact</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="new-section">
                    <div className="inner-addon right-addon">
                        <i className="bi bi-search"></i>
                        <input className="form-control form-control-lg" type="text" placeholder="Search From List"
                               aria-label=".form-control-lg example" onKeyUp={(e) => props.searchContactHandler(e.target.value)}/>
                    </div>
                </div>
                <div className="new-section">
                    {contacts.length > 0 ?
                     renderContactList :
                     'No Record Available'}
                </div>
            </div>
        </>
    );
}
export default ContactsList