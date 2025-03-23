import '../css/header.css';
import SaveFile from '../assets/save-file.png';
import OpenFile from '../assets/open-folder.png';
import Restart from '../assets/refresh-arrow.png';
import Dialog from './dialog.jsx';
import { useState } from 'react';

export default function Header({ formFields, setFormFields, isDropped, setIsDropped }) {

    // Status Pop-up variables
    const [showDialog, setShowDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState(''); 
    const [dialogMessage, setDialogMessage] = useState(''); 
    const [isError, setIsError] = useState(false); 
    
    // Icons' functionalities
    const handleReset = () => {
        window.location.reload();
    };

    const saveForm = async () => {
      const jsonContent = JSON.stringify(formFields, null, 2); 
      const blob = new Blob([jsonContent], { type: "application/json" });

      if (window.showSaveFilePicker) {
        // Use File System API in Chrome, Edge, and Opera
        try {
          const handle = await window.showSaveFilePicker({
            suggestedName: "custom_form.json",
            types: [
              {
                description: "JSON Files",
                accept: { "application/json": [".json"] },
              },
            ],
          });

          const writable = await handle.createWritable();
          await writable.write(blob);
          await writable.close();          
          // Show success dialog
          setDialogTitle("Success");
          setDialogMessage("File successfully saved.");
          setIsError(false);
          setShowDialog(true);
        } catch (error) {          
          // Show error dialog
          setDialogTitle("Error");
          setDialogMessage("File save cancelled or failed.");
          console.log(`Error saving: ${error}`)  
          setIsError(true);
          setShowDialog(true);
        }
      } else {
        // Fallback for Safari & Firefox: Use Blob + <a> download
        const filename = prompt("Enter filename:", "custom_form.json");
        if (!filename) {          
          // Show error dialog
          setDialogTitle("Error");
          setDialogMessage(`File name is empty. \n File not saved.`);
          setIsError(true);
          setShowDialog(true);
          return;
        }
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        // Show success dialog
        setDialogTitle("Success");
        setDialogMessage("File successfully saved.");
        setIsError(false);
        setShowDialog(true);
      }
    };

    const exportForm = async () => {
        const formContent = document.getElementById("form_custom").innerHTML;;        
        const blob = new Blob([formContent], { type: "text/html" });
    
        if (window.showSaveFilePicker) {
            // Use File System API in Chrome, Edge, and Opera
            try {
                const handle = await window.showSaveFilePicker({
                    suggestedName: "custom_form.html",
                    types: [{ description: "HTML Files", accept: { "text/html": [".html"] } }]
                });
    
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();                    
                // Show success dialog
                setDialogTitle("Success");
                setDialogMessage("File successfully exported\nin HTML format.");
                setIsError(false);
                setShowDialog(true);
            } catch (error) {                
                // Show error dialog
                setDialogTitle("Error");
                setDialogMessage(`File save cancelled or failed.`);
                console.log(`Error saving: ${error}`)  
                setIsError(true);
                setShowDialog(true);
            }
        } else {
            // Fallback for Safari & Firefox: Use Blob + <a> download
            const filename = prompt("Enter filename:", "custom_form.html");
            if (!filename) {
                alert("Filename is empty. \n File not saved.");
                // Show error dialog
                setDialogTitle("Error");
                setDialogMessage(`Filename is empty. \n File not saved.`);
                setIsError(true);
                setShowDialog(true);
                return;
            }    
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
            // Show success dialog
            setDialogTitle("Success");
            setDialogMessage("File successfully exported\nin HTML format.");
            setIsError(false);
            setShowDialog(true);
        }
    };


    const loadForm = async () => {
        if (window.showOpenFilePicker) {
            // Use modern File Picker API if supported
            try {
                const [fileHandle] = await window.showOpenFilePicker({
                    types: [{ description: "JSON Files", accept: { "application/json": [".json"] } }]
                });
                const file = await fileHandle.getFile();
                const text = await file.text();
                const parsedData = JSON.parse(text); 
                setFormFields(parsedData);   
                console.log(formFields.length);              
                if (formFields.length === 1 || formFields.length === 0) {
                    setIsDropped(false);  // show message if no fields
                } else {
                    setIsDropped(true);  
                }                
                // Show success dialog
                setDialogTitle("Success");
                setDialogMessage("File loaded successfully.");
                setIsError(false);
                setShowDialog(true);
            } catch (error) {                
                // Show error dialog
                setDialogTitle("Error");
                setDialogMessage(`File load cancelled or failed.`);
                console.log(`Error loading: ${error}`)  
                setIsError(true);
                setShowDialog(true);
            }
        } else {
            // Fallback for Safari & Firefox: Use hidden file input
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".json";
            input.style.display = "none";
    
            input.addEventListener("change", async (event) => {
                const file = event.target.files[0];
                if (!file) return;
    
                const reader = new FileReader();
                reader.onload = (e) => {
                    const parsedData = JSON.parse(e.target.result); 
                    setFormFields(parsedData); 
                    // Show success dialog
                    setDialogTitle("Success");
                    setDialogMessage("File loaded successfully.");
                    setIsError(false);
                    setShowDialog(true);
                };
                reader.readAsText(file);
            });
    
            document.body.appendChild(input);
            input.click();
            document.body.removeChild(input);
        }
    };
  
    return (
        <header className='header_container'>    
            {/* Render Dialog conditionally */}
            {showDialog && (
                <Dialog
                    title={dialogTitle}
                    message={dialogMessage}
                    error={isError}
                    onClose={() => setShowDialog(false)} 
                />
            )}  

            <div className="header_title">
                Form Builder
            </div>  
            <div className="header_menu">
                {/* --- SAVE FILE - OWN FORMAT ----- */}
                <div className="icon" id="save-icon">
                    <img src={SaveFile} alt="Save form" className='icon_menu' onClick={saveForm}/>
                    {/* <span className="tooltip-format">SAVE</span> */}
                    <span className="tooltip">Save form</span>
                </div>

                {/* --- LOAD FILE ----- */}
                <div className="icon" id="load-icon">
                <img src={OpenFile} alt="Load form" className='icon_menu' onClick={loadForm}/>
                {/* <span className="tooltip-format">LOAD</span> */}
                <span className="tooltip">Load form</span>
                </div>

                 {/* --- EXPORT HTML ----- */}
                 <div className="icon" id="export-icon">                    
                    <img src={SaveFile} alt="Export form" className='icon_menu' onClick={exportForm}/>
                    <span className="tooltip-format">HTML</span>
                    <span className="tooltip">Export HTML</span>
                </div>

                {/* --- RESET FORM ----- */}
                <div className="icon" id="reset-icon">
                    <img src={Restart} alt="Reset form"   className='icon_menu' style={{width: '35px', marginBottom: '9px'}} onClick={handleReset}/>
                    <span className="tooltip">Restart form</span>
                </div>
            </div> 
        </header>
    );
  }