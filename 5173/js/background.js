(function() {
  var MessageProcs;

  MessageProcs = {
    'OPEN_TAB': function(req, sender, sendResp) {
      chrome.tabs.create({
        url: req.url
      }, function() {});
      return sendResp({
        msg: 'success'
      });
    }
  };

  chrome.runtime.onMessage.addListener(function(req, sender, sendResp) {
    if (sender.tab) {
      console.log('from a content script:' + sender.tab.url);
    } else {
      console.log('from the extension');
    }
    if (req.type && MessageProcs[req.type]) {
      return MessageProcs[req.type].call(null, req, sender, sendResp);
    }
  });

}).call(this);
