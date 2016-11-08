'use strict';
import React, {Component, PropTypes} from 'react';

const Footer = ({currentSong, playStatus, toggle, progress, switchSong, scrubber, keypress}) => {
	return (
		 <footer className={Object.keys(currentSong).length === 0 ? 'hide' : ''}>
      <div>
        <div className="pull-left" onKeyDown={keypress}>
          <button className="btn btn-default" onClick={()=>{switchSong('previous')}}>
            <span className="glyphicon glyphicon-step-backward"></span>
          </button>
          <button className="btn btn-default" onClick={toggle}>
            <span className={playStatus ? "glyphicon glyphicon-pause" : "glyphicon glyphicon-play"}></span>
          </button>
          <button className="btn btn-default" onClick={()=>{switchSong('next')}}>
            <span className="glyphicon glyphicon-step-forward"></span>
          </button>
        </div>
        <div className="bar">
            <div className="progress" onClick={scrubber}>
              <div className="progress-bar" style={{width: `${progress}%`}}></div>
            </div>
          </div>
      </div>
    </footer>
	)
}

Footer.propTypes = {
  playStatus: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  switchSong: PropTypes.func.isRequired,
  currentSong: PropTypes.object.isRequired,
  scrubber: PropTypes.func.isRequired
}
export default Footer;
