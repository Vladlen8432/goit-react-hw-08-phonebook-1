import { nanoid } from 'nanoid';
import { addContact, deleteContact } from './Redux/ContactSlice';
// import { addContact, deleteContact, updateFilter } from './Redux/ContactSlice';

export const handleAddContact = async (
  dispatch,
  contacts,
  name,
  phone,
  setName,
  setNumber
) => {
  if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
    alert(`${name} is already in contacts`);
  } else {
    const newContact = {
      id: nanoid(),
      name: name,
      phone: phone,
    };

    try {
      const response = await fetch('https://657cc619853beeefdb99f3c6.mockapi.io/vlasark/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });

      if (!response.ok) {
        throw new Error('Failed to add contact to the backend');
      }

      dispatch(addContact(newContact));

      setName('');
      setNumber('');
    } catch (error) {
      console.error(error);
    }
  }
};

export const handleDeleteContact = async (dispatch, id) => {
  try {
    const response = await fetch(`https://657cc619853beeefdb99f3c6.mockapi.io/vlasark/contacts/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete contact from the backend');
    }

    dispatch(deleteContact(id));
  } catch (error) {
    console.error(error);
  }
};

// export const handleAddContact = (
//   dispatch,
//   contacts,
//   name,
//   number,
//   setName,
//   setNumber
// ) => {
//   if (
//     contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
//   ) {
//     alert(`${name} is already in contacts`);
//   } else {
//     const newContact = {
//       id: nanoid(),
//       name: name,
//       number: number,
//     };
//     dispatch(addContact(newContact));

//     setName('');
//     setNumber('');
//   }
// };

// export const handleDeleteContact = (dispatch, id) => {
//   dispatch(deleteContact(id));
// };

// export const handleFilterChange = (dispatch, value) => {
//   dispatch(updateFilter(value));
// };
