import { useState } from 'react';
import '../css/main.css';

export default function Main() {

    const [isDropped, setIsDropped] = useState(false); 
    const [formFields, setFormFields] = useState([]); // State to store form fields
     
    // Function to allow dropping
    const allowDrop = (ev) => {
        ev.preventDefault(); // Allow drop
    };
    
    // Function to handle dragging of the element --- CLONE 
    const drag = (ev) => {
        console.log("drag - " + ev.target.id);
        ev.dataTransfer.setData("text", ev.target.id); // Store the id of the dragged element
        // const clonedElement = ev.target.cloneNode(true);  // Clone the dragged element
        // Optional: Assign a unique ID to avoid conflicts
        // clonedElement.id = `${ev.target.id}-clone-${Date.now()}`;
        // ev.dataTransfer.setData("text/html", clonedElement.outerHTML);
        
        // Finds input type
        const inputField = ev.target.querySelector("input"); // Find the input field inside the dragged div
        if (inputField) {
            ev.dataTransfer.setData("type", inputField.type); // Store the input's type attribute
        } else {
            const textAreaField = ev.target.querySelector("textarea"); // Find the input field inside the dragged div
            if (textAreaField) {
                ev.dataTransfer.setData("type", "textarea"); // Store the input's type attribute
            } else {
                ev.dataTransfer.setData("type", "unknown"); // Default value if no input is found
            }
        }
    };

    // Function to handle dragging of the element
    const move = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id); // Store the id of the dragged element 
        console.log("move - " + ev.target.id);  
    };

    // Function to handle dropping the element
    const drop = (ev) => {
        ev.preventDefault(); // Prevent default behavior
        // const form_custom = document.getElementById("form_custom");
        // const data = ev.dataTransfer.getData("text/html"); // Get the cloned element's HTML
        // // Create a new div and insert the cloned element
        // const wrapper = document.createElement("div");
        // wrapper.innerHTML = data;
        // const newElement = wrapper.firstChild;    
        // // form_custom.appendChild(newElement); // Append the dragged element to the drop zone
        // setIsDropped(true);

        const fieldType = ev.dataTransfer.getData("type");  // Get the field type
        console.log(`FieldType = ${fieldType}`);
        if (fieldType !== "unknown") {
            const newField = { id: `${fieldType}`, type: fieldType }; // Create a new field object
            setFormFields([...formFields, newField]); // Add the new field to the state
            setIsDropped(true);
        }
    };

    const drop_right = (ev) => {
        // ev.preventDefault(); // Prevent default behavior
        // const data = ev.dataTransfer.getData("text"); // Get the data (the id)
        // const element = document.getElementById(data); // Get the dragged element by id            
        // const form_custom = document.getElementById("form_right");
        // form_custom.appendChild(element); // Append the dragged element to the drop zone
        // setIsDropped(true);            
        ev.preventDefault();
        const fieldId = ev.dataTransfer.getData("text"); // Get the field ID
        setFormFields(formFields.filter(field => field.id !== fieldId)); // Remove the field from the state
        
    };

    // Function to dynamically set the correct drag handler based on the pane
    const setDragHandler = (ev) => {
        if (ev.target.closest('.main_block1').id === 'form_right') {
            return move(ev); // Return the move handler
        } else {
            return drag(ev); // Return the drag handler
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

    function createInputField(typeOfField, idNum, placeHolderText) {
        return (
            <div key={`${typeOfField}-Field-${idNum}`} id={`${typeOfField}-Field-${idNum}`} draggable="true" onDragStart={setDragHandler}>                                            
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

    // Helper function to render fields based on type
    const renderField = (type) => {
        const randomId = Math.floor(10000 + Math.random() * 90000);        
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
                return (
                    <div key={`date-field-${randomId}`} id={`date-field-${randomId}`} draggable="true" onDragStart={setDragHandler}>   
                        <label htmlFor={`date-input-${randomId}`}>Date Input</label>
                        <input
                            type="date"
                            id={`date-input-${randomId}`}
                            name={`date-input-${randomId}`}
                        />
                    </div>
                );
            case 'time':
                return (
                    <div key={`time-field-${randomId}`} id={`time-field-${randomId}`} draggable="true" onDragStart={setDragHandler}>   
                        <label htmlFor={`time-input-${randomId}`}>Time Input</label>
                        <input
                            type="time"
                            id={`time-input-${randomId}`}
                            name={`time-input-${randomId}`}
                        />
                    </div>
                );
            case 'range':
                return (
                    <div key={`range-field-${randomId}`} id={`range-field-${randomId}`} draggable="true" onDragStart={setDragHandler}>   
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
                return (
                    <div key={`color-field-${randomId}`} id={`color-field-${randomId}`} draggable="true" onDragStart={setDragHandler}>   
                        <label htmlFor={`color-input-${randomId}`}>Color Input</label>
                        <input
                            type="color"
                            id={`color-input-${randomId}`}
                            name={`color-input-${randomId}`}
                        />
                    </div>
                );
            case 'radio':
                return (
                    <div key={`radio-field-${randomId}`} id={`radio-field-${randomId}`} draggable="true" onDragStart={setDragHandler}>   
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
                return (
                    <div key={`checkbox-field-${randomId}`} id={`checkbox-field-${randomId}`} draggable="true" onDragStart={setDragHandler}>   
                        <label htmlFor={`checkbox-${randomId}`}>Checkbox</label>
                        <input
                            type="checkbox"
                            id={`checkbox-${randomId}`}
                            name={`checkbox-${randomId}`}
                        />
                    </div>
                );
            case 'dropdown':
                return (                    
                    <div key={`dropdown-field-${randomId}`} id={`dropdown-field-${randomId}`} draggable="true" onDragStart={setDragHandler}>   
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
                return (
                    <div key={`file-field-${randomId}`} id={`file-field-${randomId}`} draggable="true" onDragStart={setDragHandler}>   
                        <label htmlFor={`file-input-${randomId}`}>Choose a file</label>
                        <input
                            type="file"
                            id={`file-input-${randomId}`}
                            name={`file-input-${randomId}`}
                        />
                    </div>
                );
            case 'textarea':
                return (
                    <div key={`textarea-field-${randomId}`} id={`textarea-field-${randomId}`} draggable="true" onDragStart={setDragHandler}>   
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
                    <div key={`submit-field-${randomId}`} id={`submit-field-${randomId}`} draggable="true" onDragStart={setDragHandler}>   
                    <button type="submit" className="button_submit" id={`submit-button-${randomId}`}>
                        Submit
                    </button>
                    </div>
                );
            case 'cancel':
                return (
                    <div key={`reset-field-${randomId}`} id={`reset-field-${randomId}`} draggable="true" onDragStart={setDragHandler}>   
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
                    <div className="form_custom" id="form_custom">  {/* convertir a form si hace falta*/}  
                        {!isDropped && (
                            <div className="form_custom_comment">
                            {'< Drag your fields here >'} 
                            </div>                            
                        )}        
                        {formFields.map(field => (
                        <div key={field.id} id={field.id} draggable="true" onDragStart={drag}>
                            {renderField(field.type)} {/* Render the field based on its type */}
                        </div>
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
                    <div className="custom-form" id='form_right'>  {/* convertir a form si hace falta*/}                     

                    {fields.map(field => (
                        // <div key={field.id} id={field.id} draggable="true" onDragStart={drag}>
                            renderField(field.type)
                        // </div>
                    ))}


                        <div id='text-field'
                        draggable="true" 
                        onDragStart={setDragHandler}
                        >
                            {/* Text Input */}
                            <label htmlFor="text-input">Text Input</label>
                            <input type="text" id="text-input" name="text-input" placeholder="Enter text" />
                            <br />
                        </div>
                        
                        <div id='email-field'
                        draggable="true" 
                        onDragStart={setDragHandler}
                        >
                            {/* Email Input */}
                            <label htmlFor="email-input">Email</label>
                            <input type="email" id="email-input" name="email-input" placeholder="Enter your email" />
                            <br />
                        </div>

                        <div id='password-field'
                        draggable="true" 
                        onDragStart={setDragHandler}
                        >
                            {/* Password Input */}
                            <label htmlFor="password-input">Password</label>
                            <input type="password" id="password-input" name="password-input" placeholder="Enter password" />
                        </div>

                        <div id='number-field'
                        draggable="true" 
                        onDragStart={setDragHandler}
                        >
                            {/* Number Input */}
                            <label htmlFor="number-input">Number Input</label>
                            <input type="number" id="number-input" name="number-input" placeholder="Enter a number" />
                            <br />
                        </div>

                        <div id='date-field'
                        draggable="true" 
                        onDragStart={setDragHandler}
                        >
                            {/* Date Input */}
                            <label htmlFor="date-input">Date Input</label>
                            <input type="date" id="date-input" name="date-input" />
                            <br />
                        </div>

                        <div id='time-field'
                        draggable="true" 
                        onDragStart={setDragHandler}
                        >
                            {/* Time Input */}
                            <label htmlFor="time-input">Time Input</label>
                            <input type="time" id="time-input" name="time-input" />
                            <br />
                        </div>

                        <div id='range-field'
                        draggable="true" 
                        onDragStart={setDragHandler}
                        >
                            {/* Range Input */}
                            <label htmlFor="range-input">Range Input</label>
                            <input type="range" id="range-input" name="range-input" min="1" max="100" />
                            <br />
                        </div>

                        <div id='color-field'
                        draggable="true" 
                        onDragStart={setDragHandler}
                        >
                            {/* Color Input */}
                            <label htmlFor="color-input">Color Input</label>
                            <input type="color" id="color-input" name="color-input" />
                            <br />
                        </div>

                        <div id='radio-field'
                        draggable="true" 
                        onDragStart={setDragHandler}
                        >
                            {/* Radio Buttons */}
                            <label>Choose an option</label>
                            <br />
                            <label htmlFor="radio1">Option 1</label>
                            <input type="radio" id="radio1" name="radio-option" value="option1" />
                            <br />
                            <label htmlFor="radio2">Option 2</label>
                            <input type="radio" id="radio2" name="radio-option" value="option2" />                            
                            <br />
                            <label htmlFor="radio3">Option 3</label>
                            <input type="radio" id="radio3" name="radio-option" value="option3" />                            
                        </div>

                        <div id='checkbox-field'
                        draggable="true" 
                        onDragStart={setDragHandler}
                        >
                            {/* Checkbox */}
                            <label htmlFor="checkbox">Checkbox</label>
                            <input type="checkbox" id="checkbox" name="checkbox" />                            
                        </div>

                        <div id='dropdown-field'
                        draggable="true" 
                        onDragStart={setDragHandler}
                        >
                            {/* Select Dropdown */}
                            <label htmlFor="select-dropdown">Select an option</label>
                            <select id="select-dropdown" name="select-dropdown">
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                            <br />
                        </div>

                        <div id='file-field'
                        draggable="true" 
                        onDragStart={setDragHandler}
                        >
                            {/* File Input */}
                            <label htmlFor="file-input">Choose a file</label>
                            <input type="file" id="file-input" name="file-input" />
                            <br />
                        </div>

                        <div id='textarea-field'
                        draggable="true" 
                        onDragStart={setDragHandler}
                        >
                            {/* Textarea */}
                            <label htmlFor="textarea">Comments</label>
                            <textarea id="textarea" name="textarea" rows="4" cols="50" placeholder="Enter your comments here"></textarea>
                            <br />
                        </div>

                        <div id='submit-field'
                        draggable="true" 
                        onDragStart={setDragHandler}
                        >
                            {/* Submit Button */}
                            <button type="submit" className='button_submit'>
                                Submit
                            </button>
                        </div>

                        <div id='cancel-field'
                        draggable="true" 
                        onDragStart={setDragHandler}
                        >
                            {/* Cancel Button */}
                            <button type="reset" className='button_submit'>
                                Reset Form
                            </button>
                        </div>
                    </div>                    
                </div>
           </div>

        </div>
    );
  }

