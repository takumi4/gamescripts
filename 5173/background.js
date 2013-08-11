/*
var goldPagePort;
chrome.extension.onConnect.addListener(function(port){
    switch(port.name){
        case 'gold_page':
            goldPagePort = port;
            goldPagePort.onMessage.addListener(function(msg){
                console.log(msg);
            });
            break;
    }

});
*/
chrome.runtime.onMessage.addListener(function(req, sender, sendResp){
    console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
    if(req.type == 'OPEN_TAB'){
        chrome.tabs.create({
            url: req.url
        }, function(){
        });
        sendResp({msg:'success'});
    }
});
