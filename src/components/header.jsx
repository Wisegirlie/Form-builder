import '../css/header.css';
import SaveFile from '../assets/save-file.png'
import OpenFile from '../assets/open-folder.png'
import Restart from '../assets/refresh-arrow.png'

export default function Header() {
    
    const handleReset = () => {
        window.location.reload();
      };
  
    return (
        <header className='header_container'>
            <div className="header_title">
                Form Builder
            </div>  
            <div className="header_menu">
                {/* --- SAVE FILE ----- */}
                <div className="icon" id="save-icon">
                    <img src={SaveFile} alt="Save form" className='icon_menu'/>
                    <span class="tooltip">Save form</span>
                </div>
                
                {/* --- LOAD FILE ----- */}
                <div className="icon" id="load-icon">
                <img src={OpenFile} alt="Load form" className='icon_menu'/>
                    <span class="tooltip">Load form</span>
                </div>

                {/* --- RESET FORM ----- */}
                <div className="icon" id="reset-icon">
                    <img src={Restart} alt="Reset form"   className='icon_menu' style={{width: '35px', marginBottom: '9px'}} onClick={handleReset}/>
                    <span class="tooltip">Restart form</span>
                </div>
            </div>         

        </header>
    );
  }