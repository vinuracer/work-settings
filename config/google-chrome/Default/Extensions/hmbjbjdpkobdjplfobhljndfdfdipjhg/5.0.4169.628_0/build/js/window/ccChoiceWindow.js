"use strict";var g;function execute(){g={meeting:mainAppHtmlWindow.inmeeting,myStatus:mainAppHtmlWindow.myStatusObject,ccObj:mainAppHtmlWindow.inmeeting.ccObj},bindCCChoiceEvt()}function bindCCChoiceEvt(){escEvt("body",function(){mainAppHtmlWindow.closeWindow("shareMoreWindow"),window.close()}),bindClickOniType(),bindClickOpenManageParticipants()}function bindClickOniType(){$(".defbtn").click(function(){mainAppHtmlWindow.closeWindow("shareMoreWindow"),g.ccObj.availableCC=!0,g.meeting.changeCCEditor(g.myStatus.id),mainAppHtmlWindow.client.openTyperWin(),g.meeting.hideCCChoice(),g.meeting.enableCCBtnStyle(),window.close()})}function bindClickOpenManageParticipants(){$(".infobtn").click(function(){mainAppHtmlWindow.eev.emit(mainAppHtmlWindow.g.getConstants().PARTICIAPNTS.SHOW,{show:!0,type:"chrome-window"}),g.ccObj.availableCC=!1,g.meeting.hideCCChoice(),g.meeting.disableCCBtnStyle(),window.close()})}