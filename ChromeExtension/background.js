console.log('background running...');

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    console.log("clicked!!")
    var msg = {
        txt: "some message"
    }
    chrome.tabs.sendMessage(tab.id,msg);
}