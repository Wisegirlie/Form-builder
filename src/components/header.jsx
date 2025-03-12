import '../css/header.css';
import SaveFile from '../assets/save-file.png'
import OpenFile from '../assets/open-folder.png'
import Restart from '../assets/refresh-arrow.png'

export default function Header() {
    
    const handleReset = () => {
        window.location.reload();
      };

    const saveForm = async () => {
        const formContent = document.getElementById("form_custom").innerHTML;
        const blob = new Blob([formContent], { type: "text/plain" });
    
        if (window.showSaveFilePicker) {
            // Use File System API in Chrome, Edge, and Opera
            try {
                const handle = await window.showSaveFilePicker({
                    suggestedName: "custom_form.txt",
                    types: [{ description: "Text Files", accept: { "text/plain": [".txt"] } }]
                });
    
                const writable = await handle.createWritable();
                await writable.write(formContent);
                await writable.close();
    
                alert("\nFile saved successfully!");
            } catch (error) {
                alert("File save cancelled or failed: \n" + error);  
            }
        } else {
            // Fallback for Safari & Firefox: Use Blob + <a> download
            const filename = prompt("Enter filename:", "custom_form.txt");
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
                    types: [{ description: "Text Files", accept: { "text/plain": [".txt"] } }]
                });
                const file = await fileHandle.getFile();
                const text = await file.text();
                document.getElementById("form_custom").innerHTML = text;
                alert("\nFile loaded successfully!");
            } catch (error) {
                alert("File load cancelled or failed: \n" + error);
            }
        } else {
            // Fallback for Safari & Firefox: Use hidden file input
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".txt";
            input.style.display = "none";
    
            input.addEventListener("change", async (event) => {
                const file = event.target.files[0];
                if (!file) return;
    
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.getElementById("form_custom").innerHTML = e.target.result;
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
                {/* --- SAVE FILE ----- */}
                <div className="icon" id="save-icon">
                    <img src={SaveFile} alt="Save form" className='icon_menu' onClick={saveForm}/>
                    <span className="tooltip">Save form</span>
                </div>
                
                {/* --- LOAD FILE ----- */}
                <div className="icon" id="load-icon">
                <img src={OpenFile} alt="Load form" className='icon_menu' onClick={loadForm}/>
                    <span className="tooltip">Load form</span>
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