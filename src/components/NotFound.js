import React from 'react';
import { NavLink } from 'react-router-dom';


const NotFound = () => {
    return (
        <div className="notFound_block">
            <div className="note_found_container">
                <div className="container">
                    <div className="error_block">
                        <p className="error_text">404</p>
                        <p className="error_text_2">Ooops! <span className="error_text_span">Page not found</span></p>
                        <NavLink to="/">
                            <button className="error_btn">Take me back to homepage</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default NotFound;