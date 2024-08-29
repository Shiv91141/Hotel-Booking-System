import React from 'react';

function Landingscreen() {
  const navigateToHome = () => {
    window.location.href = '/home'; // Redirects to the /home page
  };

  return (
    <div className='row landing justify-content-center'>
        <div className="col-md-9 my-auto">
            <h1 style={{fontSize:'130px'}}>BookMyRoom</h1>
            <h2>There is only one boss. The Guest.</h2>
            <button className='btn landing-btn' onClick={navigateToHome}>
              Get Started
            </button>
        </div>
    </div>
  );
}

export default Landingscreen;
