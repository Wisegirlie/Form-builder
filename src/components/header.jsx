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
                <img src={SaveFile} alt="Save form" className='icon_menu'/>
                <img src={OpenFile} alt="Load form" className='icon_menu'/>
                <img src={Restart} alt="Reset form" className='icon_menu' onClick={handleReset}/>
            </div>         

        </header>
    );
  }