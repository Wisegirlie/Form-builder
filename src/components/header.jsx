import '../css/header.css';
import SaveFile from '../assets/save-file.png'
import OpenFile from '../assets/open-folder.png'
import Restart from '../assets/refresh-arrow.png'

export default function Header({ formFields, setFormFields, isDropped, setIsDropped }) {
    
    const handleReset = () => {
        window.location.reload();
      };

      const saveForm = async () => {
        const jsonContent = JSON.stringify(formFields, null, 2); // Pretty-print JSON
        const blob = new Blob([jsonContent], { type: "application/json" });
    
        if (window.showSaveFilePicker) {
            // Use File System API in Chrome, Edge, and Opera
            try {
                const handle = await window.showSaveFilePicker({
                    suggestedName: "custom_form.json",
                    types: [{ description: "JSON Files", accept: { "application/json": [".json"] } }]
                });
    
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();
    
                alert("\nFile saved successfully!");
            } catch (error) {
                alert("File save cancelled or failed: \n" + error);
            }
        } else {
            // Fallback for Safari & Firefox: Use Blob + <a> download
            const filename = prompt("Enter filename:", "custom_form.json");
            if (!filename) {
                alert("Filename is empty. \n File not saved.");
                return;
            }
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
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
    
                alert("\nFile saved successfully!");
            } catch (error) {
                alert("File save cancelled or failed: \n" + error);  
            }
        } else {
            // Fallback for Safari & Firefox: Use Blob + <a> download
            const filename = prompt("Enter filename:", "custom_form.html");
            if (!filename) {
                alert("Filename is empty. \n File not saved.");
                return;
            }    
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
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
                if (formFields.length === 1) {
                    setIsDropped(false);  // show message if no fields
                } else {
                    setIsDropped(true);  
                }
                alert("\nFile loaded successfully!");
            } catch (error) {
                alert("File load cancelled or failed: \n" + error);
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
                    console.log("File loaded successfully!");
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