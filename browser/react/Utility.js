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

export function nameCheck(str, artists) {
	let result = artists.filter(artist => {
		return str.toLowerCase().split('').every((letter,i) => str[i]=== artist.name[i].toLowerCase())
	});
	return result;
}

export function postObject(objData) {
	let header = new Headers({'Content-Type': 'application/json'});
	return {
		method: 'POST',
		headers: header,
		mode: 'cors',
		cache: 'default',
		body: JSON.stringify(objData)
	}
} 
//-----------------------sortable list utility method set-------------------------//
export let sortable = {};

sortable.rearrageOrder = function(currentPlaylist,dragOrder,dropOrder){
	let temp;
	currentPlaylist.songs.forEach((song)=>{
		if(song.order>dragOrder && song.order<=dropOrder) song.order = song.order-1;
		else if(song.order<dragOrder && song.order>=dropOrder) song.order = song.order+1;
		else if(song.order===dragOrder){
			if(song.order<dropOrder) {
				song.order = dropOrder;
			}else if(song.order>dropOrder) {
				song.order = dropOrder;
			}else {
				song.order=song.order;
			}
		}
	})
	return currentPlaylist;
}
sortable.targetOrder = function(eventObj){
	return parseInt(eventObj.target.parentElement.dataset.order);
}
sortable.deleteDropline = function(tempCurrentPlaylist,position){
	if(position!==undefined) tempCurrentPlaylist.songs.splice(position,1);
}
sortable.addDropline = function(tempCurrentPlaylist,position,status){
	if(status==='under') tempCurrentPlaylist.songs.splice(position+1,0,'dropline');
	else if(status==='top') tempCurrentPlaylist.songs.splice(position,0,'dropline');
}
sortable.createDropRegion = function(tempCurrentPlaylist,dragTargetOrder,enterTargetOrder){
	if(dragTargetOrder<enterTargetOrder){
		sortable.addDropline(tempCurrentPlaylist,enterTargetOrder,'under');
		return enterTargetOrder+1;
	}else if(dragTargetOrder>enterTargetOrder){
		sortable.addDropline(tempCurrentPlaylist,enterTargetOrder,'top');
		return enterTargetOrder;
	}else{
		return undefined;
	}
}