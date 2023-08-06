

//App.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { addContact, deleteContact, setFilter } from '../redux/contactsSlice';
import css from './App.module.css';

const App = () => {
  const contacts = useSelector((state) => state.contacts.value);
  const filter = useSelector((state) => state.filter.value);
  const dispatch = useDispatch();

  const addContactHandler = (name, number) => {
    if (isContactExists(name)) {
      alert(`Contact "${name}" is already in contacts.`);
      return;
    }

    dispatch(addContact({ name, number }));
  };

  const deleteContactHandler = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const isContactExists = (name) => {
    return contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.wrapperApp}>
      <h1>Phonebook</h1>
      <div className="wrapperForm">
        <ContactForm onAddContact={addContactHandler} contacts={contacts} />
      </div>
      <h2>Contacts</h2>
      <div className="wrapperList">
        <Filter filter={filter} onChange={handleFilterChange} />
        <ContactList contacts={filteredContacts} onDeleteContact={deleteContactHandler} />
      </div>
    </div>
  );
};

export default App;

