import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import './App.css';
import Header from "./Header";
import ContactsList from "./ContactsList";
import AddContact from "./AddContact";

function App() {
    const [contacts, setContacts] = useState([]);
    const [searchResultContacts, setSearchResultContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const STORAGE_KEY = 'contacts_list';
    const addContactHandler = (contact) => {
        const newContacts = [
            ...contacts,
            {id: uuidv4(), ...contact}
        ];
        setContacts(newContacts);
        setContactInStorage(newContacts);
    }
    const editContactHandler = (id) => {

    }
    const updateContactHandler = (editedContact) => {
        const updatedContacts = contacts.map((contact) => {
            return contact.id === editedContact.id ? {...editedContact} : contact;
        });
        setContacts(updatedContacts);
        setContactInStorage(updatedContacts);
    }
    const deleteContactHandler = (id) => {
        const deleteConfirm = window.confirm('Do you like to delete this record?');
        if (deleteConfirm) {
            const deletedContactList = contacts.filter((contact) => {
                return contact.id !== id;
            });
            setContacts(deletedContactList);
        }
    }
    const searchContactHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
        if(searchTerm.trim() !== '') {
            searchTerm = searchTerm.toLowerCase();
            const searchResultData = contacts.filter((contact) => {
                return Object
                    .values(contact)
                    .join(' ')
                    .toLowerCase()
                    .includes(searchTerm);
            });
            setSearchResultContacts(searchResultData);
        }else {
            setSearchResultContacts(contacts);
        }
    }
    const setContactInStorage = (contacts) => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(contacts)
        );
    }
    const retrieveContacts = () => {
        const contacts = JSON.parse(localStorage.getItem(
            STORAGE_KEY
        ));
        setContacts(contacts);
    }

    useEffect(() => {
        retrieveContacts();
    }, []);

    useEffect(() => {
        setContactInStorage(contacts);
    }, [contacts]);

    return (
        <div className="container-fluid">
            <Header/>
            <div className="main">
                <Router>
                    <Switch>
                        <Route
                            path={["/","/contact-manager"]}
                            exact
                            render={(props) => (
                                <ContactsList
                                    {...props}
                                    contacts= {searchTerm.length === 0 ? contacts : searchResultContacts}
                                    deleteContactHandler={deleteContactHandler}
                                    searchContactHandler={searchContactHandler}
                                    editContactHandler={editContactHandler}
                                    searchTerm = {searchTerm}
                                />
                            )}
                        />
                        <Route
                            path="/add"
                            exact
                            render={(props) => (
                                <AddContact
                                    {...props}
                                    mode = 'add'
                                    addContactHandler={addContactHandler}
                                />
                            )}
                        />
                        <Route
                            path="/edit/:id"
                            exact
                            render={(props) => (
                                <AddContact
                                    {...props}
                                    mode = 'edit'
                                    updateContactHandler={updateContactHandler}
                                />
                            )}
                        />
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
