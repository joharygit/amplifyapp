import React, { useState,useEffect} from 'react';

import './App.css';

import { Amplify, API } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation} from './graphql/mutations';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const initialFormState = { name : ' ', description : ' ' };


const  App = () =>  {
  const [notes,setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect (() => {
    fetchNotes();
  },[]);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes});
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query : createNoteMutation, variables : { input: formData}});
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote( {id }) {
      const newNotesArray = notes.filter(note => note.id !== id);
      setNotes(newNotesArray);
      await API.graphql({ query : deleteNoteMutation, variables: {input : {id }}});

  }



  return (
      <Authenticator>
        {
          ( {signOut, user }) => (
          <div className="App">
                         
              <h1> My Notes App</h1>
              <fieldset>
                <input
                  onChange = { event => setFormData({ ...formData, 'name': event.target.value})}
                  placeholder="Note name"
                  value= {formData.name}
                 />
                 <input
                  onChange = { event => setFormData({ ...formData, 'description': event.target.value})}
                  placeholder="Note description"
                  value = {formData.description}
                    />
                  <button onClick={createNote}>Create Note</button>          

              </fieldset>
              
              <div style={{ marginBottom: 30}}>
                {
                  notes.map(note => (
                    <div key={note.id || note.name}>
                      <h2>{note.name}</h2>
                      <p>{note.description} </p>
                      <button onClick= {()=> deleteNote(note)}> Delete Note</button>
                    </div>
                  ))
                }
              </div>
              
            
            <button onClick={signOut}>Sign out</button>
          </div>
        )

      }
      
     </Authenticator> 
  );
}

export default App;
