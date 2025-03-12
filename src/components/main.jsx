import { useState } from 'react';
import '../css/main.css';

export default function Main() {

    const [isDropped, setIsDropped] = useState(false); 
    const [formFields, setFormFields] = useState([]); // State to store custom form fields
     
    // Function to allow dropping
    const allowDrop = (ev) => {
        ev.preventDefault(); // Allow drop
    };
    
    // Function to handle dragging of the element
    const drag = (ev) => {                
        const fieldId = ev.target.id; // Get the ID of the dragged field
        ev.dataTransfer.setData("text", fieldId); // Pass the ID        
        console.log("drag - " + ev.target.id);
        // Finds input type
        const inputField = ev.target.querySelector("input"); 
        if (inputField) {
          ev.dataTransfer.setData("type", inputField.type); 
        } else {
          const textAreaField = ev.target.querySelector("textarea"); 
          if (textAreaField) {
            ev.dataTransfer.setData("type", "textarea"); 
          } else {
            const dropdownField = ev.target.querySelector("select"); 
            if (dropdownField) {
              ev.dataTransfer.setData("type", "dropdown");
            } else {
                const buttonField = ev.target.querySelector("button"); 
                if (buttonField.type === "submit") {
                  ev.dataTransfer.setData("type", "submit"); 
                } else {
                    if (buttonField.type === "reset") {
                        ev.dataTransfer.setData("type", "cancel"); 
                      } else {
                            ev.dataTransfer.setData("type", "unknown"); 
                      }
                }    
            }            
          }
        }   
    };

     // Function to handle dropping the element on the left
    const drop = (ev) => {
        ev.preventDefault(); 
        const fieldType = ev.dataTransfer.getData("type");  // Get the field type
        // console.log(`FieldType = ${fieldType}`); // debugging
        const randomId = Math.floor(10000 + Math.random() * 90000);                
        if (fieldType !== "unknown") {
            const newField = { id: `${randomId}`, type: fieldType }; // Create a new field object
            setFormFields([...formFields, newField]); // Add the new field to the state
            setIsDropped(true);
        }
    };

    // Function to handle dropping the element on the right - deletes the element
    const drop_right = (ev) => {
        ev.preventDefault();
        const fieldId = ev.dataTransfer.getData("text"); // Get the field ID
        // console.log(`Dropping right: ${fieldId}`); // debugging
        setFormFields((prevFields) => {
            // console.log("Dropping fieldId:", fieldId); // debugging        
            // Log the current ids of the fields in prevFields to see if they match // debugging
            // prevFields.forEach(field => {
            //     console.log("Current field id:", field.id); // debugging
            // });
    
            // Remove corresponding field
            const updatedFields = prevFields.filter((field) => field.id !== fieldId);
            // console.log("Updated fields after filtering:", updatedFields); // debugging    
            return updatedFields;
        });
        
        if (formFields.length === 1) {
            setIsDropped(false);  // show message if no fields
        }
    };

    // Predefined fields for the right pane
    const fields = [
        { id: 'text-field', type: 'text' },
        { id: 'email-field', type: 'email' },
        { id: 'password-field', type: 'password' },
        { id: 'number-field', type: 'number' },
        { id: 'date-field', type: 'date' },
        { id: 'time-field', type: 'time' },
        { id: 'range-field', type: 'range' },
        { id: 'color-field', type: 'color' },
        { id: 'radio-field', type: 'radio' },
        { id: 'checkbox-field', type: 'checkbox' },
        { id: 'dropdown-field', type: 'dropdown' },
        { id: 'file-field', type: 'file' },
        { id: 'textarea-field', type: 'textarea' },
        { id: 'submit-field', type: 'submit' },
        { id: 'cancel-field', type: 'cancel' },
    ];

    // Creates the INPUT type fields - used by renderField() function.
    function createInputField(typeOfField, idNum, placeHolderText) {
        return (
            <div key={`${idNum}`} id={`${idNum}`} draggable="true" onDragStart={drag}>                                            
                <label htmlFor={`${typeOfField}-input-${idNum}`}>{typeOfField.charAt(0).toUpperCase() + typeOfField.slice(1)} Input</label>
                <input
                    type={typeOfField}
                    id={`${typeOfField}-input-${idNum}`}
                    name={`${typeOfField}-input-${idNum}`}
                    placeholder={placeHolderText}
                />
            </div>
        );
    }

    // function to render fields based on type
    const renderField = (type, randomId) => {        
        switch (type) {
            case 'text':
                return createInputField("text", randomId, "Enter Text");
            case 'email':
                return createInputField("email", randomId, "Enter your email");
            case 'password':
                return createInputField("password", randomId, "Enter password");
            case 'number':
                return createInputField("number", randomId, "Enter a number");
            case 'date':
                return createInputField("date", randomId, "");
            case 'time':
                return createInputField("time", randomId, "");
            case 'range':
                return (
                    <div key={`${randomId}`} id={`${randomId}`} draggable="true" onDragStart={drag}>   
                        <label htmlFor={`range-input-${randomId}`}>Range Input</label>
                        <input
                            type="range"
                            id={`range-input-${randomId}`}
                            name={`range-input-${randomId}`}
                            min="1"
                            max="100"
                        />
                    </div>
                );
            case 'color':
                return createInputField("color", randomId, "");
            case 'radio':
                return (
                    <div key={`${randomId}`} id={`${randomId}`} draggable="true" onDragStart={drag}>   
                        <label>Choose an option</label>
                        <br />
                        <label htmlFor={`radio1-${randomId}`}>Option 1</label>
                        <input
                            type="radio"
                            id={`radio1-${randomId}`}
                            name={`radio-option-${randomId}`}
                            value="option1"
                        />
                        <br />
                        <label htmlFor={`radio2-${randomId}`}>Option 2</label>
                        <input
                            type="radio"
                            id={`radio2-${randomId}`}
                            name={`radio-option-${randomId}`}
                            value="option2"
                        />
                        <br />
                        <label htmlFor={`radio3-${randomId}`}>Option 3</label>
                        <input
                            type="radio"
                            id={`radio3-${randomId}`}
                            name={`radio-option-${randomId}`}
                            value="option3"
                        />
                    </div>
                );
            case 'checkbox':
                return createInputField("Checkbox", randomId, "");
            case 'dropdown':
                return (                    
                    <div key={`${randomId}`} id={`${randomId}`} draggable="true" onDragStart={drag}>   
                        {/* Select Dropdown */}
                        <label htmlFor={`select-dropdown-${randomId}`}>Select an option</label>
                        <select
                            id={`select-dropdown-${randomId}`}
                            name={`select-dropdown-${randomId}`}
                        >
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                        </div>
                );
            case 'file':
                return createInputField("file", randomId, "");
            case 'textarea':
                return (
                    <div key={`${randomId}`} id={`${randomId}`} draggable="true" onDragStart={drag}>   
                        <label htmlFor={`textarea-${randomId}`}>Comments</label>
                        <textarea
                            id={`textarea-${randomId}`}
                            name={`textarea-${randomId}`}
                            rows="4"
                            cols="50"
                            placeholder="Enter your comments here"
                        />
                    </div>
                );
            case 'submit':
                return (
                    <div key={`${randomId}`} id={`${randomId}`} draggable="true" onDragStart={drag}>   
                    <button type="submit" className="button_submit" id={`submit-button-${randomId}`}>
                        Submit
                    </button>
                    </div>
                );
            case 'cancel':
                return (
                    <div key={`${randomId}`} id={`${randomId}`} draggable="true" onDragStart={drag}>   
                    <button type="reset" className="button_submit" id={`cancel-button-${randomId}`}>
                        Reset Form
                    </button>
                    </div>
                );
            default:
                return null;
        }
    };
    

    return (
        <div className='main_container'>
           <div className='main_block1' onDrop={drop} 
                    onDragOver={allowDrop}>
                <div className="block_border_title">
                    Your Form
                </div>

                <div className="form_custom_title" id='form_custom_title'>
                    Form Title
                </div>
                           
                <div className="form_custom">
                    <div className="form_custom" id="form_custom">  {/* convert to <form> when needed */}  
                        {!isDropped && (
                            <div className="form_custom_comment">
                            {'< Drag your fields here >'} 
                            </div>                            
                        )}        
                        {formFields.map(field => (
                            renderField(field.type, field.id)
                        ))}                
                    </div> 
                </div>   

           </div>
           
           <div className='main_block1' onDrop={drop_right} 
                    onDragOver={allowDrop}>
                <div className="block_border_title">
                    Choose your Fields
                </div>                

                <div>
                    <div className="custom-form" id='form_right'>  {/* convert to <form> when needed */}                     

                        {fields.map(field => (
                            renderField(field.type, field.id)
                        ))}
                    </div>                    
                </div>
           </div>
        </div>
    );
  }

