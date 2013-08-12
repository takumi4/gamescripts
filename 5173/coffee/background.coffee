

MessageProcs = {

    'OPEN_TAB' : (req, sender, sendResp) ->
        chrome.tabs.create({
            url: req.url
        }, ()->
        )
        sendResp({msg:'success'})
}


#msg dispatcher
chrome.runtime.onMessage.addListener( (req, sender, sendResp) ->

    #debug info
    if sender.tab
        console.log 'from a content script:' + sender.tab.url
    else
        console.log 'from the extension'


    MessageProcs[req.type].call(null, req, sender, sendResp) if req.type and MessageProcs[req.type]

)
