import { useState } from 'react';
import '../css/main.css';

export default function Main() {

    const [isDropped, setIsDropped] = useState(false); 
    
    // Function to allow dropping
        const allowDrop = (ev) => {
            ev.preventDefault(); // Allow drop
        };
    
    // Function to handle dragging of the element
        const drag = (ev) => {
            ev.dataTransfer.setData("text", ev.target.id); // Store the id of the dragged element
            const clonedElement = ev.target.cloneNode(true);  // Clone the dragged element
            // Optional: Assign a unique ID to avoid conflicts
            clonedElement.id = `${ev.target.id}-clone-${Date.now()}`;
            ev.dataTransfer.setData("text/html", clonedElement.outerHTML);
        };

    // Function to handle dropping the element
        const drop = (ev) => {
            ev.preventDefault(); // Prevent default behavior
            const form_custom = document.getElementById("form_custom");
            const data = ev.dataTransfer.getData("text/html");  // Get the cloned element's HTML
            // Create a new div and insert the cloned element
            const wrapper = document.createElement("div");
            wrapper.innerHTML = data;
            const newElement = wrapper.firstChild;
            
            form_custom.appendChild(newElement); // Append the dragged element to the drop zone
            setIsDropped(true);
        };

        const drop_right = (ev) => {
            ev.preventDefault(); // Prevent default behavior
            const data = ev.dataTransfer.getData("text"); // Get the data (the id)
            const element = document.getElementById(data); // Get the dragged element by id
            const form_custom = document.getElementById("form_right");
            form_custom.appendChild(element); // Append the dragged element to the drop zone
            setIsDropped(true);
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
                    </div> 
                </div>   

           </div>
           {/* <div className='main_linedivider' />    */}
           
           <div className='main_block1' onDrop={drop_right} 
                    onDragOver={allowDrop}>
                <div className="block_border_title">
                    Choose your Fields
                </div>                

                <div>
                    <div className="custom-form" id='form_right'>  {/* convertir a form si hace falta*/}
                     
                        <div id='text-field'
                        draggable="true" 
                        onDragStart={drag}>
                            {/* Text Input */}
                            <label htmlFor="text-input">Text Input</label>
                            <input type="text" id="text-input" name="text-input" placeholder="Enter text" />
                            <br />
                        </div>
                        
                        <div id='email-field'
                        draggable="true" 
                        onDragStart={drag}>
                            {/* Email Input */}
                            <label htmlFor="email-input">Email</label>
                            <input type="email" id="email-input" name="email-input" placeholder="Enter your email" />
                            <br />
                        </div>

                        <div id='password-field'
                        draggable="true" 
                        onDragStart={drag}>
                            {/* Password Input */}
                            <label htmlFor="password-input">Password</label>
                            <input type="password" id="password-input" name="password-input" placeholder="Enter password" />
                            <br />
                        </div>

                        <div id='number-field'
                        draggable="true" 
                        onDragStart={drag}>
                            {/* Number Input */}
                            <label htmlFor="number-input">Number Input</label>
                            <input type="number" id="number-input" name="number-input" placeholder="Enter a number" />
                            <br />
                        </div>

                        <div id='date-field'
                        draggable="true" 
                        onDragStart={drag}>
                            {/* Date Input */}
                            <label htmlFor="date-input">Date Input</label>
                            <input type="date" id="date-input" name="date-input" />
                            <br />
                        </div>

                        <div id='time-field'
                        draggable="true" 
                        onDragStart={drag}>
                            {/* Time Input */}
                            <label htmlFor="time-input">Time Input</label>
                            <input type="time" id="time-input" name="time-input" />
                            <br />
                        </div>

                        <div id='range-field'
                        draggable="true" 
                        onDragStart={drag}>
                            {/* Range Input */}
                            <label htmlFor="range-input">Range Input</label>
                            <input type="range" id="range-input" name="range-input" min="1" max="100" />
                            <br />
                        </div>

                        <div id='color-field'
                        draggable="true" 
                        onDragStart={drag}>
                            {/* Color Input */}
                            <label htmlFor="color-input">Color Input</label>
                            <input type="color" id="color-input" name="color-input" />
                            <br />
                        </div>

                        <div id='radio-field'
                        draggable="true" 
                        onDragStart={drag}>
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
                        onDragStart={drag}>
                            {/* Checkbox */}
                            <label htmlFor="checkbox">Checkbox</label>
                            <input type="checkbox" id="checkbox" name="checkbox" />                            
                        </div>

                        <div id='dropdown-field'
                        draggable="true" 
                        onDragStart={drag}>
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
                        onDragStart={drag}>
                            {/* File Input */}
                            <label htmlFor="file-input">Choose a file</label>
                            <input type="file" id="file-input" name="file-input" />
                            <br />
                        </div>

                        <div id='textarea-field'
                        draggable="true" 
                        onDragStart={drag}>
                            {/* Textarea */}
                            <label htmlFor="textarea">Comments</label>
                            <textarea id="textarea" name="textarea" rows="4" cols="50" placeholder="Enter your comments here"></textarea>
                            <br />
                        </div>

                        <div id='submit-field'
                        draggable="true" 
                        onDragStart={drag}>
                            {/* Submit Button */}
                            <button type="submit" className='button_submit'>
                                Submit
                            </button>
                        </div>

                        <div id='cancel-field'
                        draggable="true" 
                        onDragStart={drag}>
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

