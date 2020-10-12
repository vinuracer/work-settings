"use strict";var showOnTop,isFocused=!0;function setupMainWindowEventListeners(){$(".meeting-id a").off("click").click(function(){moveTop(showOnTop?0:1)}),$(".meeting-id").off("click").click(function(){showMainBar(1)}),$(window).focus(function(){isFocused=!0}),$(window).blur(function(){isFocused=!1,checkFocus()}),$(".optiontitle").off("click").click(function(){mainAppHtmlWindow.client.stopShare()}),$(".main-bar").delegate("li","click",function(e){var n=$(this).attr("data-name");"mute"==n?mainAppHtmlWindow.inmeeting.mute():"phonemute"==n?mainAppHtmlWindow.inmeeting.mute():"audio"==n?mainAppHtmlWindow.client.showJoinAudioWindow():"participant"==n?mainAppHtmlWindow.eev.emit(mainAppHtmlWindow.g.getConstants().PARTICIAPNTS.SHOW,{show:!0,type:"chrome-window"}):"qa"==n?mainAppHtmlWindow.winMgr.createWindow("qaWin","build/window/qaWindow.html",{width:500,height:600,minWidth:500,minHeight:600,resizable:!0},function(e){e.contentWindow.qa.initQAWin()}):"poll"==n?mainAppHtmlWindow.client.showPollingWindow(1):"newshare"==n?mainAppHtmlWindow.inmeeting.startShare():"share-pause"==n?mainAppHtmlWindow.inmeeting.pauseShare():"share-resume"==n?mainAppHtmlWindow.inmeeting.resumeShare():"more"==n&&(mainAppHtmlWindow.closeWindow("ccTooltipWin"),showHideBreakout(),null===mainAppHtmlWindow.winMgr.getWinByWinId("shareMoreWindow")?mainAppHtmlWindow.showShareMoreWindow(1):mainAppHtmlWindow.showShareMoreWindow(0))})}function showPausedUI(){$(".main-bar .share-status").removeClass("share-pause").addClass("share-resume"),$(".main-bar .share-status").attr("data-name","share-resume"),$(".main-bar .share-status i").removeClass("img-share-pause").addClass("img-share-resume"),$(".main-bar .share-status span").text("Resume Share"),$(".footbar .left").addClass("pause"),$(".meeting-id .text").addClass("pause"),$(".meeting-id .text").text("Your desktop sharing is paused")}function showSharingUI(){$(".main-bar .share-status").removeClass("share-resume").addClass("share-pause"),$(".main-bar .share-status").attr("data-name","share-pause"),$(".main-bar .share-status i").removeClass("img-share-resume").addClass("img-share-pause"),$(".main-bar .share-status span").text("Pause Share"),$(".footbar .left").removeClass("pause"),$(".meeting-id .text").removeClass("pause"),$(".meeting-id .text").text("ID: "+mainAppHtmlWindow.common.addShortLine(mainAppHtmlWindow.g.getMeetingStatusObj().meetingNo))}function showMainBar(e){showOnTop&&(mainAppHtmlWindow.winMgr.getWinByWinId("shareMainWindow").outerBounds.top=e?0:-52)}function checkFocus(){setTimeout(function(){var e=mainAppHtmlWindow.winMgr.getWinByWinId("shareMainWindow"),n=mainAppHtmlWindow.winMgr.getWinByWinId("shareMoreWindow");e.contentWindow.isFocused||(n&&(n.contentWindow.isFocused||(n.close(),n=null)),n||showOnTop&&(e.outerBounds.top=-52))},100)}function moveTop(e){e?(showOnTop=!0,mainAppHtmlWindow.winMgr.getWinByWinId("shareMainWindow").outerBounds.top=-52,$(".meeting-id i.arrow").removeClass("img-uparrow").addClass("img-downarrow"),$(".meeting-id").find("a").attr("title","Move to bottom")):(showOnTop=!1,mainAppHtmlWindow.winMgr.getWinByWinId("shareMainWindow").outerBounds.top=screen.availHeight-82,$(".meeting-id  i.arrow").removeClass("img-downarrow").addClass("img-uparrow"),$(".meeting-id").find("a").attr("title","Dock to top"));var n=mainAppHtmlWindow.winMgr.getWinByWinId("shareMoreWindow");n&&n.close()}function positionShareWindow(){var e=mainAppHtmlWindow.winMgr.getWinByWinId("shareMainWindow"),n=mainAppHtmlWindow.winMgr.getWinByWinId("shareMoreWindow");e&&(e.outerBounds.left=(screen.availWidth-e.outerBounds.width)/2,showOnTop||(e.outerBounds.top=screen.availHeight-82)),n&&n.close()}function initShareMainWindow(){$(".meeting-id .text").text("ID: "+mainAppHtmlWindow.common.addShortLine(mainAppHtmlWindow.g.getMeetingStatusObj().meetingNo)),mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar&&!mainAppHtmlWindow.g.getMeetingStatusObj().meetingIsViewOnly&&$(".main-bar li.qa").removeClass("forceHide"),mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar&&(mainAppHtmlWindow.myStatusObject.isHost||mainAppHtmlWindow.myStatusObject.isCoHost?showPollingButtonInToolbar(1):showPollingButtonInToolbar(0)),refreshParticipantNumber4ShareWin(),0!==mainAppHtmlWindow.chatObject.chatNum&&(chat.refreshChatRemindNumber(mainAppHtmlWindow.chatObject.chatNum),showMainBar(1)),setConfEncryptionType(),setupMainWindowEventListeners()}function setConfEncryptionType(){var e=mainAppHtmlWindow.g.getMeetingStatusObj().encryptionAlg;2==e?$(".meeting-id .share-encrypt-icon").removeClass("forceHide").removeClass("share-encrypt-standard-icon").addClass("share-encrypt-enhanced-icon"):1==e?$(".meeting-id .share-encrypt-icon").removeClass("forceHide").removeClass("share-encrypt-enhanced-icon").addClass("share-encrypt-standard-icon"):$(".meeting-id .share-encrypt-icon").addClass("forceHide")}function refreshAudioStatusInShare(e){"AUDIO_NONE"==e.audioType?(showAudio(),hideMute()):(hideAudio(),"AUDIO_TELEPHONY"==e.audioType?(showPhone(),hideMute(),e.audioIsMuted?($(".main-bar .phonemuteText").text("Unmute"),$(".main-bar .phone-li").removeClass("phonemute").addClass("phoneunmute"),$(".main-bar .phone-li i.phoneImg").removeClass().addClass("phoneImg img-sprite img-phonemute"),$(".main-bar .phone-li a").attr("title","Unmute My Phone (Alt+A)"),$(".footbar i.img-listPhoneOff").removeClass("forceHide")):($(".main-bar .phonemuteText").text("Mute"),$(".main-bar .phone-li").removeClass("phoneunmute").addClass("phonemute"),$(".main-bar .phone-li i.phoneImg").removeClass().addClass("img-phoneunmute phoneImg img-sprite"),$(".main-bar .phone-li a").attr("title","Mute My Phone (Alt+A)"),$(".footbar i.img-listPhoneOff").addClass("forceHide"))):(showMute(),hidePhone(),e.audioIsMuted?(stopGetMicLevel(),$(".main-bar .muteText").text("Unmute"),$(".main-bar .mute-li").removeClass("mute").addClass("unmute"),$(".main-bar .mute-li i").removeClass().addClass("muteImg img-sprite img-mute"),$(".main-bar .mute-li a").attr("title","Unmute My Audio (Alt+A)"),$(".footbar i.img-listAudioOff").removeClass("forceHide")):($(".main-bar .muteText").text("Mute"),$(".main-bar .mute-li").removeClass("unmute").addClass("mute"),$(".main-bar .mute-li i").removeClass("img-mute").addClass("img-unmute"),$(".main-bar .mute-li a").attr("title","Mute My Audio (Alt+A)"),startGetMicLevel(),$(".footbar i.img-listAudioOff").addClass("forceHide"))))}function refreshVideoStatusInShare(e){e.videoHasCamera?($(".share-more .video").removeClass("forceHide"),e.videoIsSending?$(".share-more .video span").text("Stop Video"):$(".share-more .video span").text("Start Video")):$(".share-more .video").addClass("forceHide")}function refreshShareMoreStatus(){refreshVideoStatusInShare(mainAppHtmlWindow.myStatusObject)}function refreshShareMainStatus(){refreshAudioStatusInShare(mainAppHtmlWindow.myStatusObject),refreshRecordingStatus()}function refreshParticipantNumber4ShareWin(){$(".participants-number").html(util.getParticipantsNum())}function initShareMoreWindow(){showChatOption(),refreshRecordButton(),showHideCC(),showHideBreakout(),0!==mainAppHtmlWindow.chatObject.chatNum?($(".share-more dd.chat span").text("Chat ("+mainAppHtmlWindow.chatObject.chatNum+")"),$(".share-more dd.chat span").addClass("info")):$(".share-more dd.chat span").text("Chat"),mainAppHtmlWindow.g.getMeetingStatusObj().inBO?$(".share-more dd.leave-meeting span").text("Leave Breakout Room"):mainAppHtmlWindow.myStatusObject.isHost?$(".share-more dd.leave-meeting span").text("End Meeting"):$(".share-more dd.leave-meeting span").text("Leave Meeting"),$(".share-more").delegate("dd","click",function(e){var n=$(this).attr("data-name");"video"==n?mainAppHtmlWindow.inmeeting.toggleMyVideo():"cc"===n?handleCCEvt():"invite"===n||("chat"===n?(mainAppHtmlWindow.client.createChatWindow(!1),mainAppHtmlWindow.chat.refreshChatRemind("hideRemind")):"record"===n?mainAppHtmlWindow.inmeeting.startCMR():"stoprecord"===n?mainAppHtmlWindow.inmeeting.stopCMR():"resumerecord"===n?mainAppHtmlWindow.inmeeting.resumeCMR():"pauserecord"===n?mainAppHtmlWindow.inmeeting.pauseCMR():"leaveMeeting"===n&&(mainAppHtmlWindow.g.getMeetingStatusObj().inBO?mainAppHtmlWindow.client.createLeaveBoWindow():mainAppHtmlWindow.myStatusObject.isHost?mainAppHtmlWindow.client.createLeaveMeetingWindow("endConfirm"):mainAppHtmlWindow.client.createLeaveMeetingWindow("leaveConfirm"))),isFocused=!1;var i=mainAppHtmlWindow.winMgr.getWinByWinId("shareMainWindow");i.contentWindow.isFocused||i.contentWindow.checkFocus(),mainAppHtmlWindow.showShareMoreWindow(0)})}function showCCMenuItemStyle(){mainAppHtmlWindow.inmeeting.ccObj.availableCC?$('dd[data-name="cc"]').addClass("more-cc").find("i").removeClass("forceHide"):$('dd[data-name="cc"]').removeClass("more-cc").find("i").addClass("forceHide")}function resetCCBtnStyle(e){var n=mainAppHtmlWindow.inmeeting;e?n.enableCCBtnStyle():n.disableCCBtnStyle()}function handleCCEvt(){var e,n=mainAppHtmlWindow.myStatusObject,i=mainAppHtmlWindow.CCStatusObject,t=mainAppHtmlWindow.inmeeting.ccObj,o=n.isHost,a=i.hasAssignedCCEditor;if(t.availableCC=!t.availableCC,e=t.availableCC,showCCMenuItemStyle(),resetCCBtnStyle(e),!e)return mainAppHtmlWindow.closeWindow("ccMsgWin"),mainAppHtmlWindow.closeWindow("ccChoiceWin"),void mainAppHtmlWindow.closeWindow("typerWin");!o||a?handleCCEvtByMyself():showHideCCChoice()}function openAssignToWin(){var e=getCCAssignToWinPos(307);util.deferTodo(function(){mainAppHtmlWindow.winMgr.createWindow("ccAssignToWin","build/window/ccAssignToWindow.html",{width:307,height:67,left:e.left,top:e.top},function(e){e.contentWindow.execute()})},0)}function handleCCEvtByAttendee(){showCCMsgWin()}function handleCCEvtByCCMyself(){mainAppHtmlWindow.inmeeting.ccObj.availableCC&&mainAppHtmlWindow.client.openTyperWin()}function handleCCEvtByMyself(){mainAppHtmlWindow.inmeeting.ccObj;var e=mainAppHtmlWindow.myStatusObject,n=mainAppHtmlWindow.CCStatusObject;e.isHost,n.hasAssignedCCEditor;n.isMyself?handleCCEvtByCCMyself():handleCCEvtByAttendee()}function showHideCCChoice(){var e=mainAppHtmlWindow.CCStatusObject;getWinPosition(350,170);e.canShowCCButton?showCCChoiceWin():closeCCChoiceWin()}function getWinPosition(e,n){var i=mainAppHtmlWindow.winMgr.getWinByWinId("shareMainWindow"),t=0;if(i)return t=i.contentWindow.showOnTop?i.outerBounds.top+i.outerBounds.height+5:i.outerBounds.top-n-5,{left:i.outerBounds.left+i.outerBounds.width-175,top:t}}function showCCChoiceWin(){var e=getWinPosition(350,170);mainAppHtmlWindow.winMgr.createWindow("ccChoiceWin","build/window/ccChoiceWindow.html",{width:350,height:165,left:e.left,top:e.top},function(e){e.contentWindow.execute()})}function closeCCChoiceWin(){mainAppHtmlWindow.closeWindow("ccChoiceWin")}function showHideCC(){var e=mainAppHtmlWindow.CCStatusObject.canShowCCButton,n=$('dd[data-name="cc"]');e?(showCCMenuItemStyle(),n.removeClass("forceHide")):n.addClass("forceHide")}function getCCAssignToWinPos(e){return{left:Math.round(screen.availWidth-e-10),top:50}}function showTooltipWin(e){var n=getWinPosition(300,75);mainAppHtmlWindow.winMgr.createWindow("ccTooltipWin","build/window/ccTooltipWindow.html?content="+e,{width:300,height:75,left:n.left,top:n.top},function(e){e.contentWindow.execute()})}function getCCMsgWinPos(){return{left:Math.round((screen.availWidth-200)/2),top:Math.round(screen.availHeight-75-100)}}function showCCMsgWin(e){var n,i=e||"",t=mainAppHtmlWindow.winMgr.getWinByWinId("ccMsgWin");t?(t.contentWindow.deferToClose(),t.contentWindow.showCCMsgWin(i)):(n=getCCMsgWinPos(),mainAppHtmlWindow.winMgr.createWindow("ccMsgWin",encodeURI("build/window/ccMsgWindow.html?content="+i),{width:240,height:60,left:n.left,top:n.top},function(e){e.contentWindow.execute()}))}function showBoButton(){$(".hasborder").find('dd[data-name="breakout"]').removeClass("forceHide").click(function(){mainAppHtmlWindow.client.handleBoEvt()})}function showJoinBoButton(e,n){$(".hasborder").find('dd[data-name="askforhelp"]').addClass("forceHide").off("click").end().find('dd[data-name="joinbreakout"]').removeClass("forceHide").click(function(){mainAppHtmlWindow.client.createJoinBoWindow(e,n)})}function showAskForHelpButton(){$(".hasborder").find('dd[data-name="askforhelp"]').removeClass("forceHide").click(function(){mainAppHtmlWindow.client.createAskForHelpWindow()})}function hideAskForHelpButton(){$(".hasborder").find('dd[data-name="askforhelp"]').addClass("forceHide").off("click")}function showHideBreakout(){var e=mainAppHtmlWindow.myStatusObject.isHost||mainAppHtmlWindow.inmeeting.boObj.boHost.gotHost,n=mainAppHtmlWindow.g.getMeetingStatusObj().isBOEnabled,i=mainAppHtmlWindow.g.getMeetingStatusObj().inBO,t=mainAppHtmlWindow.inmeeting.isInprogress(),o=mainAppHtmlWindow.inmeeting.isAssignedAttendee(),a=mainAppHtmlWindow.inmeeting.isStopping(),s=mainAppHtmlWindow.g.getMeetingStatusObj().BID,d=mainAppHtmlWindow.g.getMeetingStatusObj().BOName;e&&n?showBoButton():i?a||showAskForHelpButton():t&&o?showJoinBoButton(s,d):hideAskForHelpButton()}function onShareCheckPassed(){showChooseShareUI(!0),bindChooseShare()}function showChooseShareUI(e){e?(mainAppHtmlWindow.g.getMeetingStatusObj().isShareDesktopDisabled?$(".choose-share-source-container [data-type='screen']").addClass("forceHide"):$(".window-choose-share-source [data-type='screen']").removeClass("forceHide"),$(".choose-share-source-container").removeClass("forceHide")):$(".choose-share-source-container").addClass("forceHide")}function bindChooseShare(){$(".choose-share-source-container").off("click").on("click","li",function(e){var n=$(e.target).closest("li").data("type"),i=mainAppHtmlWindow.winMgr.getWinByWinId("shareMainWindow");i&&i.hide(),mainAppChromeWindow.restore(),mainAppHtmlWindow.inmeeting.showSystemChooseShareWindow([n])}),$("body").one("click",showChooseShareUI.bind(null,!1))}