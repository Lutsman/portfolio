// Adding event listeners
if(document.addEventListener) { // For all major browsers, except IE 8 and earlier
    window.addEventListener('resize', function(){ frameFitting('mainFrame')});
    window.addEventListener('load',function(){slider.init('mainFrame');} );
	document.getElementById('mainFrame').addEventListener('load', function(){frameFitting('mainFrame');});
}
else if(document.attachEvent) { // For IE 8 and earlier
    window.attachEvent('onresize', function(){frameFitting('mainFrame');});
    window.attachEvent('onload',function(){slider.init('mainFrame');} );
	document.getElementById('mainFrame').attachEvent('onload', function(){frameFitting('mainFrame');});
}

function frameFitting(frameId) {
	var frame = document.getElementById(frameId);
	frame.height = "100px"; //frame zeroing
    frame.width = '100%';
    frame.height = frame.contentWindow.document.body.scrollHeight + 'px';
	frameHeightCorrection(frame);
}

function frameHeightCorrection(frameObj) { //removing vertical scroll in frame
	var contentHeightWithScrollBar = frameObj.contentWindow.innerHeight;
	var contentHeightWithoutScrollBar = frameObj.contentWindow.document.documentElement.clientHeight;
	if(contentHeightWithScrollBar > contentHeightWithoutScrollBar) {
		frameObj.height = contentHeightWithScrollBar + (contentHeightWithScrollBar - contentHeightWithoutScrollBar) + 'px';
	}
}

var slider ={
    frameId : '',
    frameArray : [],
    firstFrame: '',
    init : function(frameId) {
        var tempLinksStore = document.getElementById(frameId).contentWindow.document.getElementsByTagName('a');
        slider.firstFrame = document.getElementById(frameId).src;
        slider.frameId = frameId;
        for(var i=0; i<tempLinksStore.length; i++){
            slider.frameArray[i] = tempLinksStore[i].href;
        }
        if(document.addEventListener) {
            document.getElementById('mainFrame').addEventListener('load', function () {
                slider.check();
            });
        }
        else if(document.attachEvent) {
            document.getElementById('mainFrame').attachEvent('onload', function () {
                slider.check();
            });
        }
    },
    check : function(){
        var currentFrameURL = document.getElementById(slider.frameId).contentWindow.document.URL;
        var prev = false, next = false, close = false;
        if(currentFrameURL == slider.firstFrame){
            slider.navFitting(prev, next, close); //hide navigation
        }
        else {
            for(var i=0; i<slider.frameArray.length; i++) { //looking where are we
               if(slider.frameArray[i] == currentFrameURL) {
                   close = true;
                   if(slider.frameArray[i-1]){
                       prev = slider.frameArray[i-1];
                   }
                   if(slider.frameArray[i+1]){
                       next = slider.frameArray[i+1];
                   }
                   slider.navFitting(prev, next, close); //show navigation
                   break;
               }
            }
        }

    },
    navFitting : function(prevLink, nextLink, closeStatus) {
        var navButtonsId = ['prev', 'next', 'close'];
        var navLinkArr = [prevLink, nextLink, closeStatus];
        var navButtonObj = null;
        for(var i=0; i<navButtonsId.length; i++) {
            navButtonObj = document.getElementById(navButtonsId[i]);
            if(navLinkArr[i]){
                navButtonObj.style.display = 'block';
                if(i<navLinkArr.length-1) {
                    navButtonObj.href = navLinkArr[i];
                }
            }
            else {
                navButtonObj.style.display = 'none';
            }
        }
    }
};


