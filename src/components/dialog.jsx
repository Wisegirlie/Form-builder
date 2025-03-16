import '../css/dialog.css'
import Tick from '../assets/icon_tick.png'
import Cancel from '../assets/icon_cancel.png'

export default function Dialog({ title = "Message", message = "", error = false,  onClose }) {

    function closeDialog () {     
        if (onClose) {
            onClose();
        }
    }

    return (
        <div className="dialog-container" id="popup">
            <div className="dialog-innercontainer">                 
                <img className="dialog-icon" src={error ? Cancel : Tick} alt="Dialog Message" />  
                <div className="dialog-title">                    
                    {title}
                </div>
                <div className="dialog-message" style={{ whiteSpace: 'pre-line' }}>
                    {message}
                </div>
                <button className="close-button"  type="submit" onClick={closeDialog}>Close</button>
            </div>
        </div>
    );    
}