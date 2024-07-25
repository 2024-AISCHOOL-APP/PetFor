import React from 'react';
import './SideImages.css';

function SideImages() {
    return (
        <div className="side-images-container">
            <div className="side-image-left">
                <img src="/images/leftbg.png" alt="Left Side" className='side-image-img left-img'/>
            </div>
            <div className="side-image-right">
                <img src="/images/rightbg.png" alt="Right Side" className='side-image-img right-img'/>
            </div>
        </div>
    );
}

export default SideImages;