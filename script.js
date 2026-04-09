(function(){
    var script = {
 "id": "rootPlayer",
 "backgroundPreloadEnabled": true,
 "defaultVRPointer": "laser",
 "contentOpaque": false,
 "children": [
  "this.MainViewer",
  "this.IconButton_73BA9036_6188_62E6_4184_1087114A21E4",
  "this.IconButton_7322B8D2_61B8_A3BE_419D_4310759BDA18",
  "this.IconButton_70360DBD_6188_DDEB_41D0_AAA5B4CEA917",
  "this.IconButton_4C86CA76_61D0_26EB_41B3_8D62F0AD5B96",
  "this.Container_6FF183D0_6198_A5B9_41D3_16AA14E99F59",
  "this.Image_78FDD995_6198_A5BA_41A7_887E54E905BA",
  "this.Image_7AB6A8C4_618B_A399_41BE_2668B95B6C2D",
  "this.Image_780EB065_6189_A29B_41CA_4DDA36878B05",
  "this.IconButton_7F8CF209_706B_308D_41D9_A686BF37E500",
  "this.Label_61A21684_7075_107B_41C3_74A8A7C1D8A6",
  "this.IconButton_61FB7A40_7075_10FB_41CC_53270AD6AB38",
  "this.IconButton_69A61E3A_70FB_F08F_41C6_7EAF2B44D7D7",
  "this.Container_4D62F6AF_61D1_EE7A_41B0_4D7149FE7E22",
  "this.IconButton_51EE390D_706D_1085_41B1_A9F098D07663"
 ],
 "vrPolyfillScale": 0.5,
 "paddingBottom": 0,
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_61FB7A40_7075_10FB_41CC_53270AD6AB38], 'cardboardAvailable'); this.syncPlaylists([this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_7322B8D2_61B8_A3BE_419D_4310759BDA18,this.IconButton_69A61E3A_70FB_F08F_41C6_7EAF2B44D7D7,this.IconButton_615DE8B2_7075_319C_41CF_85F44DF0DA29].forEach(function(component) { component.set('visible', false); }) }",
 "buttonToggleFullscreen": [
  "this.IconButton_7322B8D2_61B8_A3BE_419D_4310759BDA18",
  "this.IconButton_69A61E3A_70FB_F08F_41C6_7EAF2B44D7D7",
  "this.IconButton_615DE8B2_7075_319C_41CF_85F44DF0DA29"
 ],
 "width": "100%",
 "scripts": {
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "unregisterKey": function(key){  delete window[key]; },
  "registerKey": function(key, value){  window[key] = value; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "existsKey": function(key){  return key in window; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getKey": function(key){  return window[key]; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; }
 },
 "paddingRight": 0,
 "downloadEnabled": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minHeight": 20,
 "paddingLeft": 0,
 "propagateClick": false,
 "minWidth": 20,
 "buttonToggleMute": "this.IconButton_7F8CF209_706B_308D_41D9_A686BF37E500",
 "desktopMipmappingEnabled": false,
 "scrollBarMargin": 2,
 "class": "Player",
 "height": "100%",
 "borderSize": 0,
 "overflow": "visible",
 "definitions": [{
 "initialPosition": {
  "yaw": -121.18,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_59A6FC74_7195_1084_419E_58B868E9CB31",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "easing": "cubic_in_out",
 "id": "effect_51ED954A_706D_108F_4192_8E2E93295280",
 "class": "FadeInEffect",
 "duration": 1000
},
{
 "adjacentPanoramas": [
  {
   "yaw": -33.14,
   "panorama": "this.panorama_6B914805_6133_E229_41B0_E00B0E2DB53D",
   "class": "AdjacentPanorama",
   "backwardYaw": -62.85,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_475AE718_6170_2E27_41CD_0BCF8F479D4A",
  "this.overlay_66BED02E_70F7_1087_41CF_AA5532FC1E74",
  "this.overlay_6C02B9F3_70BD_339D_41D3_B80E6A20CBE7"
 ],
 "label": "Hang na 3",
 "id": "panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 127.09,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_591F2C34_7195_109B_41BE_57626C794A62",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 35.35,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_581CACC4_7195_11FB_41CC_E2FCABC6A301",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "yaw": -50.79,
   "panorama": "this.panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC",
   "class": "AdjacentPanorama",
   "backwardYaw": 58.82,
   "distance": 1
  },
  {
   "yaw": 40.79,
   "panorama": "this.panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF",
   "class": "AdjacentPanorama",
   "backwardYaw": 156.33,
   "distance": 1
  },
  {
   "yaw": 133.16,
   "panorama": "this.panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4",
   "class": "AdjacentPanorama",
   "backwardYaw": 38.55,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_6EA596BB_6130_EE59_41CA_1591AB9729F2",
  "this.overlay_712795C2_6130_222B_41A9_E382A8282E03",
  "this.overlay_7078C836_6130_226B_41CD_B538575D9F6D",
  "this.overlay_78878E14_618B_DEB9_41D8_0B5F94608185",
  "this.overlay_627DF137_709D_3085_41DC_18AF836ACB4A",
  "this.overlay_66B1834D_709D_1085_41B2_B4FBF25031D8",
  "this.overlay_66144C6B_70AD_108D_41D0_ECCB4606EE0A"
 ],
 "label": "Ng\u00e3 ba 1",
 "id": "panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -62.41,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_56657BEB_7195_178D_41B1_2E346D8851A4",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "audio": {
  "oggUrl": "media/audio_50E37A5B_70B5_708D_41D5_532D82CC8692.ogg",
  "class": "AudioResource",
  "mp3Url": "media/audio_50E37A5B_70B5_708D_41D5_532D82CC8692.mp3"
 },
 "data": {
  "label": "Th\u00e1c ng\u1ecdc"
 },
 "id": "audio_50E37A5B_70B5_708D_41D5_532D82CC8692",
 "autoplay": true,
 "class": "MediaAudio"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "yaw": -5.83,
   "panorama": "this.panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0",
   "class": "AdjacentPanorama",
   "backwardYaw": 9.54,
   "distance": 1
  },
  {
   "yaw": -86.83,
   "panorama": "this.panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59",
   "class": "AdjacentPanorama",
   "backwardYaw": 113.47,
   "distance": 1
  },
  {
   "yaw": 136.57,
   "panorama": "this.panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27",
   "class": "AdjacentPanorama",
   "backwardYaw": -139.72,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_73115943_6130_2229_41D4_14B8F9347658",
  "this.overlay_75359FAD_6130_1E79_41C0_F9F18FB6C2C5",
  "this.overlay_72941E1E_6130_1E5A_41BE_8D4276044036",
  "this.overlay_662CCDB1_70BD_339D_41D9_D443556B06AA",
  "this.overlay_6519FE87_70BF_1185_41DA_8B64C61143F2",
  "this.overlay_6462301D_70BF_1085_41D7_FAA8966F9FF4"
 ],
 "label": "B\u00e3i t\u1eafm 2",
 "id": "panorama_6B7FA29A_6130_265B_41AD_471BA11E0626",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 119.99,
   "panorama": "this.panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390",
   "class": "AdjacentPanorama",
   "backwardYaw": -105.28,
   "distance": 1
  },
  {
   "yaw": -52.91,
   "panorama": "this.panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06",
   "class": "AdjacentPanorama",
   "backwardYaw": 0.22,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_7B245916_6150_E22B_41D7_2CEA674FE2A9",
  "this.overlay_7A7C7B75_6150_26E9_41CA_C29B89D3C652",
  "this.overlay_669AC4A9_709D_318D_41AF_3B613657783A",
  "this.overlay_65CF1124_709D_10BB_41D7_381C5312D4AA"
 ],
 "label": "B\u1ea3n c\u1ecfi 1",
 "id": "panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": -39.73,
   "panorama": "this.panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59",
   "class": "AdjacentPanorama",
   "backwardYaw": -99.65,
   "distance": 1
  },
  {
   "yaw": 139.55,
   "panorama": "this.panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4",
   "class": "AdjacentPanorama",
   "backwardYaw": 105.09,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_72BACD5D_6130_62D9_41B8_E56F5E1618B2",
  "this.overlay_72C4B5D9_6130_2DD9_41D0_3C0AAF498039",
  "this.overlay_650EACD3_70B5_119D_41B9_C53167103143",
  "this.overlay_6796E909_70B5_108D_41D4_DAD1E6CF2371"
 ],
 "label": "B\u00e3i t\u1eafm 4",
 "id": "panorama_6BBCA94C_6130_223F_418E_FE4A484CF630",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 53.17,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_54D60B1B_7195_108D_41B9_C015EFD498AD",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 54.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_575FFB6E_7195_1087_41B5_6C9349598016",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "easing": "cubic_in_out",
 "id": "effect_51EDD54A_706D_108F_41C1_DF80C5AFEE02",
 "class": "FadeInEffect",
 "duration": 1000
},
{
 "adjacentPanoramas": [
  {
   "yaw": 156.33,
   "panorama": "this.panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4",
   "class": "AdjacentPanorama",
   "backwardYaw": 40.79,
   "distance": 1
  },
  {
   "yaw": -24.4,
   "panorama": "this.panorama_6B7D1844_6130_222F_41D0_9D76B720413D",
   "class": "AdjacentPanorama",
   "backwardYaw": 8.47,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_400E8132_6170_226B_41D1_D46BA76A9857",
  "this.overlay_40994593_6171_E229_41C1_E073BB0232CD",
  "this.overlay_66314DB6_7095_1387_41D6_583DD3634004",
  "this.overlay_6810A5F2_70EB_339F_41C9_C047FEC1F67E"
 ],
 "label": "\u0110\u01b0\u1eddng su\u1ed1i 1",
 "id": "panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "easing": "cubic_in_out",
 "id": "effect_51EE254A_706D_108F_41B8_BEB90F8ECC1A",
 "class": "FadeInEffect",
 "duration": 1000
},
{
 "audio": {
  "oggUrl": "media/audio_6A9AA43E_70ED_3087_41B8_BED2606FF920.ogg",
  "class": "AudioResource",
  "mp3Url": "media/audio_6A9AA43E_70ED_3087_41B8_BED2606FF920.mp3"
 },
 "data": {
  "label": "B\u00e3i t\u1eafm"
 },
 "id": "audio_6A9AA43E_70ED_3087_41B8_BED2606FF920",
 "autoplay": true,
 "class": "MediaAudio"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -105.28,
   "panorama": "this.panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A",
   "class": "AdjacentPanorama",
   "backwardYaw": 119.99,
   "distance": 1
  },
  {
   "yaw": 71.74,
   "panorama": "this.panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4",
   "class": "AdjacentPanorama",
   "backwardYaw": -128,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_783038D2_6150_622B_41D2_5934AF66DF3F",
  "this.overlay_789F8DCC_6150_223F_41C9_2097CF114653",
  "this.overlay_66C1CC6E_709B_1087_41CD_DB20D452A6F3",
  "this.overlay_65493376_709A_F087_41B5_89CA2D9D7850"
 ],
 "label": "\u0110\u01b0\u1eddng BC 1",
 "id": "panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 117.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_59970C74_7195_1084_41BA_63076480A8AD",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "audio": {
  "oggUrl": "media/audio_6BA61B1B_70BD_308D_41D3_F645DFB39793.ogg",
  "class": "AudioResource",
  "mp3Url": "media/audio_6BA61B1B_70BD_308D_41D3_F645DFB39793.mp3"
 },
 "data": {
  "label": "Su\u1ed1i"
 },
 "id": "audio_6BA61B1B_70BD_308D_41D3_F645DFB39793",
 "autoplay": true,
 "class": "MediaAudio"
},
{
 "audio": {
  "oggUrl": "media/audio_691AC936_7097_3087_4196_4799D7F622E4.ogg",
  "class": "AudioResource",
  "mp3Url": "media/audio_691AC936_7097_3087_4196_4799D7F622E4.mp3"
 },
 "data": {
  "label": "B\u1ea3n C\u1ecfi"
 },
 "id": "audio_691AC936_7097_3087_4196_4799D7F622E4",
 "autoplay": true,
 "class": "MediaAudio"
},
{
 "initialPosition": {
  "yaw": 169.3,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_54DFCB25_7195_1085_419A_0A5BCB1BD669",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 83.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_563BDBE0_7195_17BB_41DC_082BF6ABA34A",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "yaw": 165.21,
   "panorama": "this.panorama_6B91E651_6130_6E29_41D4_A295C83FBC71",
   "class": "AdjacentPanorama",
   "backwardYaw": 9.09,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_41D4B780_6170_2E27_41B9_D7196914947A",
  "this.overlay_66BC90AE_7095_1187_41AC_F3F32A7B46FB",
  "this.overlay_6A68D869_70AD_308D_41C0_4E24E8ED90E5"
 ],
 "label": "C\u00e2y ch\u00f2 CT 3",
 "id": "panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "easing": "cubic_in_out",
 "id": "effect_5176ED08_706F_108B_41DB_294C2461A6B2",
 "class": "FadeInEffect",
 "duration": 1000
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B43B321_6130_2666_41D3_AD4567F628D9_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -46.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_561E3BCB_7195_178C_41D9_1E4B2C1510A4",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -47.76,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_56C36C14_7195_109B_41DA_24C4B0668AA5",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -23.67,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_59B6AC84_7195_1184_417E_3EC37AFA5B6E",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "yaw": 62.3,
   "panorama": "this.panorama_6B914805_6133_E229_41B0_E00B0E2DB53D",
   "class": "AdjacentPanorama",
   "backwardYaw": 14.15,
   "distance": 1
  },
  {
   "yaw": 132.24,
   "panorama": "this.panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525",
   "class": "AdjacentPanorama",
   "backwardYaw": -58.76,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_450B0E51_6170_7E29_41D3_70B745EE2BC8",
  "this.overlay_459FB51A_6170_225B_41D0_A034DE69BF35",
  "this.overlay_66F4571C_70F5_F08B_41A2_6C1CE11580F9",
  "this.overlay_66809BF4_70F5_379B_41BB_4259E5ACBAD1"
 ],
 "label": "Hang na 1",
 "id": "panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "audio": {
  "oggUrl": "media/audio_6CC28647_70BB_7085_41C5_1FAAD73BA352.ogg",
  "class": "AudioResource",
  "mp3Url": "media/audio_6CC28647_70BB_7085_41C5_1FAAD73BA352.mp3"
 },
 "data": {
  "label": "Hang Na"
 },
 "id": "audio_6CC28647_70BB_7085_41C5_1FAAD73BA352",
 "autoplay": true,
 "class": "MediaAudio"
},
{
 "initialPosition": {
  "yaw": -74.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_56B11C14_7195_109B_41D6_0BCA509EBECB",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "easing": "cubic_in_out",
 "id": "effect_51EDA54A_706D_108F_41D7_B987AD1FA935",
 "class": "FadeOutEffect",
 "duration": 1000
},
{
 "initialPosition": {
  "yaw": -165.85,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_5938CC44_7195_10FB_41B8_721B52034600",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 34.79,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_573B5B59_7195_108D_41D5_7B7B30A28E6D",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -27.82,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_54FFDB3A_7195_108F_41D6_79874DFFAE08",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -140.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_5708AB44_7195_10FB_41C9_09AD505DD26C",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "yaw": 58.82,
   "panorama": "this.panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4",
   "class": "AdjacentPanorama",
   "backwardYaw": -50.79,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_6F2B4B62_6130_26EB_41D5_D05A42E77CA4",
  "this.overlay_77B5B20C_618F_A6AA_41C5_28F40937DD7B",
  "this.overlay_63BE5E41_709F_30FD_41C6_74F124D953EF",
  "this.overlay_6A747355_7095_3085_41BD_00115DD474E2"
 ],
 "label": "C\u1ed5ng 1",
 "id": "panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "easing": "cubic_in_out",
 "id": "effect_51EE154A_706D_108F_41D4_A48650B54F1E",
 "class": "FadeOutEffect",
 "duration": 1000
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 74.72,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_59F25CA4_7195_11BB_41A1_5945A1DE2B54",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 46.41,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_56FCCC34_7195_109B_41D7_B0E2403A0507",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "yaw": 103.1,
   "panorama": "this.panorama_6B43B321_6130_2666_41D3_AD4567F628D9",
   "class": "AdjacentPanorama",
   "backwardYaw": -70.9,
   "distance": 1
  },
  {
   "yaw": -23.89,
   "panorama": "this.panorama_6B47B9F2_6130_65EB_41C8_3108E319017E",
   "class": "AdjacentPanorama",
   "backwardYaw": 152.18,
   "distance": 1
  },
  {
   "yaw": -96.73,
   "panorama": "this.panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27",
   "class": "AdjacentPanorama",
   "backwardYaw": 39.5,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_7C2D42C7_6150_2629_41B4_F6627D3B7B4F",
  "this.overlay_7F5F54ED_6150_23F9_41C4_263F79E70255",
  "this.overlay_658206BB_70AB_118D_41D5_2F598C6ABB72",
  "this.overlay_66AAAE06_709D_1087_41DA_47F001CF6373",
  "this.overlay_67A51A2B_709B_708D_41B6_4C53462A9462",
  "this.overlay_6622336A_709B_308F_41D6_8C6400416691"
 ],
 "label": "B\u1ea3n c\u1ecfi 4",
 "id": "panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -117.7,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_57DDFBB8_7195_178B_41D5_3F3A4EB60598",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -14.79,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_57800B83_7195_107D_41D9_886FEE95A9C8",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "buttonPause": "this.IconButton_51EE390D_706D_1085_41B1_A9F098D07663",
 "displayPlaybackBar": true,
 "gyroscopeVerticalDraggingEnabled": true,
 "touchControlMode": "drag_rotation",
 "mouseControlMode": "drag_acceleration",
 "buttonCardboardView": "this.IconButton_61FB7A40_7075_10FB_41CC_53270AD6AB38",
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "class": "PanoramaPlayer"
},
{
 "initialPosition": {
  "yaw": -179.78,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_59FCECB4_7195_119B_41D7_F2C0F4E49B41",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -137.69,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_590F0C34_7195_109B_41D6_A56AE4D3EF38",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "yaw": -165.88,
   "panorama": "this.panorama_6B47B9F2_6130_65EB_41C8_3108E319017E",
   "class": "AdjacentPanorama",
   "backwardYaw": 18.55,
   "distance": 1
  },
  {
   "yaw": 9.09,
   "panorama": "this.panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2",
   "class": "AdjacentPanorama",
   "backwardYaw": 165.21,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_7ECFB3CD_6171_E639_41D4_39601F067097",
  "this.overlay_7EA0B9C4_6170_222E_41C7_A9EA8E553DD8",
  "this.overlay_66B4D807_7097_1085_41D7_B2B16FA6A560",
  "this.overlay_66CCE37F_7097_1085_41DB_E659EAB3942B"
 ],
 "label": "C\u00e2y ch\u00f2 CT 2",
 "id": "panorama_6B91E651_6130_6E29_41D4_A295C83FBC71",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "items": [
  {
   "media": "this.panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC",
   "camera": "this.panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4",
   "camera": "this.panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27",
   "camera": "this.panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7FA29A_6130_265B_41AD_471BA11E0626",
   "camera": "this.panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59",
   "camera": "this.panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6BBCA94C_6130_223F_418E_FE4A484CF630",
   "camera": "this.panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6BA0D60B_6131_EE39_41D2_9436B023038D",
   "camera": "this.panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F",
   "camera": "this.panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4",
   "camera": "this.panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0",
   "camera": "this.panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5",
   "camera": "this.panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D",
   "camera": "this.panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6BAD5413_6130_2229_41A6_999B26A24AC6",
   "camera": "this.panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA",
   "camera": "this.panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4",
   "camera": "this.panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390",
   "camera": "this.panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A",
   "camera": "this.panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06",
   "camera": "this.panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B43B321_6130_2666_41D3_AD4567F628D9",
   "camera": "this.panorama_6B43B321_6130_2666_41D3_AD4567F628D9_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B",
   "camera": "this.panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B47B9F2_6130_65EB_41C8_3108E319017E",
   "camera": "this.panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B91E651_6130_6E29_41D4_A295C83FBC71",
   "camera": "this.panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2",
   "camera": "this.panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF",
   "camera": "this.panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7D1844_6130_222F_41D0_9D76B720413D",
   "camera": "this.panorama_6B7D1844_6130_222F_41D0_9D76B720413D_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A",
   "camera": "this.panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525",
   "camera": "this.panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA",
   "camera": "this.panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B914805_6133_E229_41B0_E00B0E2DB53D",
   "camera": "this.panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA",
   "camera": "this.panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7FCCB1_6130_2269_41AF_E018598D941C",
   "camera": "this.panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7C6809_6130_6239_4190_B31908BEEF24",
   "camera": "this.panorama_6B7C6809_6130_6239_4190_B31908BEEF24_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.video_7184541C_6188_E2AA_41D6_E2FE3B100785",
   "end": "this.setComponentVisibility(this.IconButton_73BA9036_6188_62E6_4184_1087114A21E4, false, -1, this.effect_51ED854A_706D_108F_41D9_DC6FEA7BD986, 'hideEffect', false); this.setComponentVisibility(this.IconButton_7322B8D2_61B8_A3BE_419D_4310759BDA18, false, -1, this.effect_51EDA54A_706D_108F_41D7_B987AD1FA935, 'hideEffect', false); this.setComponentVisibility(this.IconButton_70360DBD_6188_DDEB_41D0_AAA5B4CEA917, true, -1, this.effect_51EDD54A_706D_108F_41C1_DF80C5AFEE02, 'showEffect', false); this.setComponentVisibility(this.IconButton_7F8CF209_706B_308D_41D9_A686BF37E500, true, -1, this.effect_51EDF54A_706D_108F_41C6_2CEDB871F1EB, 'showEffect', false); this.setComponentVisibility(this.Label_61A21684_7075_107B_41C3_74A8A7C1D8A6, true, -1, this.effect_51EE254A_706D_108F_41B8_BEB90F8ECC1A, 'showEffect', false); this.setComponentVisibility(this.IconButton_61FB7A40_7075_10FB_41CC_53270AD6AB38, true, -1, this.effect_51EE454C_706D_108B_41B0_BD62D794CCAE, 'showEffect', false); this.setComponentVisibility(this.IconButton_69A61E3A_70FB_F08F_41C6_7EAF2B44D7D7, true, -1, this.effect_51EE754C_706D_108B_41D1_BB0FA6162AF4, 'showEffect', false); this.setComponentVisibility(this.IconButton_51EE390D_706D_1085_41B1_A9F098D07663, false, -1, this.effect_5176DD08_706F_108B_41CD_103991148CE0, 'hideEffect', false)",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 32, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 32); this.keepComponentVisibility(this.IconButton_73BA9036_6188_62E6_4184_1087114A21E4, true); this.keepComponentVisibility(this.IconButton_7322B8D2_61B8_A3BE_419D_4310759BDA18, true); this.keepComponentVisibility(this.IconButton_70360DBD_6188_DDEB_41D0_AAA5B4CEA917, true); this.keepComponentVisibility(this.IconButton_7F8CF209_706B_308D_41D9_A686BF37E500, true); this.keepComponentVisibility(this.Label_61A21684_7075_107B_41C3_74A8A7C1D8A6, true); this.keepComponentVisibility(this.IconButton_61FB7A40_7075_10FB_41CC_53270AD6AB38, true); this.keepComponentVisibility(this.IconButton_69A61E3A_70FB_F08F_41C6_7EAF2B44D7D7, true); this.keepComponentVisibility(this.IconButton_51EE390D_706D_1085_41B1_A9F098D07663, true)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist, 32, 0); this.keepComponentVisibility(this.IconButton_73BA9036_6188_62E6_4184_1087114A21E4, false); this.setComponentVisibility(this.IconButton_73BA9036_6188_62E6_4184_1087114A21E4, true, -1, this.effect_51ED754A_706D_108F_41C2_87031AFE7627, 'showEffect', false); this.keepComponentVisibility(this.IconButton_7322B8D2_61B8_A3BE_419D_4310759BDA18, false); this.setComponentVisibility(this.IconButton_7322B8D2_61B8_A3BE_419D_4310759BDA18, true, -1, this.effect_51ED954A_706D_108F_4192_8E2E93295280, 'showEffect', false); this.keepComponentVisibility(this.IconButton_70360DBD_6188_DDEB_41D0_AAA5B4CEA917, false); this.setComponentVisibility(this.IconButton_70360DBD_6188_DDEB_41D0_AAA5B4CEA917, false, -1, this.effect_51EDC54A_706D_108F_41C7_9ED877E0D70B, 'hideEffect', false); this.keepComponentVisibility(this.IconButton_7F8CF209_706B_308D_41D9_A686BF37E500, false); this.setComponentVisibility(this.IconButton_7F8CF209_706B_308D_41D9_A686BF37E500, true, -1, this.effect_51EDE54A_706D_108F_41C7_89076320AEAC, 'showEffect', false); this.keepComponentVisibility(this.Label_61A21684_7075_107B_41C3_74A8A7C1D8A6, false); this.setComponentVisibility(this.Label_61A21684_7075_107B_41C3_74A8A7C1D8A6, false, -1, this.effect_51EE154A_706D_108F_41D4_A48650B54F1E, 'hideEffect', false); this.keepComponentVisibility(this.IconButton_61FB7A40_7075_10FB_41CC_53270AD6AB38, false); this.setComponentVisibility(this.IconButton_61FB7A40_7075_10FB_41CC_53270AD6AB38, false, -1, this.effect_51EE354C_706D_108B_41D7_D91981ADBC33, 'hideEffect', false); this.keepComponentVisibility(this.IconButton_69A61E3A_70FB_F08F_41C6_7EAF2B44D7D7, false); this.setComponentVisibility(this.IconButton_69A61E3A_70FB_F08F_41C6_7EAF2B44D7D7, false, -1, this.effect_51760D08_706F_108B_41CD_87AB6DF0AC52, 'hideEffect', false); this.keepComponentVisibility(this.IconButton_51EE390D_706D_1085_41B1_A9F098D07663, false); this.setComponentVisibility(this.IconButton_51EE390D_706D_1085_41B1_A9F098D07663, true, -1, this.effect_5176ED08_706F_108B_41DB_294C2461A6B2, 'showEffect', false)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "yaw": 126.37,
   "panorama": "this.panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D",
   "class": "AdjacentPanorama",
   "backwardYaw": 152.97,
   "distance": 1
  },
  {
   "yaw": -26.15,
   "panorama": "this.panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0",
   "class": "AdjacentPanorama",
   "backwardYaw": -127.94,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_77323400_6150_2227_41A7_33D530A58650",
  "this.overlay_7796463B_6150_2E59_41BF_75707CF732D4",
  "this.overlay_65FA9D66_70AF_1087_41C0_3D4E8F4488EC",
  "this.overlay_6638C0CC_70AF_118B_41D8_848EF517E71E"
 ],
 "label": "Hang c\u1ecfi 2",
 "id": "panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -141.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_59C0EC84_7195_1184_41B5_F2943AAACD43",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "easing": "cubic_in_out",
 "id": "effect_51EE454C_706D_108B_41B0_BD62D794CCAE",
 "class": "FadeInEffect",
 "duration": 1000
},
{
 "initialPosition": {
  "yaw": -5.06,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_57D25BB0_7195_179B_41B2_AD0FD153C684",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -76.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_57C00BA9_7195_178D_41C1_285EA7F7FFD5",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 146.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_57EC0BB8_7195_178B_41CE_BF746886EC10",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC",
   "camera": "this.panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4",
   "camera": "this.panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27",
   "camera": "this.panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7FA29A_6130_265B_41AD_471BA11E0626",
   "camera": "this.panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59",
   "camera": "this.panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6BBCA94C_6130_223F_418E_FE4A484CF630",
   "camera": "this.panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6BA0D60B_6131_EE39_41D2_9436B023038D",
   "camera": "this.panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F",
   "camera": "this.panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4",
   "camera": "this.panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0",
   "camera": "this.panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5",
   "camera": "this.panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D",
   "camera": "this.panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6BAD5413_6130_2229_41A6_999B26A24AC6",
   "camera": "this.panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA",
   "camera": "this.panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4",
   "camera": "this.panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390",
   "camera": "this.panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A",
   "camera": "this.panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06",
   "camera": "this.panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B43B321_6130_2666_41D3_AD4567F628D9",
   "camera": "this.panorama_6B43B321_6130_2666_41D3_AD4567F628D9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B",
   "camera": "this.panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B47B9F2_6130_65EB_41C8_3108E319017E",
   "camera": "this.panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B91E651_6130_6E29_41D4_A295C83FBC71",
   "camera": "this.panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2",
   "camera": "this.panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF",
   "camera": "this.panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7D1844_6130_222F_41D0_9D76B720413D",
   "camera": "this.panorama_6B7D1844_6130_222F_41D0_9D76B720413D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A",
   "camera": "this.panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525",
   "camera": "this.panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA",
   "camera": "this.panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B914805_6133_E229_41B0_E00B0E2DB53D",
   "camera": "this.panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA",
   "camera": "this.panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7FCCB1_6130_2269_41AF_E018598D941C",
   "camera": "this.panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6B7C6809_6130_6239_4190_B31908BEEF24",
   "camera": "this.panorama_6B7C6809_6130_6239_4190_B31908BEEF24_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.video_7184541C_6188_E2AA_41D6_E2FE3B100785",
   "end": "this.setComponentVisibility(this.IconButton_73BA9036_6188_62E6_4184_1087114A21E4, false, -1, this.effect_51ED854A_706D_108F_41D9_DC6FEA7BD986, 'hideEffect', false); this.setComponentVisibility(this.IconButton_7322B8D2_61B8_A3BE_419D_4310759BDA18, false, -1, this.effect_51EDA54A_706D_108F_41D7_B987AD1FA935, 'hideEffect', false); this.setComponentVisibility(this.IconButton_70360DBD_6188_DDEB_41D0_AAA5B4CEA917, true, -1, this.effect_51EDD54A_706D_108F_41C1_DF80C5AFEE02, 'showEffect', false); this.setComponentVisibility(this.IconButton_7F8CF209_706B_308D_41D9_A686BF37E500, true, -1, this.effect_51EDF54A_706D_108F_41C6_2CEDB871F1EB, 'showEffect', false); this.setComponentVisibility(this.Label_61A21684_7075_107B_41C3_74A8A7C1D8A6, true, -1, this.effect_51EE254A_706D_108F_41B8_BEB90F8ECC1A, 'showEffect', false); this.setComponentVisibility(this.IconButton_61FB7A40_7075_10FB_41CC_53270AD6AB38, true, -1, this.effect_51EE454C_706D_108B_41B0_BD62D794CCAE, 'showEffect', false); this.setComponentVisibility(this.IconButton_69A61E3A_70FB_F08F_41C6_7EAF2B44D7D7, true, -1, this.effect_51EE754C_706D_108B_41D1_BB0FA6162AF4, 'showEffect', false); this.setComponentVisibility(this.IconButton_51EE390D_706D_1085_41B1_A9F098D07663, false, -1, this.effect_5176DD08_706F_108B_41CD_103991148CE0, 'hideEffect', false); this.trigger('tourEnded')",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 32, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 32); this.keepComponentVisibility(this.IconButton_73BA9036_6188_62E6_4184_1087114A21E4, true); this.keepComponentVisibility(this.IconButton_7322B8D2_61B8_A3BE_419D_4310759BDA18, true); this.keepComponentVisibility(this.IconButton_70360DBD_6188_DDEB_41D0_AAA5B4CEA917, true); this.keepComponentVisibility(this.IconButton_7F8CF209_706B_308D_41D9_A686BF37E500, true); this.keepComponentVisibility(this.Label_61A21684_7075_107B_41C3_74A8A7C1D8A6, true); this.keepComponentVisibility(this.IconButton_61FB7A40_7075_10FB_41CC_53270AD6AB38, true); this.keepComponentVisibility(this.IconButton_69A61E3A_70FB_F08F_41C6_7EAF2B44D7D7, true); this.keepComponentVisibility(this.IconButton_51EE390D_706D_1085_41B1_A9F098D07663, true)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 32, 0); this.keepComponentVisibility(this.IconButton_73BA9036_6188_62E6_4184_1087114A21E4, false); this.setComponentVisibility(this.IconButton_73BA9036_6188_62E6_4184_1087114A21E4, true, -1, this.effect_51ED754A_706D_108F_41C2_87031AFE7627, 'showEffect', false); this.keepComponentVisibility(this.IconButton_7322B8D2_61B8_A3BE_419D_4310759BDA18, false); this.setComponentVisibility(this.IconButton_7322B8D2_61B8_A3BE_419D_4310759BDA18, true, -1, this.effect_51ED954A_706D_108F_4192_8E2E93295280, 'showEffect', false); this.keepComponentVisibility(this.IconButton_70360DBD_6188_DDEB_41D0_AAA5B4CEA917, false); this.setComponentVisibility(this.IconButton_70360DBD_6188_DDEB_41D0_AAA5B4CEA917, false, -1, this.effect_51EDC54A_706D_108F_41C7_9ED877E0D70B, 'hideEffect', false); this.keepComponentVisibility(this.IconButton_7F8CF209_706B_308D_41D9_A686BF37E500, false); this.setComponentVisibility(this.IconButton_7F8CF209_706B_308D_41D9_A686BF37E500, true, -1, this.effect_51EDE54A_706D_108F_41C7_89076320AEAC, 'showEffect', false); this.keepComponentVisibility(this.Label_61A21684_7075_107B_41C3_74A8A7C1D8A6, false); this.setComponentVisibility(this.Label_61A21684_7075_107B_41C3_74A8A7C1D8A6, false, -1, this.effect_51EE154A_706D_108F_41D4_A48650B54F1E, 'hideEffect', false); this.keepComponentVisibility(this.IconButton_61FB7A40_7075_10FB_41CC_53270AD6AB38, false); this.setComponentVisibility(this.IconButton_61FB7A40_7075_10FB_41CC_53270AD6AB38, false, -1, this.effect_51EE354C_706D_108B_41D7_D91981ADBC33, 'hideEffect', false); this.keepComponentVisibility(this.IconButton_69A61E3A_70FB_F08F_41C6_7EAF2B44D7D7, false); this.setComponentVisibility(this.IconButton_69A61E3A_70FB_F08F_41C6_7EAF2B44D7D7, false, -1, this.effect_51760D08_706F_108B_41CD_87AB6DF0AC52, 'hideEffect', false); this.keepComponentVisibility(this.IconButton_51EE390D_706D_1085_41B1_A9F098D07663, false); this.setComponentVisibility(this.IconButton_51EE390D_706D_1085_41B1_A9F098D07663, true, -1, this.effect_5176ED08_706F_108B_41DB_294C2461A6B2, 'showEffect', false)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "easing": "cubic_in_out",
 "id": "effect_5176DD08_706F_108B_41CD_103991148CE0",
 "class": "FadeOutEffect",
 "duration": 1000
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 156.11,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_595B3C54_7195_109B_41D2_2D90E307D243",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 155.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_572C6B59_7195_108D_41BD_2CDDBEAA7D68",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "yaw": 17.56,
   "panorama": "this.panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525",
   "class": "AdjacentPanorama",
   "backwardYaw": 125.5,
   "distance": 1
  },
  {
   "yaw": -145.21,
   "panorama": "this.panorama_6B7D1844_6130_222F_41D0_9D76B720413D",
   "class": "AdjacentPanorama",
   "backwardYaw": -144.65,
   "distance": 1
  },
  {
   "yaw": 42.31,
   "panorama": "this.panorama_6B7FCCB1_6130_2269_41AF_E018598D941C",
   "class": "AdjacentPanorama",
   "backwardYaw": -111.93,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_42D03E80_6170_1E27_41BC_E49B81EF3155",
  "this.overlay_4241DC79_6170_22D9_41D0_910F2077C8F2",
  "this.overlay_471E1A27_6150_2669_41B8_196B06AB64F5",
  "this.overlay_66CF7978_70EE_F08B_41BC_BC7EE73A34D6",
  "this.overlay_68A5203A_70EF_108F_41C6_EE6852FCD781",
  "this.overlay_65259FD4_70EB_2F9B_41CD_9EAB9C051F35"
 ],
 "label": "\u0110\u01b0\u1eddng su\u1ed1i 3",
 "id": "panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": -125.53,
   "panorama": "this.panorama_6BA0D60B_6131_EE39_41D2_9436B023038D",
   "class": "AdjacentPanorama",
   "backwardYaw": -126.83,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_74CC7739_6150_EE59_41D2_608AF8C519A3",
  "this.overlay_65FEC6B6_70AB_1187_41D4_1ED323FDDEB7"
 ],
 "label": "B\u00e3i t\u1eafm 6",
 "id": "panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -161.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_5777AB78_7195_108B_41D0_D2713183DA6E",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "yaw": 39.5,
   "panorama": "this.panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B",
   "class": "AdjacentPanorama",
   "backwardYaw": -96.73,
   "distance": 1
  },
  {
   "yaw": -139.72,
   "panorama": "this.panorama_6B7FA29A_6130_265B_41AD_471BA11E0626",
   "class": "AdjacentPanorama",
   "backwardYaw": 136.57,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_709DD2E6_6130_27EB_41D3_C0A0220F9AE6",
  "this.overlay_737B2492_6130_222A_41C1_D316106B40AC",
  "this.overlay_655AC2D0_70BB_F19B_41D2_45133B8A9FAF",
  "this.overlay_650D8352_70BB_109F_41C6_A60180DDF715"
 ],
 "label": "B\u00e3i t\u1eafm 1",
 "id": "panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 117.59,
   "panorama": "this.panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D",
   "class": "AdjacentPanorama",
   "backwardYaw": -10.7,
   "distance": 1
  },
  {
   "yaw": -38.08,
   "panorama": "this.panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA",
   "class": "AdjacentPanorama",
   "backwardYaw": -96.8,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_76F24222_6151_E66B_41BF_CAA66CDF8F93",
  "this.overlay_76AB8059_6150_E2D9_41D7_DD4565D00E41",
  "this.overlay_65B2D6F6_70AB_1187_41B4_E82BC5308E33",
  "this.overlay_66A8E737_70AA_F085_41C7_ECF4C65D72F7"
 ],
 "label": "Hang c\u1ecfi 4",
 "id": "panorama_6BAD5413_6130_2229_41A6_999B26A24AC6",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "buttonPause": "this.IconButton_51EE390D_706D_1085_41B1_A9F098D07663",
 "displayPlaybackBar": true,
 "viewerArea": "this.MainViewer",
 "id": "MainViewerVideoPlayer",
 "class": "VideoPlayer"
},
{
 "initialPosition": {
  "yaw": 174.17,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_5714CB44_7195_10FB_41C6_037890E0BDB6",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "yaw": 8.47,
   "panorama": "this.panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF",
   "class": "AdjacentPanorama",
   "backwardYaw": -24.4,
   "distance": 1
  },
  {
   "yaw": -144.65,
   "panorama": "this.panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A",
   "class": "AdjacentPanorama",
   "backwardYaw": -145.21,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_434EABF8_6170_25E6_41C6_213678F04815",
  "this.overlay_43CB98D6_6170_622A_41C2_79513B60F570",
  "this.overlay_660CCBB8_70EB_178B_41BE_1363C6AF1999",
  "this.overlay_6690C7BF_70ED_1F85_41CB_9E04E71C3507"
 ],
 "label": "\u0110\u01b0\u1eddng su\u1ed1i 2",
 "id": "panorama_6B7D1844_6130_222F_41D0_9D76B720413D",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -170.46,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_57986B8D_7195_1785_41D3_C9245B81B03B",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 141.92,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_5984FC64_7195_10BB_41D6_04DF7A1DA20E",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B7C6809_6130_6239_4190_B31908BEEF24_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "yaw": -10.7,
   "panorama": "this.panorama_6BAD5413_6130_2229_41A6_999B26A24AC6",
   "class": "AdjacentPanorama",
   "backwardYaw": 117.59,
   "distance": 1
  },
  {
   "yaw": 152.97,
   "panorama": "this.panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5",
   "class": "AdjacentPanorama",
   "backwardYaw": 126.37,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_76637899_6150_6259_41D4_510B8C2F4530",
  "this.overlay_7668CD3C_6150_225F_41D5_A8A585F37BFA",
  "this.overlay_65BD7E89_70AF_318D_41BF_02905C625905",
  "this.overlay_65F543A8_70AD_378B_41B4_D95A17D7D9D8"
 ],
 "label": "Hang c\u1ecfi 3",
 "id": "panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -43.43,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_564B8BE0_7195_17BB_41D4_7B6E452691F9",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -171.53,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_560E6BCB_7195_178C_41C6_4967DB437DAA",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "audio": {
  "oggUrl": "media/audio_67D3B1CB_70FD_F38D_41D0_415B94284D2D.ogg",
  "class": "AudioResource",
  "mp3Url": "media/audio_67D3B1CB_70FD_F38D_41D0_415B94284D2D.mp3"
 },
 "data": {
  "label": "thuy\u1ebft minh 1"
 },
 "id": "audio_67D3B1CB_70FD_F38D_41D0_415B94284D2D",
 "autoplay": true,
 "class": "MediaAudio"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -40.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_56E2EC24_7195_10BB_41C6_6E8554275FB5",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 109.1,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_54F0DB2F_7195_1085_41D7_DBF2E2EC3F81",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -13.87,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_59290C44_7195_10FB_41C3_1351DCF9DD39",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "yaw": -58.76,
   "panorama": "this.panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA",
   "class": "AdjacentPanorama",
   "backwardYaw": 132.24,
   "distance": 1
  },
  {
   "yaw": 125.5,
   "panorama": "this.panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A",
   "class": "AdjacentPanorama",
   "backwardYaw": 17.56,
   "distance": 1
  },
  {
   "panorama": "this.panorama_6B7FCCB1_6130_2269_41AF_E018598D941C",
   "class": "AdjacentPanorama"
  }
 ],
 "overlays": [
  "this.overlay_45EF16F5_6170_2FE9_41CF_87F928E176B1",
  "this.overlay_450C000E_6170_223B_41BE_32D54D4838AE",
  "this.overlay_47963449_6150_2239_41D8_037CF0A7BE6F",
  "this.overlay_66DCFBF1_70EB_179D_41D3_274C460DE4DE",
  "this.overlay_68CD5DB7_70EB_1385_41C9_EE193CF891F1",
  "this.overlay_66397E89_70F5_318D_41AB_49041FA723BE"
 ],
 "label": "\u0110\u01b0\u1eddng su\u1ed1i 4",
 "id": "panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 52,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_56970C05_7195_1085_41D5_4912ED10AE9E",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -53.63,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_56750BF7_7195_1785_41CC_384B506D3D05",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 52.06,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_59E28C94_7195_119B_41CA_107B4ECEAB79",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 121.24,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_5948BC54_7195_109B_41D4_AB5D644FC174",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 129.21,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_56558BEB_7195_178D_41B8_AD6620C98B90",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "yaw": 9.54,
   "panorama": "this.panorama_6B7FA29A_6130_265B_41AD_471BA11E0626",
   "class": "AdjacentPanorama",
   "backwardYaw": -5.83,
   "distance": 1
  },
  {
   "yaw": -127.94,
   "panorama": "this.panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5",
   "class": "AdjacentPanorama",
   "backwardYaw": -26.15,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_7753A925_6150_E269_41C5_32D9F214B28E",
  "this.overlay_775F3971_6150_22E9_41BE_AD933EE04C87",
  "this.overlay_65169B7C_70AD_F08B_41B1_3B9A04F06A32",
  "this.overlay_66CA1687_70AD_7184_41C2_AA52D4894049"
 ],
 "label": "Hang c\u1ecfi 1",
 "id": "panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 0.22,
   "panorama": "this.panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A",
   "class": "AdjacentPanorama",
   "backwardYaw": -52.91,
   "distance": 1
  },
  {
   "yaw": 174.94,
   "panorama": "this.panorama_6B43B321_6130_2666_41D3_AD4567F628D9",
   "class": "AdjacentPanorama",
   "backwardYaw": 166.13,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_7ACDF2C5_6150_6629_41A3_9B852264EC3B",
  "this.overlay_7ABF539A_6153_E65B_41C6_9346C44D058E",
  "this.overlay_66EC586F_709F_1085_41D6_19D3A02AD2C5",
  "this.overlay_66BF0BFA_709F_178F_41D3_DB47A093C6FC"
 ],
 "label": "b\u1ea3n c\u1ecfi 2",
 "id": "panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 105.09,
   "panorama": "this.panorama_6BBCA94C_6130_223F_418E_FE4A484CF630",
   "class": "AdjacentPanorama",
   "backwardYaw": 139.55,
   "distance": 1
  },
  {
   "yaw": -64.44,
   "panorama": "this.panorama_6BA0D60B_6131_EE39_41D2_9436B023038D",
   "class": "AdjacentPanorama",
   "backwardYaw": -8.49,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_7502163F_6130_2E59_41C0_839F1A40D0C9",
  "this.overlay_754D3517_6130_6229_41D3_E6C2EEA5DEB9",
  "this.overlay_65322692_70AB_319F_41D9_23A6BE97D22D"
 ],
 "label": "Ch\u00f2i ngh\u1ec9 BT",
 "id": "panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "easing": "cubic_in_out",
 "id": "effect_51EDC54A_706D_108F_41C7_9ED877E0D70B",
 "class": "FadeOutEffect",
 "duration": 1000
},
{
 "audio": {
  "oggUrl": "media/audio_6A809B17_709F_1085_41C7_3509F168B571.ogg",
  "class": "AudioResource",
  "mp3Url": "media/audio_6A809B17_709F_1085_41C7_3509F168B571.mp3"
 },
 "data": {
  "label": "Hang C\u1ecfi"
 },
 "id": "audio_6A809B17_709F_1085_41C7_3509F168B571",
 "autoplay": true,
 "class": "MediaAudio"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B7D1844_6130_222F_41D0_9D76B720413D_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 80.35,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_56A17C05_7195_1085_41D4_53BD726FD6C2",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "yaw": -70.9,
   "panorama": "this.panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B",
   "class": "AdjacentPanorama",
   "backwardYaw": 103.1,
   "distance": 1
  },
  {
   "yaw": 166.13,
   "panorama": "this.panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06",
   "class": "AdjacentPanorama",
   "backwardYaw": 174.94,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_7D2F2C26_6150_226B_41C9_42EE00439895",
  "this.overlay_7DE080A4_6150_626F_41D1_362B35B5CA72",
  "this.overlay_66E57732_709D_109F_41D2_DB8109C00501",
  "this.overlay_68001AC9_709D_118D_41D9_9F4673077141"
 ],
 "label": "B\u1ea3n c\u1ecfi 3",
 "id": "panorama_6B43B321_6130_2666_41D3_AD4567F628D9",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 15.34,
  "class": "PanoramaCameraPosition",
  "pitch": 1.69
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 153.85,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_5723EB4F_7195_1085_41CC_846EF710AF25",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -111.75,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_578F4B8D_7195_1785_41D0_4AF570D3608A",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -162.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_56D2DC14_7195_109B_41A8_A7F2F67A32D3",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 140.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_57536B63_7195_10BC_41B1_CB50C256DAEB",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "audio": {
  "oggUrl": "media/audio_6AA45DF2_709B_339C_41CC_B594FB142614.ogg",
  "class": "AudioResource",
  "mp3Url": "media/audio_6AA45DF2_709B_339C_41CC_B594FB142614.mp3"
 },
 "data": {
  "label": "C\u1ecdn n\u01b0\u1edbc"
 },
 "id": "audio_6AA45DF2_709B_339C_41CC_B594FB142614",
 "autoplay": true,
 "class": "MediaAudio"
},
{
 "initialPosition": {
  "yaw": -10.16,
  "class": "PanoramaCameraPosition",
  "pitch": -13.18
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "easing": "cubic_in_out",
 "id": "effect_51ED754A_706D_108F_41C2_87031AFE7627",
 "class": "FadeInEffect",
 "duration": 1000
},
{
 "audio": {
  "oggUrl": "media/audio_6BA02EF5_70AF_3185_41CB_C271F0A3144B.ogg",
  "class": "AudioResource",
  "mp3Url": "media/audio_6BA02EF5_70AF_3185_41CB_C271F0A3144B.mp3"
 },
 "data": {
  "label": "C\u00e2y ch\u00f2 c\u1ed5 th\u1ee5"
 },
 "id": "audio_6BA02EF5_70AF_3185_41CB_C271F0A3144B",
 "autoplay": true,
 "class": "MediaAudio"
},
{
 "initialPosition": {
  "yaw": 115.56,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_57687B78_7195_108B_41D9_B3960623A5B8",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 83.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_54E4CB2F_7195_1085_41A6_3D64EC60C59D",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 40.28,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_57B08BA2_7195_17BF_41C6_CA302032F68A",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "easing": "cubic_in_out",
 "id": "effect_51EDF54A_706D_108F_41C6_2CEDB871F1EB",
 "class": "FadeInEffect",
 "duration": 1000
},
{
 "initialPosition": {
  "yaw": -170.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_59750C64_7195_10BB_41C7_8A69AA2FEF3E",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "scaleMode": "fit_outside",
 "label": "Gi\u1edbi thi\u1ec7u",
 "class": "Video",
 "width": 2560,
 "loop": false,
 "thumbnailUrl": "media/video_7184541C_6188_E2AA_41D6_E2FE3B100785_t.jpg",
 "end": "this.setComponentVisibility(this.IconButton_73BA9036_6188_62E6_4184_1087114A21E4, false, -1, this.effect_51ED854A_706D_108F_41D9_DC6FEA7BD986, 'hideEffect', false); this.setComponentVisibility(this.IconButton_7322B8D2_61B8_A3BE_419D_4310759BDA18, false, -1, this.effect_51EDA54A_706D_108F_41D7_B987AD1FA935, 'hideEffect', false); this.setComponentVisibility(this.IconButton_70360DBD_6188_DDEB_41D0_AAA5B4CEA917, true, -1, this.effect_51EDD54A_706D_108F_41C1_DF80C5AFEE02, 'showEffect', false); this.setComponentVisibility(this.IconButton_7F8CF209_706B_308D_41D9_A686BF37E500, true, -1, this.effect_51EDF54A_706D_108F_41C6_2CEDB871F1EB, 'showEffect', false); this.setComponentVisibility(this.Label_61A21684_7075_107B_41C3_74A8A7C1D8A6, true, -1, this.effect_51EE254A_706D_108F_41B8_BEB90F8ECC1A, 'showEffect', false); this.setComponentVisibility(this.IconButton_61FB7A40_7075_10FB_41CC_53270AD6AB38, true, -1, this.effect_51EE454C_706D_108B_41B0_BD62D794CCAE, 'showEffect', false); this.setComponentVisibility(this.IconButton_69A61E3A_70FB_F08F_41C6_7EAF2B44D7D7, true, -1, this.effect_51EE754C_706D_108B_41D1_BB0FA6162AF4, 'showEffect', false); this.setComponentVisibility(this.IconButton_51EE390D_706D_1085_41B1_A9F098D07663, false, -1, this.effect_5176DD08_706F_108B_41CD_103991148CE0, 'hideEffect', false); this.setComponentVisibility(this.IconButton_73BA9036_6188_62E6_4184_1087114A21E4, false, -1, this.effect_51ED854A_706D_108F_41D9_DC6FEA7BD986, 'hideEffect', false); this.setComponentVisibility(this.IconButton_7322B8D2_61B8_A3BE_419D_4310759BDA18, false, -1, this.effect_51EDA54A_706D_108F_41D7_B987AD1FA935, 'hideEffect', false); this.setComponentVisibility(this.IconButton_70360DBD_6188_DDEB_41D0_AAA5B4CEA917, true, -1, this.effect_51EDD54A_706D_108F_41C1_DF80C5AFEE02, 'showEffect', false); this.setComponentVisibility(this.IconButton_7F8CF209_706B_308D_41D9_A686BF37E500, true, -1, this.effect_51EDF54A_706D_108F_41C6_2CEDB871F1EB, 'showEffect', false); this.setComponentVisibility(this.Label_61A21684_7075_107B_41C3_74A8A7C1D8A6, true, -1, this.effect_51EE254A_706D_108F_41B8_BEB90F8ECC1A, 'showEffect', false); this.setComponentVisibility(this.IconButton_61FB7A40_7075_10FB_41CC_53270AD6AB38, true, -1, this.effect_51EE454C_706D_108B_41B0_BD62D794CCAE, 'showEffect', false); this.setComponentVisibility(this.IconButton_69A61E3A_70FB_F08F_41C6_7EAF2B44D7D7, true, -1, this.effect_51EE754C_706D_108B_41D1_BB0FA6162AF4, 'showEffect', false); this.setComponentVisibility(this.IconButton_51EE390D_706D_1085_41B1_A9F098D07663, false, -1, this.effect_5176DD08_706F_108B_41CD_103991148CE0, 'hideEffect', false)",
 "id": "video_7184541C_6188_E2AA_41D6_E2FE3B100785",
 "height": 1440,
 "video": {
  "mp4Url": "media/video_7184541C_6188_E2AA_41D6_E2FE3B100785.mp4",
  "width": 2560,
  "class": "VideoResource",
  "height": 1440
 }
},
{
 "initialPosition": {
  "yaw": -60.01,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_56878BF7_7195_1785_41BA_E85794F6F41C",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -139.21,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_57FC7BC1_7195_17FD_41C9_3E2B0D605060",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -54.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_580CDCC4_7195_11FB_41DB_447425AFE38C",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "easing": "cubic_in_out",
 "id": "effect_51760D08_706F_108B_41CD_87AB6DF0AC52",
 "class": "FadeOutEffect",
 "duration": 1000
},
{
 "initialPosition": {
  "yaw": -108.26,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_56299BD6_7195_1787_41B6_418B9B4E7BE2",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "easing": "cubic_in_out",
 "id": "effect_51EE754C_706D_108B_41D1_BB0FA6162AF4",
 "class": "FadeInEffect",
 "duration": 1000
},
{
 "adjacentPanoramas": [
  {
   "yaw": 152.18,
   "panorama": "this.panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B",
   "class": "AdjacentPanorama",
   "backwardYaw": -23.89,
   "distance": 1
  },
  {
   "yaw": 18.55,
   "panorama": "this.panorama_6B91E651_6130_6E29_41D4_A295C83FBC71",
   "class": "AdjacentPanorama",
   "backwardYaw": -165.88,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_7FF6969B_6170_2E59_41D6_170CE39B799C",
  "this.overlay_7E0D37C0_6170_EE27_41D3_E6B21BFBE8F2",
  "this.overlay_66EBAA36_7095_7087_41D3_7301D310996E",
  "this.overlay_675D9378_7095_108B_41D1_9536F513B6EB"
 ],
 "label": "C\u00e2y ch\u00f2 CT 1",
 "id": "panorama_6B47B9F2_6130_65EB_41C8_3108E319017E",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 113.47,
   "panorama": "this.panorama_6B7FA29A_6130_265B_41AD_471BA11E0626",
   "class": "AdjacentPanorama",
   "backwardYaw": -86.83,
   "distance": 1
  },
  {
   "yaw": -99.65,
   "panorama": "this.panorama_6BBCA94C_6130_223F_418E_FE4A484CF630",
   "class": "AdjacentPanorama",
   "backwardYaw": -39.73,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_723767BD_6130_2E59_41C9_7E9D61C8B98B",
  "this.overlay_7274E6A4_6130_6E6F_41D5_2769E6CCCFB3",
  "this.overlay_65984E3F_70BD_3085_41D5_5E3D01621A02",
  "this.overlay_653747A7_70BB_1F85_41D1_22C60E691F18"
 ],
 "label": "B\u00e3i t\u1eafm 3",
 "id": "panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "audio": {
  "oggUrl": "media/audio_6B3BE08D_70BB_1185_41C5_EA39A928F4E4.ogg",
  "class": "AudioResource",
  "mp3Url": "media/audio_6B3BE08D_70BB_1185_41C5_EA39A928F4E4.mp3"
 },
 "data": {
  "label": "C\u1ea7u qua su\u1ed1i"
 },
 "id": "audio_6B3BE08D_70BB_1185_41C5_EA39A928F4E4",
 "autoplay": true,
 "class": "MediaAudio"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 68.25,
   "panorama": "this.panorama_6B7C6809_6130_6239_4190_B31908BEEF24",
   "class": "AdjacentPanorama",
   "backwardYaw": -133.59,
   "distance": 1
  },
  {
   "yaw": -111.93,
   "panorama": "this.panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A",
   "class": "AdjacentPanorama",
   "backwardYaw": 42.31,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_4657E6A7_6150_2E69_41B2_8F9534ED7463",
  "this.overlay_46CC573D_6150_6E59_41A2_2E56B4BDE30A",
  "this.overlay_79A682B8_6188_67E9_41D4_6563795214C7",
  "this.overlay_662A122D_70F7_3085_41D7_F7BFA4C73EC7",
  "this.overlay_68ADBC57_70F5_3085_41B5_615B41FDAB5E"
 ],
 "label": "Th\u00e1c ng\u1ecdc 1",
 "id": "panorama_6B7FCCB1_6130_2269_41AF_E018598D941C",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -27.03,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_59D04C84_7195_1184_41A0_57B4BEAF5AA6",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 171.51,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_56ED0C24_7195_10BB_41D1_AAD05AD0E405",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "yaw": 14.15,
   "panorama": "this.panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA",
   "class": "AdjacentPanorama",
   "backwardYaw": 62.3,
   "distance": 1
  },
  {
   "yaw": -62.85,
   "panorama": "this.panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA",
   "class": "AdjacentPanorama",
   "backwardYaw": -33.14,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_44710371_6170_E6E9_41D7_FE78B4BF6163",
  "this.overlay_44C677E9_6173_EDF9_41CD_104D496B846F",
  "this.overlay_66B9DA92_70F7_319F_41D7_D46FD7B4A54C",
  "this.overlay_66C5949F_70F7_1184_41C3_B40E78CF6EB9"
 ],
 "label": "Hang na 2",
 "id": "panorama_6B914805_6133_E229_41B0_E00B0E2DB53D",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 38.55,
   "panorama": "this.panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4",
   "class": "AdjacentPanorama",
   "backwardYaw": 133.16,
   "distance": 1
  },
  {
   "yaw": -128,
   "panorama": "this.panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390",
   "class": "AdjacentPanorama",
   "backwardYaw": 71.74,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_79876144_6150_622F_41D5_925BFDB597FF",
  "this.overlay_79B69F24_6150_7E6F_41D3_4158846D151D",
  "this.overlay_66B2053D_7095_1085_41C2_7FA0C5FFDF45",
  "this.overlay_6618A37D_709B_3085_41DB_7EE3454A3FF7",
  "this.overlay_696CBB9C_709B_378B_41A6_BDB1808AA435",
  "this.overlay_6DF9BC73_7095_709D_4192_981EAA9EB5E3"
 ],
 "label": "C\u1ecdn n\u01b0\u1edbc 1",
 "id": "panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 93.17,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_57440B63_7195_10BC_41D2_1ABD8F9A9785",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "easing": "cubic_in_out",
 "id": "effect_51EDE54A_706D_108F_41C7_89076320AEAC",
 "class": "FadeInEffect",
 "duration": 1000
},
{
 "easing": "cubic_in_out",
 "id": "effect_51EE354C_706D_108B_41D7_D91981ADBC33",
 "class": "FadeOutEffect",
 "duration": 1000
},
{
 "adjacentPanoramas": [
  {
   "yaw": -96.8,
   "panorama": "this.panorama_6BAD5413_6130_2229_41A6_999B26A24AC6",
   "class": "AdjacentPanorama",
   "backwardYaw": -38.08,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_79C797BD_6153_EE59_41AB_16F7CDE10E43",
  "this.overlay_659FEB37_7095_1085_41DB_FECAB65048EE"
 ],
 "label": "Hang c\u1ecfi 5",
 "id": "panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "easing": "cubic_in_out",
 "id": "effect_51ED854A_706D_108F_41D9_DC6FEA7BD986",
 "class": "FadeOutEffect",
 "duration": 1000
},
{
 "initialPosition": {
  "yaw": -66.53,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_57A7AB97_7195_1785_41A3_69A471F73CC2",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 14.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_596A8C64_7195_10BB_41D2_B465BD8BD2FF",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "yaw": -133.59,
   "panorama": "this.panorama_6B7FCCB1_6130_2269_41AF_E018598D941C",
   "class": "AdjacentPanorama",
   "backwardYaw": 68.25,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_492225BF_6150_6259_41D3_6AC0ABAE1380",
  "this.overlay_66A5E2AC_70F5_F18B_41DB_745C49F97A8A",
  "this.overlay_6EF4CAFC_70BB_118B_41B4_71F32603B1A4"
 ],
 "label": "Th\u00e1c ng\u1ecdc 2",
 "id": "panorama_6B7C6809_6130_6239_4190_B31908BEEF24",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 68.07,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_582F3CD4_7195_119B_41D2_02FDAB3A7A25",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "yaw": -126.83,
   "panorama": "this.panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F",
   "class": "AdjacentPanorama",
   "backwardYaw": -125.53,
   "distance": 1
  },
  {
   "yaw": -8.49,
   "panorama": "this.panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4",
   "class": "AdjacentPanorama",
   "backwardYaw": -64.44,
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_758414AE_6130_E27B_41D3_9A207F871D82",
  "this.overlay_75C1BBC8_6130_2627_41CB_08C3B48A5A1E",
  "this.overlay_65EB97A3_70B7_1FBD_41CD_B01C87B5E75E"
 ],
 "label": "B\u00e3i t\u1eafm 5",
 "id": "panorama_6BA0D60B_6131_EE39_41D2_9436B023038D",
 "class": "Panorama",
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 4096,
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "playbackBarHeadShadowOpacity": 0.7,
 "progressBarOpacity": 1,
 "id": "MainViewer",
 "toolTipBorderSize": 1,
 "progressBorderSize": 0,
 "toolTipPaddingRight": 6,
 "playbackBarBorderColor": "#FFFFFF",
 "width": "100%",
 "progressBorderRadius": 0,
 "paddingBottom": 0,
 "toolTipPaddingTop": 4,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipPaddingLeft": 6,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarLeft": 0,
 "minHeight": 50,
 "progressBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "toolTipBorderRadius": 3,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarBottom": 5,
 "progressBarBorderColor": "#000000",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "minWidth": 100,
 "toolTipShadowSpread": 0,
 "class": "ViewerArea",
 "height": "100%",
 "borderSize": 0,
 "toolTipBorderColor": "#767676",
 "playbackBarHeadOpacity": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "displayTooltipInTouchScreens": true,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "shadow": false,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "paddingTop": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 1,
 "transitionMode": "blending",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "data": {
  "name": "Main Viewer"
 },
 "vrPointerColor": "#FFFFFF"
},
{
 "maxHeight": 348,
 "maxWidth": 348,
 "id": "IconButton_73BA9036_6188_62E6_4184_1087114A21E4",
 "width": 30.6,
 "right": "0%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "paddingLeft": 0,
 "top": "0.12%",
 "propagateClick": false,
 "height": 26.4,
 "minWidth": 1,
 "mode": "push",
 "transparencyActive": false,
 "iconURL": "skin/IconButton_73BA9036_6188_62E6_4184_1087114A21E4.png",
 "class": "IconButton",
 "borderSize": 0,
 "click": "this.setStartTimeVideo(this.video_7184541C_6188_E2AA_41D6_E2FE3B100785, 29.05); this.mainPlayList.set('selectedIndex', 32); this.MainViewerVideoPlayer.play(); this.setComponentVisibility(this.IconButton_70360DBD_6188_DDEB_41D0_AAA5B4CEA917, true, 0, null, null, false); this.setComponentVisibility(this.Label_61A21684_7075_107B_41C3_74A8A7C1D8A6, true, 0, null, null, false); this.setComponentVisibility(this.IconButton_615DE8B2_7075_319C_41CF_85F44DF0DA29, true, 0, null, null, false); this.setComponentVisibility(this.IconButton_61FB7A40_7075_10FB_41CC_53270AD6AB38, true, 0, null, null, false); this.historyGoBack(this.mainPlayList); this.setComponentVisibility(this.IconButton_73BA9036_6188_62E6_4184_1087114A21E4, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_7322B8D2_61B8_A3BE_419D_4310759BDA18, false, 0, null, null, false)",
 "horizontalAlign": "center",
 "data": {
  "name": "tat video"
 },
 "shadow": false,
 "visible": false,
 "paddingTop": 0
},
{
 "toolTipFontColor": "#FFFFFF",
 "maxHeight": 128,
 "maxWidth": 128,
 "id": "IconButton_7322B8D2_61B8_A3BE_419D_4310759BDA18",
 "width": 42.75,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "right": "3.45%",
 "toolTipBorderSize": 1,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "paddingRight": 0,
 "toolTipPaddingRight": 6,
 "minHeight": 1,
 "toolTipDisplayTime": 600,
 "toolTipFontStyle": "normal",
 "toolTipPaddingLeft": 6,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "paddingLeft": 0,
 "toolTipBorderRadius": 3,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "height": 35.5,
 "toolTipFontFamily": "Arial",
 "minWidth": 1,
 "mode": "toggle",
 "transparencyActive": true,
 "toolTip": "Fullscreen",
 "iconURL": "skin/IconButton_7322B8D2_61B8_A3BE_419D_4310759BDA18.png",
 "bottom": "0.12%",
 "toolTipShadowSpread": 0,
 "class": "IconButton",
 "borderSize": 0,
 "toolTipBorderColor": "#767676",
 "toolTipShadowHorizontalLength": 0,
 "click": "this.setComponentVisibility(this.IconButton_73BA9036_6188_62E6_4184_1087114A21E4, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_7322B8D2_61B8_A3BE_419D_4310759BDA18, false, 0, null, null, false)",
 "horizontalAlign": "center",
 "toolTipShadowVerticalLength": 0,
 "toolTipFontSize": "1.11vmin",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "data": {
  "name": "phong to"
 },
 "shadow": false,
 "toolTipTextShadowColor": "#000000",
 "visible": false,
 "paddingTop": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal"
},
{
 "maxHeight": 288,
 "maxWidth": 360,
 "id": "IconButton_70360DBD_6188_DDEB_41D0_AAA5B4CEA917",
 "left": "1.41%",
 "width": 55.2,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "paddingLeft": 0,
 "propagateClick": false,
 "height": 50.6,
 "minWidth": 1,
 "mode": "push",
 "transparencyActive": false,
 "iconURL": "skin/IconButton_70360DBD_6188_DDEB_41D0_AAA5B4CEA917.png",
 "bottom": "4.17%",
 "class": "IconButton",
 "borderSize": 0,
 "click": "this.mainPlayList.set('selectedIndex', 32); this.MainViewerVideoPlayer.play(); this.setComponentVisibility(this.IconButton_70360DBD_6188_DDEB_41D0_AAA5B4CEA917, false, 0, null, null, false); this.setComponentVisibility(this.Label_61A21684_7075_107B_41C3_74A8A7C1D8A6, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_61FB7A40_7075_10FB_41CC_53270AD6AB38, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_69A61E3A_70FB_F08F_41C6_7EAF2B44D7D7, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_615DE8B2_7075_319C_41CF_85F44DF0DA29, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_73BA9036_6188_62E6_4184_1087114A21E4, true, 0, null, null, false); this.setComponentVisibility(this.IconButton_7322B8D2_61B8_A3BE_419D_4310759BDA18, true, 0, null, null, false)",
 "horizontalAlign": "center",
 "data": {
  "name": "video"
 },
 "shadow": false,
 "paddingTop": 0,
 "cursor": "hand"
},
{
 "id": "IconButton_4C86CA76_61D0_26EB_41B3_8D62F0AD5B96",
 "left": "0.06%",
 "width": 29.6,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "bottom",
 "minHeight": 0,
 "paddingLeft": 0,
 "top": "0.09%",
 "propagateClick": false,
 "height": 25.6,
 "minWidth": 0,
 "mode": "push",
 "transparencyActive": false,
 "rollOverIconURL": "skin/IconButton_4C86CA76_61D0_26EB_41B3_8D62F0AD5B96_rollover.png",
 "iconURL": "skin/IconButton_4C86CA76_61D0_26EB_41B3_8D62F0AD5B96.png",
 "class": "IconButton",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_4C86CA76_61D0_26EB_41B3_8D62F0AD5B96_pressed.png",
 "click": "if(!this.Container_6FF183D0_6198_A5B9_41D3_16AA14E99F59.get('visible')){ this.setComponentVisibility(this.Container_6FF183D0_6198_A5B9_41D3_16AA14E99F59, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_6FF183D0_6198_A5B9_41D3_16AA14E99F59, false, 0, null, null, false) }; if(!this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D.get('visible')){ this.setComponentVisibility(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D, true, 0, null, null, false) } else { this.setComponentVisibility(this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D, false, 0, null, null, false) }",
 "horizontalAlign": "center",
 "data": {
  "name": "nut"
 },
 "shadow": false,
 "paddingTop": 0
},
{
 "id": "Container_6FF183D0_6198_A5B9_41D3_16AA14E99F59",
 "left": "0%",
 "contentOpaque": false,
 "children": [
  "this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "width": "9.121%",
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "top": "4.02%",
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "paddingLeft": 0,
 "height": "80.463%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "layout": "absolute",
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "menu"
 },
 "shadow": false,
 "visible": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "maxHeight": 831,
 "maxWidth": 1442,
 "id": "Image_78FDD995_6198_A5BA_41A7_887E54E905BA",
 "left": "0%",
 "width": "100%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "url": "skin/Image_78FDD995_6198_A5BA_41A7_887E54E905BA.jpg",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "propagateClick": true,
 "height": "100%",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Image_78FDD995_6198_A5BA_41A7_887E54E905BA, false, 0, null, null, false)",
 "class": "Image",
 "borderSize": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "map 1"
 },
 "shadow": false,
 "visible": false,
 "paddingTop": 0,
 "scaleMode": "fill"
},
{
 "maxHeight": 428,
 "maxWidth": 583,
 "id": "Image_7AB6A8C4_618B_A399_41BE_2668B95B6C2D",
 "right": "26.01%",
 "width": "45.761%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "url": "skin/Image_7AB6A8C4_618B_A399_41BE_2668B95B6C2D.png",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "16.87%",
 "propagateClick": false,
 "height": "61.939%",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Image_7AB6A8C4_618B_A399_41BE_2668B95B6C2D, false, 0, null, null, false)",
 "class": "Image",
 "borderSize": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "bien chi dan"
 },
 "shadow": false,
 "visible": false,
 "paddingTop": 0,
 "scaleMode": "fill"
},
{
 "maxHeight": 577,
 "maxWidth": 433,
 "id": "Image_780EB065_6189_A29B_41CA_4DDA36878B05",
 "left": "32.06%",
 "width": "33.987%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "url": "skin/Image_780EB065_6189_A29B_41CA_4DDA36878B05.png",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "height": "83.502%",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Image_780EB065_6189_A29B_41CA_4DDA36878B05, false, 0, null, null, false)",
 "bottom": "1.16%",
 "class": "Image",
 "borderSize": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "bien thac ngoc"
 },
 "shadow": false,
 "visible": false,
 "paddingTop": 0,
 "scaleMode": "fill"
},
{
 "id": "IconButton_7F8CF209_706B_308D_41D9_A686BF37E500",
 "width": 40,
 "right": "6.83%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 0,
 "paddingLeft": 0,
 "propagateClick": false,
 "height": 40,
 "minWidth": 0,
 "mode": "toggle",
 "transparencyActive": false,
 "rollOverIconURL": "skin/IconButton_7F8CF209_706B_308D_41D9_A686BF37E500_rollover.png",
 "iconURL": "skin/IconButton_7F8CF209_706B_308D_41D9_A686BF37E500.png",
 "bottom": "0.93%",
 "class": "IconButton",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_7F8CF209_706B_308D_41D9_A686BF37E500_pressed.png",
 "horizontalAlign": "center",
 "data": {
  "name": "Tat tieng"
 },
 "shadow": false,
 "paddingTop": 0,
 "cursor": "hand"
},
{
 "id": "Label_61A21684_7075_107B_41C3_74A8A7C1D8A6",
 "left": "0.06%",
 "fontFamily": "Arial",
 "width": "7.849%",
 "paddingBottom": 0,
 "backgroundOpacity": 0.26,
 "paddingRight": 0,
 "text": "video giới thiệu",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#000000",
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "paddingLeft": 0,
 "height": "4.342%",
 "fontSize": "1.48vmin",
 "backgroundColorRatios": [
  0.11,
  0.13,
  0.19
 ],
 "bottom": "0.06%",
 "class": "Label",
 "borderSize": 0,
 "fontStyle": "normal",
 "horizontalAlign": "center",
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "Ch\u1eef vdGT"
 },
 "fontColor": "#FFFFFF",
 "shadow": false,
 "paddingTop": 0,
 "fontWeight": "normal",
 "textDecoration": "none"
},
{
 "maxHeight": 42,
 "maxWidth": 42,
 "id": "IconButton_61FB7A40_7075_10FB_41CC_53270AD6AB38",
 "width": 36.4,
 "right": "3.56%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "paddingLeft": 0,
 "propagateClick": false,
 "height": 42,
 "minWidth": 1,
 "mode": "push",
 "transparencyActive": false,
 "iconURL": "skin/IconButton_61FB7A40_7075_10FB_41CC_53270AD6AB38.png",
 "bottom": "0.87%",
 "class": "IconButton",
 "borderSize": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "VR"
 },
 "shadow": false,
 "paddingTop": 0,
 "cursor": "hand"
},
{
 "toolTipFontColor": "#606060",
 "maxHeight": 128,
 "maxWidth": 128,
 "id": "IconButton_69A61E3A_70FB_F08F_41C6_7EAF2B44D7D7",
 "width": 38,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "right": "0.16%",
 "toolTipBorderSize": 1,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "paddingRight": 0,
 "toolTipPaddingRight": 6,
 "minHeight": 1,
 "toolTipDisplayTime": 600,
 "toolTipFontStyle": "normal",
 "toolTipPaddingLeft": 6,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "paddingLeft": 0,
 "toolTipBorderRadius": 3,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "height": 31.65,
 "toolTipFontFamily": "Arial",
 "minWidth": 1,
 "mode": "toggle",
 "transparencyActive": true,
 "toolTip": "Fullscreen",
 "iconURL": "skin/IconButton_69A61E3A_70FB_F08F_41C6_7EAF2B44D7D7.png",
 "bottom": "1.56%",
 "toolTipShadowSpread": 0,
 "class": "IconButton",
 "borderSize": 0,
 "toolTipBorderColor": "#767676",
 "toolTipShadowHorizontalLength": 0,
 "horizontalAlign": "center",
 "toolTipShadowVerticalLength": 0,
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "data": {
  "name": "full man hinh"
 },
 "shadow": false,
 "toolTipTextShadowColor": "#000000",
 "paddingTop": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal"
},
{
 "children": [
  "this.IconButton_4C7ED479_61D0_22D9_4192_2463F00FFECC",
  "this.Label_61A6B671_706F_309D_41C1_2A2E2152A70A",
  "this.IconButton_615DE8B2_7075_319C_41CF_85F44DF0DA29"
 ],
 "id": "Container_4D62F6AF_61D1_EE7A_41B0_4D7149FE7E22",
 "left": "0%",
 "backgroundImageUrl": "skin/Container_4D62F6AF_61D1_EE7A_41B0_4D7149FE7E22.jpg",
 "contentOpaque": false,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "width": "100%",
 "borderRadius": 0,
 "paddingRight": 0,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "anh mo dau"
 },
 "shadow": false,
 "visible": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "IconButton_51EE390D_706D_1085_41B1_A9F098D07663",
 "width": 40,
 "right": "45.97%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 0,
 "paddingLeft": 0,
 "propagateClick": false,
 "height": 40,
 "minWidth": 0,
 "mode": "toggle",
 "transparencyActive": false,
 "rollOverIconURL": "skin/IconButton_51EE390D_706D_1085_41B1_A9F098D07663_rollover.png",
 "iconURL": "skin/IconButton_51EE390D_706D_1085_41B1_A9F098D07663.png",
 "bottom": "1.3%",
 "class": "IconButton",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_51EE390D_706D_1085_41B1_A9F098D07663_pressed.png",
 "horizontalAlign": "center",
 "data": {
  "name": "T\u1ea1m d\u1eebng video"
 },
 "shadow": false,
 "visible": false,
 "paddingTop": 0,
 "cursor": "hand"
},
{
 "toolTipPaddingBottom": 4,
 "toolTipFontColor": "#FFFFFF",
 "maxHeight": 128,
 "maxWidth": 128,
 "id": "IconButton_615DE8B2_7075_319C_41CF_85F44DF0DA29",
 "width": 36.2,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingRight": 6,
 "right": "0.06%",
 "toolTipBorderSize": 1,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "paddingRight": 0,
 "toolTipPaddingTop": 4,
 "minHeight": 1,
 "toolTipDisplayTime": 600,
 "toolTipFontStyle": "normal",
 "toolTipPaddingLeft": 6,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "paddingLeft": 0,
 "toolTipBorderRadius": 3,
 "top": "0.14%",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "height": 39.25,
 "toolTipFontFamily": "Arial",
 "minWidth": 1,
 "mode": "toggle",
 "transparencyActive": true,
 "toolTip": "Fullscreen",
 "iconURL": "skin/IconButton_615DE8B2_7075_319C_41CF_85F44DF0DA29.png",
 "toolTipShadowSpread": 0,
 "class": "IconButton",
 "borderSize": 0,
 "toolTipBorderColor": "#767676",
 "toolTipShadowHorizontalLength": 0,
 "horizontalAlign": "center",
 "toolTipShadowVerticalLength": 0,
 "toolTipFontSize": "1.11vmin",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "data": {
  "name": "toan man hinh"
 },
 "shadow": false,
 "toolTipTextShadowColor": "#000000",
 "paddingTop": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -33.14,
   "hfov": 15.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -25.72
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B914805_6133_E229_41B0_E00B0E2DB53D, this.camera_59970C74_7195_1084_41BA_63076480A8AD); this.mainPlayList.set('selectedIndex', 28); this.stopGlobalAudio(this.audio_6CC28647_70BB_7085_41C5_1FAAD73BA352)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4E92C9_6130_2639_41C5_41EC613891A5",
   "pitch": -25.72,
   "yaw": -33.14,
   "hfov": 15.29,
   "distance": 100
  }
 ],
 "id": "overlay_475AE718_6170_2E27_41CD_0BCF8F479D4A",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0_HS_1_0_map.gif",
      "width": 69,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -28.24,
   "hfov": 15.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.4
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0_HS_1_0.png",
      "width": 558,
      "class": "ImageResourceLevel",
      "height": 129
     }
    ]
   },
   "pitch": -20.4,
   "yaw": -28.24,
   "hfov": 15.36,
   "distance": 50
  }
 ],
 "id": "overlay_66BED02E_70F7_1087_41CF_AA5532FC1E74",
 "data": {
  "label": "Quay v\u1ec1"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 16.54,
   "hfov": 8.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.67
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 29, this.audio_6CC28647_70BB_7085_41C5_1FAAD73BA352)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_0_HS_2_0.png",
      "width": 282,
      "class": "ImageResourceLevel",
      "height": 281
     }
    ]
   },
   "pitch": -3.67,
   "yaw": 16.54,
   "distance": 50
  }
 ],
 "id": "overlay_6C02B9F3_70BD_339D_41D3_B80E6A20CBE7",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -50.79,
   "hfov": 11.35,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.54
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC, this.camera_59A6FC74_7195_1084_419E_58B868E9CB31); this.mainPlayList.set('selectedIndex', 0); this.setComponentVisibility(this.IconButton_70360DBD_6188_DDEB_41D0_AAA5B4CEA917, true, 0, null, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_7F472DD2_61F8_DDB9_41B6_8411FAB312F4",
   "pitch": -3.54,
   "yaw": -50.79,
   "hfov": 11.35,
   "distance": 100
  }
 ],
 "id": "overlay_6EA596BB_6130_EE59_41CA_1591AB9729F2",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 40.79,
   "hfov": 13.69,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.84
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF, this.camera_59B6AC84_7195_1184_417E_3EC37AFA5B6E); this.mainPlayList.set('selectedIndex', 23); this.stopGlobalAudio(this.audio_67D3B1CB_70FD_F38D_41D0_415B94284D2D); var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 1, this.audio_6B3BE08D_70BB_1185_41C5_EA39A928F4E4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_7F477DD2_61F8_DDB9_41D5_45B3BB1C19A3",
   "pitch": -9.84,
   "yaw": 40.79,
   "hfov": 13.69,
   "distance": 100
  }
 ],
 "id": "overlay_712795C2_6130_222B_41A9_E382A8282E03",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 133.16,
   "hfov": 13.1,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.31
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4, this.camera_59C0EC84_7195_1184_41B5_F2943AAACD43); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_7F469DD2_61F8_DDB9_41BD_654C9911AE65",
   "pitch": -7.31,
   "yaw": 133.16,
   "hfov": 13.1,
   "distance": 100
  }
 ],
 "id": "overlay_7078C836_6130_226B_41CD_B538575D9F6D",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0_HS_3_1_0_map.gif",
      "width": 185,
      "class": "ImageResourceLevel",
      "height": 171
     }
    ]
   },
   "yaw": 103.82,
   "hfov": 11.07,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.94
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setComponentVisibility(this.Image_7AB6A8C4_618B_A399_41BE_2668B95B6C2D, true, 0, null, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "id": "overlay_78878E14_618B_DEB9_41D8_0B5F94608185",
 "data": {
  "label": "Polygon"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0_HS_4_0_map.gif",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -49.88,
   "hfov": 16.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.5
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0_HS_4_0.png",
      "width": 545,
      "class": "ImageResourceLevel",
      "height": 122
     }
    ]
   },
   "pitch": -0.5,
   "yaw": -49.88,
   "hfov": 16.32,
   "distance": 50
  }
 ],
 "id": "overlay_627DF137_709D_3085_41DC_18AF836ACB4A",
 "data": {
  "label": "Quay v\u1ec1 c\u1ed5ng b\u1eaft \u0111\u1ea7u "
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0_HS_5_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 40.98,
   "hfov": 10.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.07
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0_HS_5_0.png",
      "width": 343,
      "class": "ImageResourceLevel",
      "height": 127
     }
    ]
   },
   "pitch": -5.07,
   "yaw": 40.98,
   "hfov": 10.24,
   "distance": 50
  }
 ],
 "id": "overlay_66B1834D_709D_1085_41B2_B4FBF25031D8",
 "data": {
  "label": "c\u1ea7u qua su\u1ed1i "
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0_HS_6_0_map.gif",
      "width": 42,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   },
   "yaw": 133.02,
   "hfov": 7.84,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.15
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0_HS_6_0.png",
      "width": 262,
      "class": "ImageResourceLevel",
      "height": 98
     }
    ]
   },
   "pitch": -4.15,
   "yaw": 133.02,
   "hfov": 7.84,
   "distance": 50
  }
 ],
 "id": "overlay_66144C6B_70AD_108D_41D0_ECCB4606EE0A",
 "data": {
  "label": "C\u1ecdn n\u01b0\u1edbc"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 136.57,
   "hfov": 12.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.91
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27, this.camera_57B08BA2_7195_17BF_41C6_CA302032F68A); this.mainPlayList.set('selectedIndex', 2); this.stopGlobalAudio(this.audio_6A9AA43E_70ED_3087_41B8_BED2606FF920)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_7F49EDD2_61F8_DDB9_41B0_BBE578A44036",
   "pitch": -5.91,
   "yaw": 136.57,
   "hfov": 12.8,
   "distance": 100
  }
 ],
 "id": "overlay_73115943_6130_2229_41D4_14B8F9347658",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -86.83,
   "hfov": 9.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.28
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59, this.camera_57A7AB97_7195_1785_41A3_69A471F73CC2); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D5E32C0_6130_2627_41BC_1DF449D77402",
   "pitch": -21.28,
   "yaw": -86.83,
   "hfov": 9.57,
   "distance": 50
  }
 ],
 "id": "overlay_75359FAD_6130_1E79_41C0_F9F18FB6C2C5",
 "data": {
  "label": "Circle Arrow 01 Left-Up"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_1_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -5.83,
   "hfov": 11.9,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -27.24
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0, this.camera_57986B8D_7195_1785_41D3_C9245B81B03B); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D5EE2C0_6130_2627_41D2_73320D8461A4",
   "pitch": -27.24,
   "yaw": -5.83,
   "hfov": 11.9,
   "distance": 50
  }
 ],
 "id": "overlay_72941E1E_6130_1E5A_41BE_8D4276044036",
 "data": {
  "label": "Circle Arrow 01a Right-Up"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0_HS_3_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 139.04,
   "hfov": 10.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.27
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0_HS_3_0.png",
      "width": 346,
      "class": "ImageResourceLevel",
      "height": 126
     }
    ]
   },
   "pitch": -2.27,
   "yaw": 139.04,
   "hfov": 10.24,
   "distance": 50
  }
 ],
 "id": "overlay_662CCDB1_70BD_339D_41D9_D443556B06AA",
 "data": {
  "label": "B\u1ea3n c\u1ecfi"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0_HS_4_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -4.08,
   "hfov": 9.6,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.33
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0_HS_4_0.png",
      "width": 346,
      "class": "ImageResourceLevel",
      "height": 128
     }
    ]
   },
   "pitch": -20.33,
   "yaw": -4.08,
   "hfov": 9.6,
   "distance": 50
  }
 ],
 "id": "overlay_6519FE87_70BF_1185_41DA_8B64C61143F2",
 "data": {
  "label": "Hang C\u1ecfi"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0_HS_5_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -85.24,
   "hfov": 11.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.24
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0_HS_5_0.png",
      "width": 404,
      "class": "ImageResourceLevel",
      "height": 169
     }
    ]
   },
   "pitch": -17.24,
   "yaw": -85.24,
   "hfov": 11.42,
   "distance": 50
  }
 ],
 "id": "overlay_6462301D_70BF_1085_41D7_FAA8966F9FF4",
 "data": {
  "label": "Ch\u00f2i ngh\u1ec9 ng\u01a1i"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 119.99,
   "hfov": 16.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.7
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390, this.camera_59F25CA4_7195_11BB_41A1_5945A1DE2B54); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4492C0_6130_2627_41CC_3B954B9F3D0C",
   "pitch": -8.7,
   "yaw": 119.99,
   "hfov": 16.78,
   "distance": 100
  }
 ],
 "id": "overlay_7B245916_6150_E22B_41D7_2CEA674FE2A9",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -52.91,
   "hfov": 16.67,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.9
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06, this.camera_59FCECB4_7195_119B_41D7_F2C0F4E49B41); this.mainPlayList.set('selectedIndex', 17); var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 16, this.audio_691AC936_7097_3087_4196_4799D7F622E4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4512C0_6130_2627_41B0_96AB2468039B",
   "pitch": -10.9,
   "yaw": -52.91,
   "hfov": 16.67,
   "distance": 100
  }
 ],
 "id": "overlay_7A7C7B75_6150_26E9_41CA_C29B89D3C652",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0_HS_2_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 121.19,
   "hfov": 10.17,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.14
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0_HS_2_0.png",
      "width": 341,
      "class": "ImageResourceLevel",
      "height": 125
     }
    ]
   },
   "pitch": -4.14,
   "yaw": 121.19,
   "hfov": 10.17,
   "distance": 50
  }
 ],
 "id": "overlay_669AC4A9_709D_318D_41AF_3B613657783A",
 "data": {
  "label": "V\u1ec1 ng\u00e3 ba"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0_HS_3_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -51.19,
   "hfov": 10.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.22
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_0_HS_3_0.png",
      "width": 341,
      "class": "ImageResourceLevel",
      "height": 125
     }
    ]
   },
   "pitch": -6.22,
   "yaw": -51.19,
   "hfov": 10.15,
   "distance": 50
  }
 ],
 "id": "overlay_65CF1124_709D_10BB_41D7_381C5312D4AA",
 "data": {
  "label": "B\u1ea3n C\u1ecfi"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -39.73,
   "hfov": 16.28,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.46
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59, this.camera_56A17C05_7195_1085_41D4_53BD726FD6C2); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D5FC2C0_6130_2627_41CC_E4FD8DEE1A48",
   "pitch": -16.46,
   "yaw": -39.73,
   "hfov": 16.28,
   "distance": 100
  }
 ],
 "id": "overlay_72BACD5D_6130_62D9_41B8_E56F5E1618B2",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 139.55,
   "hfov": 15.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -25.86
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4, this.camera_56B11C14_7195_109B_41D6_0BCA509EBECB); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D5F92C0_6130_2627_41D6_644775F20064",
   "pitch": -25.86,
   "yaw": 139.55,
   "hfov": 15.27,
   "distance": 100
  }
 ],
 "id": "overlay_72C4B5D9_6130_2DD9_41D0_3C0AAF498039",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0_HS_2_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -38.03,
   "hfov": 10.03,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.85
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0_HS_2_0.png",
      "width": 342,
      "class": "ImageResourceLevel",
      "height": 126
     }
    ]
   },
   "pitch": -11.85,
   "yaw": -38.03,
   "hfov": 10.03,
   "distance": 50
  }
 ],
 "id": "overlay_650EACD3_70B5_119D_41B9_C53167103143",
 "data": {
  "label": "B\u00e3i t\u1eafm"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0_HS_3_0_map.gif",
      "width": 47,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 140.13,
   "hfov": 10.52,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.68
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_0_HS_3_0.png",
      "width": 373,
      "class": "ImageResourceLevel",
      "height": 126
     }
    ]
   },
   "pitch": -19.68,
   "yaw": 140.13,
   "hfov": 10.52,
   "distance": 50
  }
 ],
 "id": "overlay_6796E909_70B5_108D_41D4_DAD1E6CF2371",
 "data": {
  "label": "Ch\u00f2i ngh\u1ec9 ng\u01a1i"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 156.33,
   "hfov": 6.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.29
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4, this.camera_57FC7BC1_7195_17FD_41C9_3E2B0D605060); this.mainPlayList.set('selectedIndex', 1); this.stopGlobalAudio(this.audio_6B3BE08D_70BB_1185_41C5_EA39A928F4E4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4892C0_6130_2627_41D1_3BD3E0B2C618",
   "pitch": -9.29,
   "yaw": 156.33,
   "hfov": 6.95,
   "distance": 100
  }
 ],
 "id": "overlay_400E8132_6170_226B_41D1_D46BA76A9857",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -24.4,
   "hfov": 7.84,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.24
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7D1844_6130_222F_41D0_9D76B720413D, this.camera_560E6BCB_7195_178C_41C6_4967DB437DAA); this.mainPlayList.set('selectedIndex', 24); this.stopGlobalAudio(this.audio_6B3BE08D_70BB_1185_41C5_EA39A928F4E4); var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 23, this.audio_6BA61B1B_70BD_308D_41D3_F645DFB39793)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4922C0_6130_2627_41CD_103440D31A61",
   "pitch": -8.24,
   "yaw": -24.4,
   "hfov": 7.84,
   "distance": 100
  }
 ],
 "id": "overlay_40994593_6171_E229_41C1_E073BB0232CD",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0_HS_2_0_map.gif",
      "width": 50,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -21.97,
   "hfov": 11.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.02
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0_HS_2_0.png",
      "width": 377,
      "class": "ImageResourceLevel",
      "height": 120
     }
    ]
   },
   "pitch": -5.02,
   "yaw": -21.97,
   "hfov": 11.23,
   "distance": 50
  }
 ],
 "id": "overlay_66314DB6_7095_1387_41D6_583DD3634004",
 "data": {
  "label": "Hang Na"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0_HS_3_0_map.gif",
      "width": 50,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 156.76,
   "hfov": 11.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.38
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_0_HS_3_0.png",
      "width": 378,
      "class": "ImageResourceLevel",
      "height": 120
     }
    ]
   },
   "pitch": -6.38,
   "yaw": 156.76,
   "hfov": 11.24,
   "distance": 50
  }
 ],
 "id": "overlay_6810A5F2_70EB_339F_41C9_C047FEC1F67E",
 "data": {
  "label": "Quay v\u1ec1 ng\u00e3 ba"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 71.74,
   "hfov": 16.55,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.89
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4, this.camera_56970C05_7195_1085_41D5_4912ED10AE9E); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4442C0_6130_2627_41C3_308FE297C1CE",
   "pitch": -12.89,
   "yaw": 71.74,
   "hfov": 16.55,
   "distance": 100
  }
 ],
 "id": "overlay_783038D2_6150_622B_41D2_5934AF66DF3F",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -105.28,
   "hfov": 16.47,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.98
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A, this.camera_56878BF7_7195_1785_41BA_E85794F6F41C); this.mainPlayList.set('selectedIndex', 16); this.stopGlobalAudio(this.audio_67D3B1CB_70FD_F38D_41D0_415B94284D2D)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D44E2C0_6130_2627_41D2_376491B3E036",
   "pitch": -13.98,
   "yaw": -105.28,
   "hfov": 16.47,
   "distance": 100
  }
 ],
 "id": "overlay_789F8DCC_6150_223F_41C9_2097CF114653",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0_HS_2_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -103.82,
   "hfov": 10.12,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.4
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0_HS_2_0.png",
      "width": 340,
      "class": "ImageResourceLevel",
      "height": 124
     }
    ]
   },
   "pitch": -8.4,
   "yaw": -103.82,
   "hfov": 10.12,
   "distance": 50
  }
 ],
 "id": "overlay_66C1CC6E_709B_1087_41CD_DB20D452A6F3",
 "data": {
  "label": "B\u1ea3n C\u1ecfi "
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0_HS_3_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 72.52,
   "hfov": 10.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.61
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_0_HS_3_0.png",
      "width": 340,
      "class": "ImageResourceLevel",
      "height": 126
     }
    ]
   },
   "pitch": -7.61,
   "yaw": 72.52,
   "hfov": 10.15,
   "distance": 50
  }
 ],
 "id": "overlay_65493376_709A_F087_41B5_89CA2D9D7850",
 "data": {
  "label": "V\u1ec1 ng\u00e3 ba "
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 165.21,
   "hfov": 15.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.95
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B91E651_6130_6E29_41D4_A295C83FBC71, this.camera_59750C64_7195_10BB_41C7_8A69AA2FEF3E); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D48E2C0_6130_2627_41C1_1D25115550CA",
   "pitch": -7.95,
   "yaw": 165.21,
   "hfov": 15.02,
   "distance": 100
  }
 ],
 "id": "overlay_41D4B780_6170_2E27_41B9_D7196914947A",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0_HS_1_0_map.gif",
      "width": 56,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 165.7,
   "hfov": 12.65,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.07
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0_HS_1_0.png",
      "width": 429,
      "class": "ImageResourceLevel",
      "height": 121
     }
    ]
   },
   "pitch": -3.07,
   "yaw": 165.7,
   "hfov": 12.65,
   "distance": 50
  }
 ],
 "id": "overlay_66BC90AE_7095_1187_41AC_F3F32A7B46FB",
 "data": {
  "label": "Quay v\u1ec1 b\u1ea3n C\u1ecfi"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "yaw": -149.97,
   "hfov": 4.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 30.1
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 22, this.audio_6BA02EF5_70AF_3185_41CB_C271F0A3144B)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_0_HS_2_0.png",
      "width": 185,
      "class": "ImageResourceLevel",
      "height": 210
     }
    ]
   },
   "pitch": 30.1,
   "yaw": -149.97,
   "distance": 50
  }
 ],
 "id": "overlay_6A68D869_70AD_308D_41C0_4E24E8ED90E5",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 132.24,
   "hfov": 6.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.25
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525, this.camera_5948BC54_7195_109B_41D4_AB5D644FC174); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4D42C0_6130_2627_41C3_E192A353BC4D",
   "pitch": -12.25,
   "yaw": 132.24,
   "hfov": 6.78,
   "distance": 100
  }
 ],
 "id": "overlay_450B0E51_6170_7E29_41D3_70B745EE2BC8",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 62.3,
   "hfov": 8.98,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.73
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B914805_6133_E229_41B0_E00B0E2DB53D, this.camera_5938CC44_7195_10FB_41B8_721B52034600); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4DE2C9_6130_2639_41D0_4E10AA4D85D5",
   "pitch": -5.73,
   "yaw": 62.3,
   "hfov": 8.98,
   "distance": 100
  }
 ],
 "id": "overlay_459FB51A_6170_225B_41D0_A034DE69BF35",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0_HS_2_0_map.gif",
      "width": 68,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 67.07,
   "hfov": 16.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.42
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0_HS_2_0.png",
      "width": 555,
      "class": "ImageResourceLevel",
      "height": 130
     }
    ]
   },
   "pitch": -1.42,
   "yaw": 67.07,
   "hfov": 16.42,
   "distance": 50
  }
 ],
 "id": "overlay_66F4571C_70F5_F08B_41A2_6C1CE11580F9",
 "data": {
  "label": "Hang Na"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0_HS_3_0_map.gif",
      "width": 67,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 136.99,
   "hfov": 16.21,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.13
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_0_HS_3_0.png",
      "width": 555,
      "class": "ImageResourceLevel",
      "height": 131
     }
    ]
   },
   "pitch": -9.13,
   "yaw": 136.99,
   "hfov": 16.21,
   "distance": 50
  }
 ],
 "id": "overlay_66809BF4_70F5_379B_41BB_4259E5ACBAD1",
 "data": {
  "label": "Quay v\u1ec1"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 58.82,
   "hfov": 12.35,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.46
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4, this.camera_56558BEB_7195_178D_41B8_AD6620C98B90); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_7F443DD2_61F8_DDB9_418C_1BD87E274650",
   "pitch": -19.46,
   "yaw": 58.82,
   "hfov": 12.35,
   "distance": 100
  }
 ],
 "id": "overlay_6F2B4B62_6130_26EB_41D5_D05A42E77CA4",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0_HS_1_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 116
     }
    ]
   },
   "yaw": -30.55,
   "hfov": 40.98,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 16.75
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setComponentVisibility(this.Image_78FDD995_6198_A5BA_41A7_887E54E905BA, true, 0, null, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "id": "overlay_77B5B20C_618F_A6AA_41C5_28F40937DD7B",
 "data": {
  "label": "Polygon"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0_HS_3_0_map.gif",
      "width": 73,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   },
   "yaw": 59.01,
   "hfov": 13.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.9
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0_HS_3_0.png",
      "width": 451,
      "class": "ImageResourceLevel",
      "height": 98
     }
    ]
   },
   "pitch": -14.9,
   "yaw": 59.01,
   "hfov": 13.02,
   "distance": 50
  }
 ],
 "id": "overlay_63BE5E41_709F_30FD_41C6_74F124D953EF",
 "data": {
  "label": "Khu v\u1ef1c h\u00e0ng qu\u00e1n"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 23.19,
   "hfov": 2.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.24
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 0, this.audio_67D3B1CB_70FD_F38D_41D0_415B94284D2D)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0_HS_4_0.png",
      "width": 77,
      "class": "ImageResourceLevel",
      "height": 76
     }
    ]
   },
   "pitch": 2.24,
   "yaw": 23.19,
   "distance": 50
  }
 ],
 "id": "overlay_6A747355_7095_3085_41BD_00115DD474E2",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 103.1,
   "hfov": 5.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.62
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B43B321_6130_2666_41D3_AD4567F628D9, this.camera_54F0DB2F_7195_1085_41D7_DBF2E2EC3F81); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D47C2C0_6130_2627_41D0_FF86E81041B1",
   "pitch": -2.62,
   "yaw": 103.1,
   "hfov": 5.29,
   "distance": 100
  }
 ],
 "id": "overlay_7C2D42C7_6150_2629_41B4_F6627D3B7B4F",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -23.89,
   "hfov": 7.21,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.41
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B47B9F2_6130_65EB_41C8_3108E319017E, this.camera_54FFDB3A_7195_108F_41D6_79874DFFAE08); this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4602C0_6130_2627_4198_5E080F072AAA",
   "pitch": -5.41,
   "yaw": -23.89,
   "hfov": 7.21,
   "distance": 100
  }
 ],
 "id": "overlay_7F5F54ED_6150_23F9_41C4_263F79E70255",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -96.73,
   "hfov": 8.97,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.54
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27, this.camera_5708AB44_7195_10FB_41C9_09AD505DD26C); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_688EDDDB_7095_138D_41D1_41593072C8B7",
   "pitch": -8.54,
   "yaw": -96.73,
   "hfov": 8.97,
   "distance": 100
  }
 ],
 "id": "overlay_658206BB_70AB_118D_41D5_2F598C6ABB72",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0_HS_3_0_map.gif",
      "width": 42,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 105.02,
   "hfov": 10.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.45
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0_HS_3_0.png",
      "width": 343,
      "class": "ImageResourceLevel",
      "height": 128
     }
    ]
   },
   "pitch": -0.45,
   "yaw": 105.02,
   "hfov": 10.23,
   "distance": 50
  }
 ],
 "id": "overlay_66AAAE06_709D_1087_41DA_47F001CF6373",
 "data": {
  "label": "Quay v\u1ec1"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0_HS_4_0_map.gif",
      "width": 49,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -93.91,
   "hfov": 11.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.98
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0_HS_4_0.png",
      "width": 381,
      "class": "ImageResourceLevel",
      "height": 124
     }
    ]
   },
   "pitch": -5.98,
   "yaw": -93.91,
   "hfov": 11.3,
   "distance": 50
  }
 ],
 "id": "overlay_67A51A2B_709B_708D_41B6_4C53462A9462",
 "data": {
  "label": "B\u00e3i t\u1eafm"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0_HS_5_0_map.gif",
      "width": 48,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -23.93,
   "hfov": 11.38,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.52
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0_HS_5_0.png",
      "width": 382,
      "class": "ImageResourceLevel",
      "height": 125
     }
    ]
   },
   "pitch": -2.52,
   "yaw": -23.93,
   "hfov": 11.38,
   "distance": 50
  }
 ],
 "id": "overlay_6622336A_709B_308F_41D6_8C6400416691",
 "data": {
  "label": "C\u00e2y Ch\u00f2 c\u1ed5 th\u1ee5"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -165.88,
   "hfov": 15.35,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -25.24
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B47B9F2_6130_65EB_41C8_3108E319017E, this.camera_5777AB78_7195_108B_41D0_D2713183DA6E); this.mainPlayList.set('selectedIndex', 20); this.stopGlobalAudio(this.audio_6BA02EF5_70AF_3185_41CB_C271F0A3144B)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D47C2C0_6130_2627_41BF_CB465B2EEC0A",
   "pitch": -25.24,
   "yaw": -165.88,
   "hfov": 15.35,
   "distance": 100
  }
 ],
 "id": "overlay_7ECFB3CD_6171_E639_41D4_39601F067097",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 9.09,
   "hfov": 15.64,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -22.86
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2, this.camera_57800B83_7195_107D_41D9_886FEE95A9C8); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4842C0_6130_2627_41D0_3A8383C82439",
   "pitch": -22.86,
   "yaw": 9.09,
   "hfov": 15.64,
   "distance": 100
  }
 ],
 "id": "overlay_7EA0B9C4_6170_222E_41C7_A9EA8E553DD8",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0_HS_2_0_map.gif",
      "width": 50,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 9.21,
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.85
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0_HS_2_0.png",
      "width": 383,
      "class": "ImageResourceLevel",
      "height": 122
     }
    ]
   },
   "pitch": -16.85,
   "yaw": 9.21,
   "hfov": 10.87,
   "distance": 50
  }
 ],
 "id": "overlay_66B4D807_7097_1085_41D7_B2B16FA6A560",
 "data": {
  "label": "C\u00e2y Ch\u00f2 c\u1ed5 th\u1ee5"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0_HS_3_0_map.gif",
      "width": 53,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -166.09,
   "hfov": 11.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -18.22
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_0_HS_3_0.png",
      "width": 410,
      "class": "ImageResourceLevel",
      "height": 122
     }
    ]
   },
   "pitch": -18.22,
   "yaw": -166.09,
   "hfov": 11.56,
   "distance": 50
  }
 ],
 "id": "overlay_66CCE37F_7097_1085_41DB_E659EAB3942B",
 "data": {
  "label": "Quay v\u1ec1 b\u1ea3n C\u1ecfi"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -26.15,
   "hfov": 16.35,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.55
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0, this.camera_59E28C94_7195_119B_41CA_107B4ECEAB79); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4082C0_6130_2627_41D5_C9CF33D0D776",
   "pitch": -15.55,
   "yaw": -26.15,
   "hfov": 16.35,
   "distance": 100
  }
 ],
 "id": "overlay_77323400_6150_2227_41A7_33D530A58650",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 126.37,
   "hfov": 15.14,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -26.89
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D, this.camera_59D04C84_7195_1184_41A0_57B4BEAF5AA6); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4112C0_6130_2627_41CA_D5E24908032C",
   "pitch": -26.89,
   "yaw": 126.37,
   "hfov": 15.14,
   "distance": 100
  }
 ],
 "id": "overlay_7796463B_6150_2E59_41BF_75707CF732D4",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0_HS_2_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -24.03,
   "hfov": 10.19,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.13
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0_HS_2_0.png",
      "width": 348,
      "class": "ImageResourceLevel",
      "height": 128
     }
    ]
   },
   "pitch": -6.13,
   "yaw": -24.03,
   "hfov": 10.19,
   "distance": 50
  }
 ],
 "id": "overlay_65FA9D66_70AF_1087_41C0_3D4E8F4488EC",
 "data": {
  "label": "V\u1ec1 b\u00e3i t\u1eafm"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0_HS_3_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 126.69,
   "hfov": 9.59,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.81
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_0_HS_3_0.png",
      "width": 348,
      "class": "ImageResourceLevel",
      "height": 127
     }
    ]
   },
   "pitch": -20.81,
   "yaw": 126.69,
   "hfov": 9.59,
   "distance": 50
  }
 ],
 "id": "overlay_6638C0CC_70AF_118B_41D8_848EF517E71E",
 "data": {
  "label": "Hang C\u1ecfi"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 17.56,
   "hfov": 16.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.94
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525, this.camera_580CDCC4_7195_11FB_41DB_447425AFE38C); this.mainPlayList.set('selectedIndex', 26); this.stopGlobalAudio(this.audio_6BA61B1B_70BD_308D_41D3_F645DFB39793); var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 25, this.audio_6B3BE08D_70BB_1185_41C5_EA39A928F4E4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4AE2C0_6130_2627_41D1_308B0A7AA725",
   "pitch": -12.94,
   "yaw": 17.56,
   "hfov": 16.54,
   "distance": 50
  }
 ],
 "id": "overlay_42D03E80_6170_1E27_41BC_E49B81EF3155",
 "data": {
  "label": "Circle Arrow 01a Left-UP"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -145.21,
   "hfov": 12.03,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.58
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7D1844_6130_222F_41D0_9D76B720413D, this.camera_581CACC4_7195_11FB_41CC_E2FCABC6A301); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4B72C0_6130_2627_41C2_B9BA695FE368",
   "pitch": -9.58,
   "yaw": -145.21,
   "hfov": 12.03,
   "distance": 100
  }
 ],
 "id": "overlay_4241DC79_6170_22D9_41D0_910F2077C8F2",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_1_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 42.31,
   "hfov": 9.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.79
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7FCCB1_6130_2269_41AF_E018598D941C, this.camera_582F3CD4_7195_119B_41D2_02FDAB3A7A25); this.mainPlayList.set('selectedIndex', 30); this.stopGlobalAudio(this.audio_6BA61B1B_70BD_308D_41D3_F645DFB39793)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4B12C0_6130_2627_41C5_500E6194728E",
   "pitch": -5.79,
   "yaw": 42.31,
   "hfov": 9.05,
   "distance": 100
  }
 ],
 "id": "overlay_471E1A27_6150_2669_41B8_196B06AB64F5",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0_HS_3_0_map.gif",
      "width": 65,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -144.82,
   "hfov": 16.44,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.56
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0_HS_3_0.png",
      "width": 552,
      "class": "ImageResourceLevel",
      "height": 134
     }
    ]
   },
   "pitch": -4.56,
   "yaw": -144.82,
   "hfov": 16.44,
   "distance": 50
  }
 ],
 "id": "overlay_66CF7978_70EE_F08B_41BC_BC7EE73A34D6",
 "data": {
  "label": "Quay v\u1ec1 \u0111\u01b0\u1eddng ven su\u1ed1i"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0_HS_4_0_map.gif",
      "width": 65,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 21.41,
   "hfov": 16.37,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.86
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0_HS_4_0.png",
      "width": 552,
      "class": "ImageResourceLevel",
      "height": 134
     }
    ]
   },
   "pitch": -6.86,
   "yaw": 21.41,
   "hfov": 16.37,
   "distance": 50
  }
 ],
 "id": "overlay_68A5203A_70EF_108F_41C6_EE6852FCD781",
 "data": {
  "label": "Hang Na"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0_HS_5_0_map.gif",
      "width": 65,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 47.1,
   "hfov": 16.48,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.32
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_0_HS_5_0.png",
      "width": 552,
      "class": "ImageResourceLevel",
      "height": 134
     }
    ]
   },
   "pitch": -2.32,
   "yaw": 47.1,
   "hfov": 16.48,
   "distance": 50
  }
 ],
 "id": "overlay_65259FD4_70EB_2F9B_41CD_9EAB9C051F35",
 "data": {
  "label": "Th\u00e1c Ng\u1ecdc"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -125.53,
   "hfov": 16.66,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.1
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6BA0D60B_6131_EE39_41D2_9436B023038D, this.camera_54D60B1B_7195_108D_41B9_C015EFD498AD); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D5F12C0_6130_2627_41C2_496D979BE505",
   "pitch": -11.1,
   "yaw": -125.53,
   "hfov": 16.66,
   "distance": 100
  }
 ],
 "id": "overlay_74CC7739_6150_EE59_41D2_608AF8C519A3",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0_HS_1_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -125.45,
   "hfov": 10.2,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.61
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_0_HS_1_0.png",
      "width": 345,
      "class": "ImageResourceLevel",
      "height": 127
     }
    ]
   },
   "pitch": -5.61,
   "yaw": -125.45,
   "hfov": 10.2,
   "distance": 50
  }
 ],
 "id": "overlay_65FEC6B6_70AB_1187_41D4_1ED323FDDEB7",
 "data": {
  "label": "Ch\u00f2i ngh\u1ec9 ng\u01a1i"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 39.5,
   "hfov": 11.85,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.43
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B, this.camera_563BDBE0_7195_17BB_41DC_082BF6ABA34A); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_7F460DD2_61F8_DDB9_41D7_D1C34F008667",
   "pitch": -8.43,
   "yaw": 39.5,
   "hfov": 11.85,
   "distance": 100
  }
 ],
 "id": "overlay_709DD2E6_6130_27EB_41D3_C0A0220F9AE6",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -139.72,
   "hfov": 10.99,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.13
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7FA29A_6130_265B_41AD_471BA11E0626, this.camera_564B8BE0_7195_17BB_41D4_7B6E452691F9); this.mainPlayList.set('selectedIndex', 3); var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 2, this.audio_6A9AA43E_70ED_3087_41B8_BED2606FF920); this.stopGlobalAudio(this.audio_67D3B1CB_70FD_F38D_41D0_415B94284D2D)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_7F465DD2_61F8_DDB9_41A0_7BD97E8D5425",
   "pitch": -9.13,
   "yaw": -139.72,
   "hfov": 10.99,
   "distance": 100
  }
 ],
 "id": "overlay_737B2492_6130_222A_41C1_D316106B40AC",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0_HS_2_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 39.63,
   "hfov": 6.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.58
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0_HS_2_0.png",
      "width": 209,
      "class": "ImageResourceLevel",
      "height": 126
     }
    ]
   },
   "pitch": -4.58,
   "yaw": 39.63,
   "hfov": 6.23,
   "distance": 50
  }
 ],
 "id": "overlay_655AC2D0_70BB_F19B_41D2_45133B8A9FAF",
 "data": {
  "label": "B\u1ea3n c\u1ecfi "
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0_HS_3_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -137.99,
   "hfov": 10.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.13
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0_HS_3_0.png",
      "width": 344,
      "class": "ImageResourceLevel",
      "height": 127
     }
    ]
   },
   "pitch": -5.13,
   "yaw": -137.99,
   "hfov": 10.24,
   "distance": 50
  }
 ],
 "id": "overlay_650D8352_70BB_109F_41C6_A60180DDF715",
 "data": {
  "label": "B\u00e3i t\u1eafm"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 117.59,
   "hfov": 14.38,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -32.1
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D, this.camera_54DFCB25_7195_1085_419A_0A5BCB1BD669); this.mainPlayList.set('selectedIndex', 11); this.stopGlobalAudio(this.audio_6A809B17_709F_1085_41C7_3509F168B571)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4222C0_6130_2627_41C8_F0B72DAA4FDC",
   "pitch": -32.1,
   "yaw": 117.59,
   "hfov": 14.38,
   "distance": 100
  }
 ],
 "id": "overlay_76F24222_6151_E66B_41BF_CAA66CDF8F93",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -38.08,
   "hfov": 14.72,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -29.84
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA, this.camera_54E4CB2F_7195_1085_41A6_3D64EC60C59D); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D42A2C0_6130_2627_41C4_11DA28683233",
   "pitch": -29.84,
   "yaw": -38.08,
   "hfov": 14.72,
   "distance": 100
  }
 ],
 "id": "overlay_76AB8059_6150_E2D9_41D7_DD4565D00E41",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0_HS_2_0_map.gif",
      "width": 49,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 118.72,
   "hfov": 10.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -25.12
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0_HS_2_0.png",
      "width": 401,
      "class": "ImageResourceLevel",
      "height": 130
     }
    ]
   },
   "pitch": -25.12,
   "yaw": 118.72,
   "hfov": 10.57,
   "distance": 50
  }
 ],
 "id": "overlay_65B2D6F6_70AB_1187_41B4_E82BC5308E33",
 "data": {
  "label": "Ra ngo\u00e0i hang "
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0_HS_3_0_map.gif",
      "width": 46,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -37.58,
   "hfov": 10.28,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.51
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_0_HS_3_0.png",
      "width": 380,
      "class": "ImageResourceLevel",
      "height": 130
     }
    ]
   },
   "pitch": -21.51,
   "yaw": -37.58,
   "hfov": 10.28,
   "distance": 50
  }
 ],
 "id": "overlay_66A8E737_70AA_F085_41C7_ECF4C65D72F7",
 "data": {
  "label": "V\u00e0o trong hang "
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 8.47,
   "hfov": 10.25,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.74
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF, this.camera_572C6B59_7195_108D_41BD_2CDDBEAA7D68); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D49B2C0_6130_2627_41B7_37958C1505B4",
   "pitch": -7.74,
   "yaw": 8.47,
   "hfov": 10.25,
   "distance": 100
  }
 ],
 "id": "overlay_434EABF8_6170_25E6_41C6_213678F04815",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -144.65,
   "hfov": 8.93,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.38
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A, this.camera_573B5B59_7195_108D_41D5_7B7B30A28E6D); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4A52C0_6130_2627_41C4_89BA7A271150",
   "pitch": -11.38,
   "yaw": -144.65,
   "hfov": 8.93,
   "distance": 100
  }
 ],
 "id": "overlay_43CB98D6_6170_622A_41C2_79513B60F570",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0_HS_2_0_map.gif",
      "width": 59,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 8.69,
   "hfov": 14.91,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.09
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0_HS_2_0.png",
      "width": 500,
      "class": "ImageResourceLevel",
      "height": 134
     }
    ]
   },
   "pitch": -4.09,
   "yaw": 8.69,
   "hfov": 14.91,
   "distance": 50
  }
 ],
 "id": "overlay_660CCBB8_70EB_178B_41BE_1363C6AF1999",
 "data": {
  "label": "Quay v\u1ec1 c\u1ea7u qua su\u1ed1i"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0_HS_3_0_map.gif",
      "width": 59,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -140.67,
   "hfov": 14.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.77
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_0_HS_3_0.png",
      "width": 498,
      "class": "ImageResourceLevel",
      "height": 133
     }
    ]
   },
   "pitch": -6.77,
   "yaw": -140.67,
   "hfov": 14.79,
   "distance": 50
  }
 ],
 "id": "overlay_6690C7BF_70ED_1F85_41CB_9E04E71C3507",
 "data": {
  "label": "Hang Na"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 152.97,
   "hfov": 8.31,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -23.32
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5, this.camera_56750BF7_7195_1785_41CC_384B506D3D05); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D41C2C0_6130_2627_41D7_8B49F4E75DCD",
   "pitch": -23.32,
   "yaw": 152.97,
   "hfov": 8.31,
   "distance": 100
  }
 ],
 "id": "overlay_76637899_6150_6259_41D4_510B8C2F4530",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -10.7,
   "hfov": 16.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.61
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6BAD5413_6130_2229_41A6_999B26A24AC6, this.camera_56657BEB_7195_178D_41B1_2E346D8851A4); this.mainPlayList.set('selectedIndex', 12); this.stopGlobalAudio(this.audio_6A9AA43E_70ED_3087_41B8_BED2606FF920); var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 11, this.audio_6A809B17_709F_1085_41C7_3509F168B571)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4262C0_6130_2627_41D7_3A85D0F577E3",
   "pitch": -12.61,
   "yaw": -10.7,
   "hfov": 16.56,
   "distance": 100
  }
 ],
 "id": "overlay_7668CD3C_6150_225F_41D5_A8A585F37BFA",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0_HS_2_0_map.gif",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -10.13,
   "hfov": 11.68,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.8
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0_HS_2_0.png",
      "width": 395,
      "class": "ImageResourceLevel",
      "height": 155
     }
    ]
   },
   "pitch": -5.8,
   "yaw": -10.13,
   "hfov": 11.68,
   "distance": 50
  }
 ],
 "id": "overlay_65BD7E89_70AF_318D_41BF_02905C625905",
 "data": {
  "label": "V\u00e0o trong hang"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0_HS_3_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 154.42,
   "hfov": 9.69,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -18.32
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_0_HS_3_0.png",
      "width": 344,
      "class": "ImageResourceLevel",
      "height": 127
     }
    ]
   },
   "pitch": -18.32,
   "yaw": 154.42,
   "hfov": 9.69,
   "distance": 50
  }
 ],
 "id": "overlay_65F543A8_70AD_378B_41B4_D95A17D7D9D8",
 "data": {
  "label": "V\u1ec1 b\u00e3i t\u1eafm "
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 125.5,
   "hfov": 6.17,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.27
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A, this.camera_56D2DC14_7195_109B_41A8_A7F2F67A32D3); this.mainPlayList.set('selectedIndex', 25); this.stopGlobalAudio(this.audio_6B3BE08D_70BB_1185_41C5_EA39A928F4E4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4BB2C0_6130_2627_41BC_C2A4CEEF93E0",
   "pitch": -11.27,
   "yaw": 125.5,
   "hfov": 6.17,
   "distance": 50
  }
 ],
 "id": "overlay_45EF16F5_6170_2FE9_41CF_87F928E176B1",
 "data": {
  "label": "Circle Arrow 01a Right-Up"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -58.76,
   "hfov": 8.9,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.94
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA, this.camera_56C36C14_7195_109B_41DA_24C4B0668AA5); this.mainPlayList.set('selectedIndex', 27); this.stopGlobalAudio(this.audio_6B3BE08D_70BB_1185_41C5_EA39A928F4E4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4C22C0_6130_2627_41CC_4048A0AC09D3",
   "pitch": -12.94,
   "yaw": -58.76,
   "hfov": 8.9,
   "distance": 100
  }
 ],
 "id": "overlay_450C000E_6170_223B_41BE_32D54D4838AE",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_1_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 117.12,
   "hfov": 5.5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.38
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 30); this.stopGlobalAudio(this.audio_6B3BE08D_70BB_1185_41C5_EA39A928F4E4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4CA2C0_6130_2627_41D4_EEC4B44FCB5E",
   "pitch": -11.38,
   "yaw": 117.12,
   "hfov": 5.5,
   "distance": 50
  }
 ],
 "id": "overlay_47963449_6150_2239_41D8_037CF0A7BE6F",
 "data": {
  "label": "Circle Arrow 01a Left-UP"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0_HS_3_0_map.gif",
      "width": 67,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -54.46,
   "hfov": 16.2,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.37
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0_HS_3_0.png",
      "width": 548,
      "class": "ImageResourceLevel",
      "height": 130
     }
    ]
   },
   "pitch": -9.37,
   "yaw": -54.46,
   "hfov": 16.2,
   "distance": 50
  }
 ],
 "id": "overlay_66DCFBF1_70EB_179D_41D3_274C460DE4DE",
 "data": {
  "label": "Hang Na"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0_HS_4_0_map.gif",
      "width": 67,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 129.65,
   "hfov": 16.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.15
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0_HS_4_0.png",
      "width": 549,
      "class": "ImageResourceLevel",
      "height": 131
     }
    ]
   },
   "pitch": -8.15,
   "yaw": 129.65,
   "hfov": 16.27,
   "distance": 50
  }
 ],
 "id": "overlay_68CD5DB7_70EB_1385_41C9_EE193CF891F1",
 "data": {
  "label": "\u0110\u01b0\u1eddng ven su\u1ed1i"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0_HS_5_0_map.gif",
      "width": 67,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 121.15,
   "hfov": 16.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.13
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_0_HS_5_0.png",
      "width": 549,
      "class": "ImageResourceLevel",
      "height": 130
     }
    ]
   },
   "pitch": -8.13,
   "yaw": 121.15,
   "hfov": 16.27,
   "distance": 50
  }
 ],
 "id": "overlay_66397E89_70F5_318D_41AB_49041FA723BE",
 "data": {
  "label": "Th\u00e1c Ng\u1ecdc"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 9.54,
   "hfov": 16.03,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.25
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7FA29A_6130_265B_41AD_471BA11E0626, this.camera_5714CB44_7195_10FB_41C6_037890E0BDB6); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4022C0_6130_2627_41C6_E9C73A11037C",
   "pitch": -19.25,
   "yaw": 9.54,
   "hfov": 16.03,
   "distance": 100
  }
 ],
 "id": "overlay_7753A925_6150_E269_41C5_32D9F214B28E",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -127.94,
   "hfov": 8.84,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.27
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5, this.camera_5723EB4F_7195_1085_41CC_846EF710AF25); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D40C2C0_6130_2627_41B4_6E198ACD23D2",
   "pitch": -9.27,
   "yaw": -127.94,
   "hfov": 8.84,
   "distance": 100
  }
 ],
 "id": "overlay_775F3971_6150_22E9_41BE_AD933EE04C87",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0_HS_2_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 11.13,
   "hfov": 9.98,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.36
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0_HS_2_0.png",
      "width": 349,
      "class": "ImageResourceLevel",
      "height": 129
     }
    ]
   },
   "pitch": -13.36,
   "yaw": 11.13,
   "hfov": 9.98,
   "distance": 50
  }
 ],
 "id": "overlay_65169B7C_70AD_F08B_41B1_3B9A04F06A32",
 "data": {
  "label": "B\u00e3i t\u1eafm"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0_HS_3_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -126.85,
   "hfov": 10.2,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.44
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_0_HS_3_0.png",
      "width": 348,
      "class": "ImageResourceLevel",
      "height": 128
     }
    ]
   },
   "pitch": -4.44,
   "yaw": -126.85,
   "hfov": 10.2,
   "distance": 50
  }
 ],
 "id": "overlay_66CA1687_70AD_7184_41C2_AA52D4894049",
 "data": {
  "label": "Hang C\u1ecfi"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 0.22,
   "hfov": 5.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.03
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A, this.camera_591F2C34_7195_109B_41BE_57626C794A62); this.mainPlayList.set('selectedIndex', 16); this.stopGlobalAudio(this.audio_691AC936_7097_3087_4196_4799D7F622E4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6DFE37CD_70B7_7F85_41BA_A418559EFE28",
   "pitch": -4.03,
   "yaw": 0.22,
   "hfov": 5.8,
   "distance": 100
  }
 ],
 "id": "overlay_7ACDF2C5_6150_6629_41A3_9B852264EC3B",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 174.94,
   "hfov": 6.01,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.46
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B43B321_6130_2666_41D3_AD4567F628D9, this.camera_59290C44_7195_10FB_41C3_1351DCF9DD39); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4662C0_6130_2627_41CB_AB9BF39E3F84",
   "pitch": 1.46,
   "yaw": 174.94,
   "hfov": 6.01,
   "distance": 100
  }
 ],
 "id": "overlay_7ABF539A_6153_E65B_41C6_9346C44D058E",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0_HS_3_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 0.8,
   "hfov": 10.21,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.36
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0_HS_3_0.png",
      "width": 338,
      "class": "ImageResourceLevel",
      "height": 124
     }
    ]
   },
   "pitch": -1.36,
   "yaw": 0.8,
   "hfov": 10.21,
   "distance": 50
  }
 ],
 "id": "overlay_66EC586F_709F_1085_41D6_19D3A02AD2C5",
 "data": {
  "label": "V\u1ec1 ng\u00e3 ba "
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0_HS_4_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 175.03,
   "hfov": 10.11,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 5.41
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0_HS_4_0.png",
      "width": 336,
      "class": "ImageResourceLevel",
      "height": 124
     }
    ]
   },
   "pitch": 5.41,
   "yaw": 175.03,
   "hfov": 10.11,
   "distance": 50
  }
 ],
 "id": "overlay_66BF0BFA_709F_178F_41D3_DB47A093C6FC",
 "data": {
  "label": "V\u00e0o B\u1ea3n C\u1ecfi "
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 105.09,
   "hfov": 16.48,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.85
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6BBCA94C_6130_223F_418E_FE4A484CF630, this.camera_56E2EC24_7195_10BB_41C6_6E8554275FB5); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D5FD2C0_6130_2627_41D8_19746FED6343",
   "pitch": -13.85,
   "yaw": 105.09,
   "hfov": 16.48,
   "distance": 100
  }
 ],
 "id": "overlay_7502163F_6130_2E59_41C0_839F1A40D0C9",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -64.44,
   "hfov": 14.87,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -28.81
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6BA0D60B_6131_EE39_41D2_9436B023038D, this.camera_56ED0C24_7195_10BB_41D1_AAD05AD0E405); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4072C0_6130_2627_41D7_AE880C601B5B",
   "pitch": -28.81,
   "yaw": -64.44,
   "hfov": 14.87,
   "distance": 100
  }
 ],
 "id": "overlay_754D3517_6130_6229_41D3_E6C2EEA5DEB9",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0_HS_2_0_map.gif",
      "width": 44,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 107.44,
   "hfov": 10.14,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.33
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_0_HS_2_0.png",
      "width": 348,
      "class": "ImageResourceLevel",
      "height": 126
     }
    ]
   },
   "pitch": -9.33,
   "yaw": 107.44,
   "hfov": 10.14,
   "distance": 50
  }
 ],
 "id": "overlay_65322692_70AB_319F_41D9_23A6BE97D22D",
 "data": {
  "label": "B\u00e3i t\u1eafm"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 166.13,
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.53
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06, this.camera_57D25BB0_7195_179B_41B2_AD0FD153C684); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D46A2C0_6130_2627_41D2_4D5CFD85538C",
   "pitch": -7.53,
   "yaw": 166.13,
   "hfov": 9.06,
   "distance": 100
  }
 ],
 "id": "overlay_7D2F2C26_6150_226B_41C9_42EE00439895",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -70.9,
   "hfov": 9.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.11
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B, this.camera_57C00BA9_7195_178D_41C1_285EA7F7FFD5); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4742C0_6130_2627_419E_CDF1E68ADBFC",
   "pitch": -8.11,
   "yaw": -70.9,
   "hfov": 9.05,
   "distance": 100
  }
 ],
 "id": "overlay_7DE080A4_6150_626F_41D1_362B35B5CA72",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0_HS_2_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -68.83,
   "hfov": 10.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.37
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0_HS_2_0.png",
      "width": 342,
      "class": "ImageResourceLevel",
      "height": 125
     }
    ]
   },
   "pitch": -5.37,
   "yaw": -68.83,
   "hfov": 10.22,
   "distance": 50
  }
 ],
 "id": "overlay_66E57732_709D_109F_41D2_DB8109C00501",
 "data": {
  "label": "B\u1ea3n C\u1ecfi "
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0_HS_3_0_map.gif",
      "width": 42,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 167.98,
   "hfov": 10.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.12
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_0_HS_3_0.png",
      "width": 340,
      "class": "ImageResourceLevel",
      "height": 127
     }
    ]
   },
   "pitch": -5.12,
   "yaw": 167.98,
   "hfov": 10.15,
   "distance": 50
  }
 ],
 "id": "overlay_68001AC9_709D_118D_41D9_9F4673077141",
 "data": {
  "label": "Quay v\u1ec1"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 152.18,
   "hfov": 11.41,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.09
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B, this.camera_595B3C54_7195_109B_41D2_2D90E307D243); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4682C0_6130_2627_41D3_AD82D12C62DA",
   "pitch": -20.09,
   "yaw": 152.18,
   "hfov": 11.41,
   "distance": 100
  }
 ],
 "id": "overlay_7FF6969B_6170_2E59_41D6_170CE39B799C",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 18.55,
   "hfov": 8.92,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.04
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B91E651_6130_6E29_41D4_A295C83FBC71, this.camera_596A8C64_7195_10BB_41D2_B465BD8BD2FF); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4702C0_6130_2627_41C0_C589E44D1C6F",
   "pitch": -10.04,
   "yaw": 18.55,
   "hfov": 8.92,
   "distance": 100
  }
 ],
 "id": "overlay_7E0D37C0_6170_EE27_41D3_E6B21BFBE8F2",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0_HS_2_0_map.gif",
      "width": 50,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 19.18,
   "hfov": 11.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.22
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0_HS_2_0.png",
      "width": 382,
      "class": "ImageResourceLevel",
      "height": 122
     }
    ]
   },
   "pitch": -6.22,
   "yaw": 19.18,
   "hfov": 11.29,
   "distance": 50
  }
 ],
 "id": "overlay_66EBAA36_7095_7087_41D3_7301D310996E",
 "data": {
  "label": "C\u00e2y Ch\u00f2 c\u1ed5 th\u1ee5"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0_HS_3_0_map.gif",
      "width": 49,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 154.79,
   "hfov": 10.85,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.23
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_0_HS_3_0.png",
      "width": 382,
      "class": "ImageResourceLevel",
      "height": 123
     }
    ]
   },
   "pitch": -17.23,
   "yaw": 154.79,
   "hfov": 10.85,
   "distance": 50
  }
 ],
 "id": "overlay_675D9378_7095_108B_41D1_9536F513B6EB",
 "data": {
  "label": "Quay v\u1ec1"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 113.47,
   "hfov": 14.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -28.67
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7FA29A_6130_265B_41AD_471BA11E0626, this.camera_57440B63_7195_10BC_41D2_1ABD8F9A9785); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D5F72C0_6130_2627_41D2_720EBFC1B357",
   "pitch": -28.67,
   "yaw": 113.47,
   "hfov": 14.89,
   "distance": 100
  }
 ],
 "id": "overlay_723767BD_6130_2E59_41C9_7E9D61C8B98B",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -99.65,
   "hfov": 15.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.57
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6BBCA94C_6130_223F_418E_FE4A484CF630, this.camera_57536B63_7195_10BC_41B1_CB50C256DAEB); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D5F32C0_6130_2627_41CC_1B9D930AAF9B",
   "pitch": -20.57,
   "yaw": -99.65,
   "hfov": 15.89,
   "distance": 100
  }
 ],
 "id": "overlay_7274E6A4_6130_6E6F_41D5_2769E6CCCFB3",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0_HS_2_0_map.gif",
      "width": 63,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 113.88,
   "hfov": 13.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -22.35
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0_HS_2_0.png",
      "width": 502,
      "class": "ImageResourceLevel",
      "height": 127
     }
    ]
   },
   "pitch": -22.35,
   "yaw": 113.88,
   "hfov": 13.79,
   "distance": 50
  }
 ],
 "id": "overlay_65984E3F_70BD_3085_41D5_5E3D01621A02",
 "data": {
  "label": "\u0110\u01b0\u1eddng v\u00e0o b\u00e3i t\u1eafm"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0_HS_3_0_map.gif",
      "width": 49,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -98.84,
   "hfov": 11.28,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.9
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_0_HS_3_0.png",
      "width": 393,
      "class": "ImageResourceLevel",
      "height": 127
     }
    ]
   },
   "pitch": -14.9,
   "yaw": -98.84,
   "hfov": 11.28,
   "distance": 50
  }
 ],
 "id": "overlay_653747A7_70BB_1F85_41D1_22C60E691F18",
 "data": {
  "label": "Ch\u00f2i ngh\u1ec9 ng\u01a1i"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -111.93,
   "hfov": 6.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.51
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A, this.camera_590F0C34_7195_109B_41D6_A56AE4D3EF38); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6ADF395D_70FD_3085_41A5_28E0051E5A93",
   "pitch": -4.51,
   "yaw": -111.93,
   "hfov": 6.15,
   "distance": 100
  }
 ],
 "id": "overlay_4657E6A7_6150_2E69_41B2_8F9534ED7463",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 68.25,
   "hfov": 4.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.75
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7C6809_6130_6239_4190_B31908BEEF24, this.camera_56FCCC34_7195_109B_41D7_B0E2403A0507); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4FB2C9_6130_2639_41C4_976BE1AE2E53",
   "pitch": -0.75,
   "yaw": 68.25,
   "hfov": 4.86,
   "distance": 100
  }
 ],
 "id": "overlay_46CC573D_6150_6E59_41A2_2E56B4BDE30A",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0_HS_2_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 166
     }
    ]
   },
   "yaw": 99.35,
   "hfov": 23.31,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 8.67
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setComponentVisibility(this.Image_780EB065_6189_A29B_41CA_4DDA36878B05, true, 0, null, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "id": "overlay_79A682B8_6188_67E9_41D4_6563795214C7",
 "data": {
  "label": "Polygon"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0_HS_3_0_map.gif",
      "width": 68,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -107.48,
   "hfov": 16.4,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.57
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0_HS_3_0.png",
      "width": 546,
      "class": "ImageResourceLevel",
      "height": 127
     }
    ]
   },
   "pitch": -1.57,
   "yaw": -107.48,
   "hfov": 16.4,
   "distance": 50
  }
 ],
 "id": "overlay_662A122D_70F7_3085_41D7_F7BFA4C73EC7",
 "data": {
  "label": "Quay v\u1ec1"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0_HS_4_0_map.gif",
      "width": 68,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 72.69,
   "hfov": 16.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.31
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0_HS_4_0.png",
      "width": 545,
      "class": "ImageResourceLevel",
      "height": 127
     }
    ]
   },
   "pitch": 2.31,
   "yaw": 72.69,
   "hfov": 16.36,
   "distance": 50
  }
 ],
 "id": "overlay_68ADBC57_70F5_3085_41B5_615B41FDAB5E",
 "data": {
  "label": "Th\u00e1c Ng\u1ecdc"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 14.15,
   "hfov": 6.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -45.75
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA, this.camera_57DDFBB8_7195_178B_41D5_3F3A4EB60598); this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4E72C9_6130_2639_41D7_5ABF91383007",
   "pitch": -45.75,
   "yaw": 14.15,
   "hfov": 6.27,
   "distance": 100
  }
 ],
 "id": "overlay_44710371_6170_E6E9_41D7_FE78B4BF6163",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -62.85,
   "hfov": 8.69,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.59
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA, this.camera_57EC0BB8_7195_178B_41CE_BF746886EC10); this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4EF2C9_6130_2639_41D2_5AACCE2424A3",
   "pitch": -14.59,
   "yaw": -62.85,
   "hfov": 8.69,
   "distance": 100
  }
 ],
 "id": "overlay_44C677E9_6173_EDF9_41CD_104D496B846F",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0_HS_2_0_map.gif",
      "width": 69,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 18.54,
   "hfov": 12.39,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -41.05
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0_HS_2_0.png",
      "width": 557,
      "class": "ImageResourceLevel",
      "height": 129
     }
    ]
   },
   "pitch": -41.05,
   "yaw": 18.54,
   "hfov": 12.39,
   "distance": 50
  }
 ],
 "id": "overlay_66B9DA92_70F7_319F_41D7_D46FD7B4A54C",
 "data": {
  "label": "Quay v\u1ec1"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0_HS_3_0_map.gif",
      "width": 69,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -57.97,
   "hfov": 16.19,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.68
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_0_HS_3_0.png",
      "width": 557,
      "class": "ImageResourceLevel",
      "height": 129
     }
    ]
   },
   "pitch": -9.68,
   "yaw": -57.97,
   "hfov": 16.19,
   "distance": 50
  }
 ],
 "id": "overlay_66C5949F_70F7_1184_41C3_B40E78CF6EB9",
 "data": {
  "label": "Hang Na"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 38.55,
   "hfov": 12.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.81
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4, this.camera_561E3BCB_7195_178C_41D9_1E4B2C1510A4); this.mainPlayList.set('selectedIndex', 1); this.stopGlobalAudio(this.audio_6AA45DF2_709B_339C_41CC_B594FB142614)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4312C0_6130_2627_41CA_D3136B667F6B",
   "pitch": -5.81,
   "yaw": 38.55,
   "hfov": 12.06,
   "distance": 100
  }
 ],
 "id": "overlay_79876144_6150_622F_41D5_925BFDB597FF",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -128,
   "hfov": 16.44,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.4
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390, this.camera_56299BD6_7195_1787_41B6_418B9B4E7BE2); this.mainPlayList.set('selectedIndex', 15); this.stopGlobalAudio(this.audio_6AA45DF2_709B_339C_41CC_B594FB142614)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D43C2C0_6130_2627_41B1_D73AEBAF3BD8",
   "pitch": -14.4,
   "yaw": -128,
   "hfov": 16.44,
   "distance": 100
  }
 ],
 "id": "overlay_79B69F24_6150_7E6F_41D3_4158846D151D",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0_HS_2_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -126.03,
   "hfov": 10.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.62
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0_HS_2_0.png",
      "width": 337,
      "class": "ImageResourceLevel",
      "height": 125
     }
    ]
   },
   "pitch": -9.62,
   "yaw": -126.03,
   "hfov": 10.02,
   "distance": 50
  }
 ],
 "id": "overlay_66B2053D_7095_1085_41C2_7FA0C5FFDF45",
 "data": {
  "label": "B\u1ea3n C\u1ecfi"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0_HS_3_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 40.09,
   "hfov": 10.26,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.06
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0_HS_3_0.png",
      "width": 340,
      "class": "ImageResourceLevel",
      "height": 125
     }
    ]
   },
   "pitch": -2.06,
   "yaw": 40.09,
   "hfov": 10.26,
   "distance": 50
  }
 ],
 "id": "overlay_6618A37D_709B_3085_41DB_7EE3454A3FF7",
 "data": {
  "label": "V\u1ec1 ng\u00e3 ba"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "yaw": -60.78,
   "hfov": 7.01,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.57
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 14, this.audio_6AA45DF2_709B_339C_41CC_B594FB142614); this.stopGlobalAudio(this.audio_67D3B1CB_70FD_F38D_41D0_415B94284D2D)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0_HS_4_0.png",
      "width": 232,
      "class": "ImageResourceLevel",
      "height": 260
     }
    ]
   },
   "pitch": -2.57,
   "yaw": -60.78,
   "distance": 50
  }
 ],
 "id": "overlay_696CBB9C_709B_378B_41A6_BDB1808AA435",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "yaw": -32.05,
   "hfov": 7.01,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.95
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 14, this.audio_6AA45DF2_709B_339C_41CC_B594FB142614); this.stopGlobalAudio(this.audio_67D3B1CB_70FD_F38D_41D0_415B94284D2D)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_0_HS_5_0.png",
      "width": 232,
      "class": "ImageResourceLevel",
      "height": 260
     }
    ]
   },
   "pitch": -1.95,
   "yaw": -32.05,
   "distance": 50
  }
 ],
 "id": "overlay_6DF9BC73_7095_709D_4192_981EAA9EB5E3",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -96.8,
   "hfov": 8.46,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.13
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6BAD5413_6130_2229_41A6_999B26A24AC6, this.camera_5984FC64_7195_10BB_41D6_04DF7A1DA20E); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4352C0_6130_2627_41D5_06A31A42CF25",
   "pitch": -19.13,
   "yaw": -96.8,
   "hfov": 8.46,
   "distance": 100
  }
 ],
 "id": "overlay_79C797BD_6153_EE59_41AB_16F7CDE10E43",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0_HS_1_0_map.gif",
      "width": 50,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -96.37,
   "hfov": 10.52,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.79
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_0_HS_1_0.png",
      "width": 368,
      "class": "ImageResourceLevel",
      "height": 116
     }
    ]
   },
   "pitch": -13.79,
   "yaw": -96.37,
   "hfov": 10.52,
   "distance": 50
  }
 ],
 "id": "overlay_659FEB37_7095_1085_41DB_FECAB65048EE",
 "data": {
  "label": "Ra ngo\u00e0i hang "
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -133.59,
   "hfov": 7,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.7
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7FCCB1_6130_2269_41AF_E018598D941C, this.camera_578F4B8D_7195_1785_41D0_4AF570D3608A); this.mainPlayList.set('selectedIndex', 30); this.stopGlobalAudio(this.audio_50E37A5B_70B5_708D_41D5_532D82CC8692)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D3032C9_6130_2639_41B6_0108D8DB243D",
   "pitch": -5.7,
   "yaw": -133.59,
   "hfov": 7,
   "distance": 100
  }
 ],
 "id": "overlay_492225BF_6150_6259_41D3_6AC0ABAE1380",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0_HS_1_0_map.gif",
      "width": 69,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -128.51,
   "hfov": 16.37,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.79
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0_HS_1_0.png",
      "width": 545,
      "class": "ImageResourceLevel",
      "height": 126
     }
    ]
   },
   "pitch": -2.79,
   "yaw": -128.51,
   "hfov": 16.37,
   "distance": 50
  }
 ],
 "id": "overlay_66A5E2AC_70F5_F18B_41DB_745C49F97A8A",
 "data": {
  "label": "Quay v\u1ec1"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 43.23,
   "hfov": 9.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.59
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 31, this.audio_50E37A5B_70B5_708D_41D5_532D82CC8692)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_0_HS_2_0.png",
      "width": 319,
      "class": "ImageResourceLevel",
      "height": 318
     }
    ]
   },
   "pitch": -1.59,
   "yaw": 43.23,
   "distance": 50
  }
 ],
 "id": "overlay_6EF4CAFC_70BB_118B_41B4_71F32603B1A4",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -8.49,
   "hfov": 13,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.94
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4, this.camera_57687B78_7195_108B_41D9_B3960623A5B8); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D4032C0_6130_2627_41C5_7BA1C1CA46EF",
   "pitch": -14.94,
   "yaw": -8.49,
   "hfov": 13,
   "distance": 100
  }
 ],
 "id": "overlay_758414AE_6130_E27B_41D3_9A207F871D82",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -126.83,
   "hfov": 14.77,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -29.5
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F, this.camera_575FFB6E_7195_1087_41B5_6C9349598016); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4D40F2C0_6130_2627_4192_FC0444B40E5E",
   "pitch": -29.5,
   "yaw": -126.83,
   "hfov": 14.77,
   "distance": 100
  }
 ],
 "id": "overlay_75C1BBC8_6130_2627_41CB_08C3B48A5A1E",
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0_HS_2_0_map.gif",
      "width": 46,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -7.99,
   "hfov": 10.84,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.24
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_0_HS_2_0.png",
      "width": 368,
      "class": "ImageResourceLevel",
      "height": 128
     }
    ]
   },
   "pitch": -9.24,
   "yaw": -7.99,
   "hfov": 10.84,
   "distance": 50
  }
 ],
 "id": "overlay_65EB97A3_70B7_1FBD_41CD_B01C87B5E75E",
 "data": {
  "label": "Ch\u00f2i ngh\u1ec9 ng\u01a1i"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "itemLabelFontWeight": "normal",
 "id": "ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D",
 "left": "0.1%",
 "width": 117.85,
 "itemThumbnailShadowBlurRadius": 8,
 "paddingBottom": 10,
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontSize": 14,
 "borderRadius": 5,
 "verticalAlign": "top",
 "minHeight": 20,
 "paddingLeft": 20,
 "scrollBarMargin": 2,
 "itemLabelFontColor": "#FFFFFF",
 "height": "90.494%",
 "minWidth": 20,
 "itemThumbnailOpacity": 1,
 "itemPaddingRight": 3,
 "borderSize": 0,
 "itemThumbnailHeight": 75,
 "class": "ThumbnailList",
 "itemPaddingBottom": 3,
 "gap": 13,
 "itemBackgroundOpacity": 0,
 "scrollBarWidth": 10,
 "itemVerticalAlign": "middle",
 "itemLabelFontStyle": "normal",
 "scrollBarOpacity": 0.5,
 "playList": "this.ThumbnailList_6EA69759_6199_AEAA_41D1_8DC150E1306D_playlist",
 "shadow": false,
 "itemOpacity": 1,
 "itemLabelHorizontalAlign": "center",
 "paddingTop": 10,
 "itemThumbnailShadowColor": "#000000",
 "itemThumbnailShadowHorizontalLength": 3,
 "itemBackgroundColorDirection": "vertical",
 "itemLabelFontFamily": "Arial",
 "itemMode": "normal",
 "scrollBarColor": "#FFFFFF",
 "selectedItemLabelFontColor": "#FFCC00",
 "itemThumbnailWidth": 75,
 "scrollBarVisible": "rollOver",
 "itemBorderRadius": 0,
 "backgroundOpacity": 0,
 "itemPaddingLeft": 3,
 "paddingRight": 20,
 "itemLabelPosition": "bottom",
 "itemThumbnailShadowSpread": 1,
 "top": "0.16%",
 "propagateClick": false,
 "itemThumbnailShadowVerticalLength": 3,
 "itemHorizontalAlign": "center",
 "itemBackgroundColor": [],
 "itemThumbnailBorderRadius": 5,
 "itemPaddingTop": 3,
 "itemLabelGap": 8,
 "itemBackgroundColorRatios": [],
 "layout": "vertical",
 "horizontalAlign": "left",
 "rollOverItemLabelFontWeight": "bold",
 "rollOverItemBackgroundOpacity": 0,
 "selectedItemLabelFontWeight": "bold",
 "data": {
  "name": "menu 1"
 },
 "visible": false,
 "itemThumbnailShadow": true,
 "itemThumbnailShadowOpacity": 0.54,
 "itemLabelTextDecoration": "none"
},
{
 "id": "IconButton_4C7ED479_61D0_22D9_4192_2463F00FFECC",
 "width": 53.75,
 "right": "47.52%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 0,
 "paddingLeft": 0,
 "propagateClick": false,
 "height": 49.4,
 "minWidth": 0,
 "mode": "push",
 "transparencyActive": false,
 "rollOverIconURL": "skin/IconButton_4C7ED479_61D0_22D9_4192_2463F00FFECC_rollover.png",
 "iconURL": "skin/IconButton_4C7ED479_61D0_22D9_4192_2463F00FFECC.png",
 "bottom": "38.78%",
 "class": "IconButton",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_4C7ED479_61D0_22D9_4192_2463F00FFECC_pressed.png",
 "click": "this.setComponentVisibility(this.Container_4D62F6AF_61D1_EE7A_41B0_4D7149FE7E22, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_4C7ED479_61D0_22D9_4192_2463F00FFECC, false, 0, null, null, false); this.setComponentVisibility(this.Label_61A6B671_706F_309D_41C1_2A2E2152A70A, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_4C86CA76_61D0_26EB_41B3_8D62F0AD5B96, true, 0, null, null, false); this.setComponentVisibility(this.IconButton_615DE8B2_7075_319C_41CF_85F44DF0DA29, true, 0, null, null, false); this.setComponentVisibility(this.IconButton_61FB7A40_7075_10FB_41CC_53270AD6AB38, true, 0, null, null, false); this.playGlobalAudio(this.audio_67D3B1CB_70FD_F38D_41D0_415B94284D2D)",
 "horizontalAlign": "center",
 "data": {
  "name": "nut bat dau"
 },
 "shadow": false,
 "paddingTop": 0,
 "cursor": "hand"
},
{
 "fontFamily": "Arial",
 "id": "Label_61A6B671_706F_309D_41C1_2A2E2152A70A",
 "right": "40.72%",
 "width": "17.681%",
 "paddingBottom": 0,
 "backgroundOpacity": 0.43,
 "paddingRight": 0,
 "text": "BẮT ĐẦU TOUR THAM QUAN ẢO",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "paddingLeft": 0,
 "height": "4.349%",
 "fontSize": "1.48vmin",
 "backgroundColorRatios": [
  0,
  0.16
 ],
 "bottom": "34.12%",
 "class": "Label",
 "borderSize": 0,
 "fontStyle": "normal",
 "horizontalAlign": "center",
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "Ch\u1eef B\u0110T"
 },
 "fontColor": "#FFFFFF",
 "shadow": false,
 "paddingTop": 0,
 "fontWeight": "normal",
 "textDecoration": "none"
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4E92C9_6130_2639_41C5_41EC613891A5",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6BA93466_6130_22EB_41C4_81DBF5C55BDA_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_7F472DD2_61F8_DDB9_41B6_8411FAB312F4",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_7F477DD2_61F8_DDB9_41D5_45B3BB1C19A3",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_7F469DD2_61F8_DDB9_41BD_654C9911AE65",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B92E15F_6130_22D9_41C3_48F2C6D4E6E4_0_HS_2_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_7F49EDD2_61F8_DDB9_41B0_BBE578A44036",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_0_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D5E32C0_6130_2627_41BC_1DF449D77402",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D5EE2C0_6130_2627_41D2_73320D8461A4",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7FA29A_6130_265B_41AD_471BA11E0626_1_HS_2_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4492C0_6130_2627_41CC_3B954B9F3D0C",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4512C0_6130_2627_41B0_96AB2468039B",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6BBA6DA7_6131_E269_41D5_DE0FF2442B3A_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D5FC2C0_6130_2627_41CC_E4FD8DEE1A48",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D5F92C0_6130_2627_41D6_644775F20064",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6BBCA94C_6130_223F_418E_FE4A484CF630_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4892C0_6130_2627_41D1_3BD3E0B2C618",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4922C0_6130_2627_41CD_103440D31A61",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7D3CE5_6130_E3E9_4198_472F9A9293BF_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4442C0_6130_2627_41C3_308FE297C1CE",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D44E2C0_6130_2627_41D2_376491B3E036",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7DF1C7_6130_E229_41B5_2DA85D20B390_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D48E2C0_6130_2627_41C1_1D25115550CA",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7D61C0_6130_2227_41CA_C4478270E0B2_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4D42C0_6130_2627_41C3_E192A353BC4D",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4DE2C9_6130_2639_41D0_4E10AA4D85D5",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B461B69_6133_E6F9_41CC_0507D3B262FA_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_7F443DD2_61F8_DDB9_418C_1BD87E274650",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7DB5F1_6130_EDE9_41D0_70713A6B14FC_0_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D47C2C0_6130_2627_41D0_FF86E81041B1",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4602C0_6130_2627_4198_5E080F072AAA",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_688EDDDB_7095_138D_41D1_41593072C8B7",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B5E6E54_6130_1E2F_41C7_9CD5FF3CDB6B_0_HS_2_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D47C2C0_6130_2627_41BF_CB465B2EEC0A",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4842C0_6130_2627_41D0_3A8383C82439",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B91E651_6130_6E29_41D4_A295C83FBC71_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4082C0_6130_2627_41D5_C9CF33D0D776",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4112C0_6130_2627_41CA_D5E24908032C",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7C8AE3_6130_67E9_41D2_F3C090A2BFB5_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4AE2C0_6130_2627_41D1_308B0A7AA725",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4B72C0_6130_2627_41C2_B9BA695FE368",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4B12C0_6130_2627_41C5_500E6194728E",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7D64EB_6130_23FA_41D7_B67F9BD9F98A_1_HS_2_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D5F12C0_6130_2627_41C2_496D979BE505",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6BBA31C6_6131_E22B_41BA_8DC02B25E24F_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_7F460DD2_61F8_DDB9_41D7_D1C34F008667",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_7F465DD2_61F8_DDB9_41A0_7BD97E8D5425",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6A52762E_6130_6E7B_4175_2F3EE71C7B27_0_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4222C0_6130_2627_41C8_F0B72DAA4FDC",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D42A2C0_6130_2627_41C4_11DA28683233",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6BAD5413_6130_2229_41A6_999B26A24AC6_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D49B2C0_6130_2627_41B7_37958C1505B4",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4A52C0_6130_2627_41C4_89BA7A271150",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7D1844_6130_222F_41D0_9D76B720413D_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D41C2C0_6130_2627_41D7_8B49F4E75DCD",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4262C0_6130_2627_41D7_3A85D0F577E3",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7C672A_6130_2E7B_41D2_7C3788E7E97D_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4BB2C0_6130_2627_41BC_C2A4CEEF93E0",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4C22C0_6130_2627_41CC_4048A0AC09D3",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4CA2C0_6130_2627_41D4_EEC4B44FCB5E",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7CD1A9_6130_6279_41CE_090BC9DBD525_1_HS_2_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4022C0_6130_2627_41C6_E9C73A11037C",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D40C2C0_6130_2627_41B4_6E198ACD23D2",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7CDE29_6130_7E79_41D6_8FB51FE64EC0_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_6DFE37CD_70B7_7F85_41BA_A418559EFE28",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_0_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4662C0_6130_2627_41CB_AB9BF39E3F84",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B4418AD_6130_2279_41C4_1416BAA6CA06_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D5FD2C0_6130_2627_41D8_19746FED6343",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4072C0_6130_2627_41D7_AE880C601B5B",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7A9E80_6130_3E28_41CA_76EB3FD057B4_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D46A2C0_6130_2627_41D2_4D5CFD85538C",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4742C0_6130_2627_419E_CDF1E68ADBFC",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B43B321_6130_2666_41D3_AD4567F628D9_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4682C0_6130_2627_41D3_AD82D12C62DA",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4702C0_6130_2627_41C0_C589E44D1C6F",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B47B9F2_6130_65EB_41C8_3108E319017E_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D5F72C0_6130_2627_41D2_720EBFC1B357",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D5F32C0_6130_2627_41CC_1B9D930AAF9B",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6BB7CE16_6130_3E2B_41AB_A4D3972B8E59_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_6ADF395D_70FD_3085_41A5_28E0051E5A93",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_0_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4FB2C9_6130_2639_41C4_976BE1AE2E53",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7FCCB1_6130_2269_41AF_E018598D941C_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4E72C9_6130_2639_41D7_5ABF91383007",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4EF2C9_6130_2639_41D2_5AACCE2424A3",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B914805_6133_E229_41B0_E00B0E2DB53D_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4312C0_6130_2627_41CA_D3136B667F6B",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D43C2C0_6130_2627_41B1_D73AEBAF3BD8",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7D5B06_6130_262B_41D6_CE2A936864E4_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4352C0_6130_2627_41D5_06A31A42CF25",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6BB2404D_6133_E239_41D4_C10083EFC5FA_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D3032C9_6130_2639_41B6_0108D8DB243D",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6B7C6809_6130_6239_4190_B31908BEEF24_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D4032C0_6130_2627_41C5_7BA1C1CA46EF",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_4D40F2C0_6130_2627_4192_FC0444B40E5E",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_6BA0D60B_6131_EE39_41D2_9436B023038D_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ]
}],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Player450"
 },
 "shadow": false,
 "paddingTop": 0,
 "mouseWheelEnabled": true,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "mobileMipmappingEnabled": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
