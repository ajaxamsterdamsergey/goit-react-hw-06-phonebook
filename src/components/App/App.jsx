import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { CSSTransition } from "react-transition-group";
import Contacts from "../Contacts/ContactsList";
import ContactForm from "../ContactForm/ContactForm";
import Filter from "../Filter/Filter";
import PhoneBook from "../PhoneBook/PhoneBook";
import WarningMessage from "../WarningMessage/WarningMessage";
import slideTransition from "../../Transitions/Slide.module.css";
import filterTransition from "../../Transitions/FilterTransition.module.css";
import messageTransition from "../../Transitions/MessageTransition.module.css";

import styles from "./App.module.css";

export default class App extends Component {
  state = {
    didMount: false,
    contactIn: false,
  };
  isAlreadyAdded = (contact, contacts) =>
    contacts.find((item) =>
      item.name.toLowerCase().includes(contact.name.toLowerCase())
    );
  addContact = (contact) => {
    const { contacts } = this.props;

    const contactToAdd = {
      ...contact,
      id: uuidv4(),
    };

    !this.isAlreadyAdded(contact, contacts)
      ? this.props.addContact(contactToAdd)
      : this.setState(
          (prevState) => ({ contactIn: !prevState.contactIn }),
          () =>
            setTimeout(() => {
              this.setState((prevState) => ({
                contactIn: !prevState.contactIn,
              }));
            }, 1000)
        );
  };
  deleteContact = (id) => {
    this.props.deleteContact(id);
  };
  filterContacts = (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  changeFilter = (e) => {
    this.props.updateFilter(e.target.value);
  };

  componentDidMount() {
    this.setState({ didMount: true });

    const contacts =
      JSON.parse(localStorage.getItem("contacts")) || this.props.contacts;

    contacts.forEach((contact) => {
      const contactToAdd = {
        ...contact,
        id: uuidv4(),
      };
      this.props.addContact(contactToAdd);
    });
  }
  componentDidUpdate(prevState) {
    const { contacts } = this.props;
    if (contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }

  render() {
    const { didMount, contactIn } = this.state;
    const { contacts, filter } = this.props;
    const filteredContacts = this.filterContacts(contacts, filter);

    return (
      <div className={styles.app}>
        <div>
          <CSSTransition
            in={didMount}
            timeout={250}
            classNames={slideTransition}
            appear
          >
            <PhoneBook className={styles.logo} />
          </CSSTransition>
          <ContactForm onAddContact={this.addContact} />
          {contacts.length > 0 && (
            <div>
              <h2>Contacts</h2>
              <CSSTransition
                in={contacts.length > 1}
                timeout={250}
                classNames={filterTransition}
                unmountOnExit
              >
                <Filter onChangeFilter={this.changeFilter} />
              </CSSTransition>
              <Contacts
                contacts={filteredContacts}
                deleteContacts={this.deleteContact}
              />
            </div>
          )}
          <CSSTransition
            in={contactIn}
            timeout={250}
            classNames={messageTransition}
            unmountOnExit
          >
            <WarningMessage />
          </CSSTransition>
        </div>
      </div>
    );
  }
}
