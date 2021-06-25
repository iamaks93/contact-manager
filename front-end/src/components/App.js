import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import './App.css';
import Header from "./Header";
import ContactsList from "./ContactsList";
import AddContact from "./AddContact";
import api from '../api/base';

function App() {
    const [contacts, setContacts] = useState([]);
    const [searchResultContacts, setSearchResultContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const STORAGE_KEY = 'contacts_list';
    const addContactHandler = async (contact) => {
        let {name, email} = contact;
        const newContacts = {id: uuidv4(), name, email};
        const response = await api.post('contacts', newContacts);
        setContacts([...contacts, response.data]);
        //setContactInStorage(newContacts);
    }
    const editContactHandler = (id) => {

    }
    const updateContactHandler = async (editedContact) => {
        let {name, email} = editedContact;
        const response = await api.put(`/contacts/${editedContact.id}`,{name,email});
        const updatedContacts = contacts.map((contact) => {
            return contact.id === editedContact.id ? {...response.data} : contact;
        });
        setContacts(updatedContacts);
        //setContactInStorage(updatedContacts);
    }
    const deleteContactHandler = async (id) => {
        const deleteConfirm = window.confirm('Do you like to delete this record?');
        if (deleteConfirm) {
            await api.delete(`/contacts/${id}`);
            const deletedContactList = contacts.filter((contact) => {
                return contact.id !== id;
            });
            setContacts(deletedContactList);
        }
    }
    const searchContactHandler = async (searchTerm) => {
        setSearchTerm(searchTerm);
        if (searchTerm.trim() !== '') {
            searchTerm = searchTerm.toLowerCase();
            const searchResultData = await api.get(`/contacts?q=${searchTerm}`);
            setSearchResultContacts(searchResultData.data);
            /*const searchResultData = contacts.filter((contact) => {
                return Object
                    .values(contact)
                    .join(' ')
                    .toLowerCase()
                    .includes(searchTerm);
            });*/
            //setSearchResultContacts(searchResultData.data);
        } else {
            setSearchResultContacts(contacts);
        }
    }
    const setContactInStorage = (contacts) => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(contacts)
        );
    }
    const retrieveContacts = async () => {
        const contacts = await api.get('/contacts');
        return contacts.data;
    }

    useEffect(() => {
        const fetchAllContacts = async () => {
            const getAllContacts = await retrieveContacts();
            if (getAllContacts) {
                setContacts(getAllContacts);
            }
        }
        fetchAllContacts();
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
                            path={["/", "/contact-manager"]}
                            exact
                            render={(props) => (
                                <ContactsList
                                    {...props}
                                    contacts={searchTerm.length === 0 ? contacts : searchResultContacts}
                                    deleteContactHandler={deleteContactHandler}
                                    searchContactHandler={searchContactHandler}
                                    editContactHandler={editContactHandler}
                                    searchTerm={searchTerm}
                                />
                            )}
                        />
                        <Route
                            path="/add"
                            exact
                            render={(props) => (
                                <AddContact
                                    {...props}
                                    mode='add'
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
                                    mode='edit'
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
