import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './Redux/Store';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchInput from './FilterByName/FilterByName';
import { fetchContacts } from './Redux/ContactSlice';

const App = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchContacts());
    persistor.persist();
  }, [dispatch]);

  if (isLoading === undefined) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <PersistGate loading={null} persistor={persistor}>
      <div className="container">
        <h1 className="phonebookHeader">Phonebook</h1>
        <ContactForm />
        <h2>Contacts</h2>
        <p>Find contacts by name</p>
        <SearchInput />
        <ContactList />
      </div>
    </PersistGate>
  );
};

export default App;
