import Main from './components/main';
import Header from './components/header';
import Footer  from './components/Footer';
import './css/App.css';
import { useState } from 'react';

function App() {
  const [formFields, setFormFields] = useState([]); // State to store custom form fields
  const [isDropped, setIsDropped] = useState(false);     

  return (
    <div className="App-container">
      <Header formFields={formFields} setFormFields={setFormFields} isDropped={isDropped} setIsDropped={setIsDropped}/>
      <Main formFields={formFields} setFormFields={setFormFields} isDropped={isDropped} setIsDropped={setIsDropped}/> 
      <Footer />
    </div>
  );
}

export default App;
