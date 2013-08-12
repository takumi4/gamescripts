(function() {
  $(function() {
    var buyLinks, customGoldData, getMaxGold, maxGold, wantGold;
    wantGold = 450;
    buyLinks = new BuyLinks;
    customGoldData = function(goldEl, buyLink) {
      var regexpRets;
      regexpRets = (new RegExp('=(.+)')).exec(goldEl.html());
      return {
        gold: regexpRets[1],
        buyLink: buyLink
      };
    };
    getMaxGold = function() {
      var row, sortGolds, _i, _len, _ref;
      sortGolds = [];
      _ref = $('.sin_pdlbox');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        sortGolds.push(customGoldData($('.pdlist_unitprice b', row), $('.btnlink_o_s_small', row).attr('href')));
      }
      sortGolds.sort(function(a, b) {
        return b.gold - a.gold;
      });
      sortGolds = sortGolds.filter(function(gold) {
        return gold.gold > wantGold;
      });
      sortGolds = sortGolds.filter(function(gold) {
        if (!(new RegExp('Consignment$').test(gold.buyLink))) {
          console.log("价格:" + gold.gold + ", 因非寄售类型忽略购买链接: " + gold.buyLink);
        }
        return new RegExp('Consignment$').test(gold.buyLink);
      });
      sortGolds = sortGolds.filter(function(gold) {
        if (buyLinks.exist(gold.buyLink)) {
          console.log("价格:" + gold.gold + ", 因已购买或之前选择取消购买，忽略购买链接: " + gold.buyLink);
        }
        return !buyLinks.exist(gold.buyLink);
      });
      return sortGolds[0];
    };
    maxGold = getMaxGold();
    if (maxGold) {
      if (confirm("现价1元可以购买:" + maxGold.gold + "金，请问是否买入？")) {
        buyLinks.write(maxGold.buyLink);
        return chrome.runtime.sendMessage({
          type: 'OPEN_TAB',
          url: maxGold.buyLink
        }, function(resp) {});
      } else {
        buyLinks.write(maxGold.buyLink);
        return setTimeout(function() {
          return location.href = location.href;
        });
      }
    } else {
      return setTimeout(function() {
        return location.href = location.href;
      }, 2000);
    }
  });

}).call(this);
