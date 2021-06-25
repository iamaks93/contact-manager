import React from "react";
import imageAvatar from "../images/img_avatar.png";
import {Link} from "react-router-dom";

const ContactCard = (props) => {
    const {id, name, email} = props.contact;

    return (
        <>
                <div className="col-md-12 mb-1">
                    <div className="card ">
                        <div className="row">
                            <div className="col-md-2 col-sm-2">
                                <img src={imageAvatar} className="img-thumbnail rounded float-start avatar-image"
                                     alt="user image"/>
                            </div>
                            <div className="col-md-8 col-sm-8">
                                <div className="card-body">
                                    <div className="user-info-container text-start">
                                        <p className="card-text">
                                            {name}
                                            <br/>
                                            {email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2 col-sm-2">
                                <div className="card-body">
                                    <Link
                                    to={{pathname : "/edit/"+id ,state: props.contact}}>
                                        <i className="bi bi-pencil-square" style={{color: "blue"}}></i>
                                    </Link>
                                    <i className="bi bi-trash-fill ms-3" style={{color: "red"}} onClick={(e) => props.deleteContactHandler(id)}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}
export default ContactCard;