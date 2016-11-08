'use strict';

export const AUDIO = document.createElement('audio');

export function playMusic(songUrl) {
	audio.pause();
	audio.src = songUrl;
	audio.load();
	audio.play();
}

export function changeSong(type, songs, currentSong) {
	let currentIndex = songs.indexOf(currentSong);
	let max = songs.length;
	if(type==='next') {
		if(currentIndex<max-1) currentIndex++;
		else currentIndex = 0;
	}
	if(type==='previous') {
		if(currentIndex>0) currentIndex--;
		else currentIndex = songs.length-1;
	}
	let newSong = songs[currentIndex];
	//playMusic(newSong.url);
	return newSong;
}

export function forcePosition(length,pos) {
	let ratio = pos/length;
	AUDIO.currentTime = AUDIO.duration * ratio;
}