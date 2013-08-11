(function() {
  $(function() {
    var customGoldData, getMaxGold, maxGold, wantGold;
    wantGold = 450;
    customGoldData = function(goldEl, buyBtnEl) {
      var regexpRets;
      regexpRets = (new RegExp('=(.+)')).exec(goldEl.html());
      return {
        gold: regexpRets[1],
        buyBtnEl: buyBtnEl
      };
    };
    getMaxGold = function() {
      var row, sortGolds, _i, _len, _ref;
      sortGolds = [];
      _ref = $('.sin_pdlbox');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        sortGolds.push(customGoldData($('.pdlist_unitprice b', row), $('.btnlink_o_s_small', row)));
      }
      sortGolds.sort(function(a, b) {
        return b.gold - a.gold;
      });
      return sortGolds[0];
    };
    maxGold = getMaxGold();
    if (maxGold.gold > wantGold) {
      if (confirm("现价1元可以购买:" + maxGold.gold + "金，请问是否买入？")) {
        return chrome.runtime.sendMessage({
          type: 'OPEN_TAB',
          url: maxGold.buyBtnEl.attr('href')
        }, function(resp) {});
      } else {
        return location.href = location.href;
      }
    } else {
      return setTimeout(function() {
        return location.href = location.href;
      }, 2000);
    }
  });

}).call(this);
