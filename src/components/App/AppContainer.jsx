import { connect } from "react-redux";
import {
  updateFilter,
  addContact,
  deleteContact,
} from "../../redux/phoneBookActions";
import App from "./App";

const mapStateToProps = (state) => ({
  filter: state.filter,
  contacts: state.contacts,
});

const mapDispatchToProps = (dispatch) => ({
  updateFilter: (filter) => dispatch(updateFilter(filter)),
  addContact: (contact) => dispatch(addContact(contact)),
  deleteContact: (id) => dispatch(deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
