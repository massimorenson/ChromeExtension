console.log("hi page!")

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
    console.log(message.txt);
    //console.log(document.documentElement.innerHTML);
    //var a = document.getElementsByTagName("a").href;
    console.log(document);
    var arr = [], l = document.links;
    for(var i=0; i<l.length; i++) {
        arr.push(l[i].href);
    }
    console.log(arr);

}