'use strict';
import React, {Component, PropTypes} from 'react';

const Footer = ({currentSong, playStatus, toggleSong, next, previous, progress}) => {
	return (
		 <footer className={Object.keys(currentSong).length === 0 ? 'hide' : ''}>
      <div>
        <div className="pull-left">
          <button className="btn btn-default" onClick={previous}>
            <span className="glyphicon glyphicon-step-backward"></span>
          </button>
          <button className="btn btn-default" onClick={toggleSong}>
            <span className={playStatus ? "glyphicon glyphicon-pause" : "glyphicon glyphicon-play"}></span>
          </button>
          <button className="btn btn-default" onClick={next}>
            <span className="glyphicon glyphicon-step-forward"></span>
          </button>
        </div>
        <div className="bar">
            <div className="progress">
              <div className="progress-bar" style={{width: `${progress}%`}}></div>
            </div>
          </div>
      </div>
    </footer>
	)
}

Footer.propTypes = {
  playStatus: PropTypes.bool.isRequired,
  toggleSong: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
  currentSong: PropTypes.object.isRequired
}
export default Footer;
