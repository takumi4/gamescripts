(function() {
  var BuyLinks;

  BuyLinks = (function() {
    function BuyLinks() {
      this.BUY_LINK_KEY = 'BUY_LINKS';
      this.load();
    }

    BuyLinks.prototype.load = function() {
      var ex;
      if (localStorage.getItem(this.BUY_LINK_KEY)) {
        try {
          return this.buyLinks = JSON.parse(localStorage.getItem(this.BUY_LINK_KEY));
        } catch (_error) {
          ex = _error;
          alert(ex);
          return this.buyLinks = [];
        }
      } else {
        return this.buyLinks = [];
      }
    };

    BuyLinks.prototype.save = function() {
      return localStorage.setItem(this.BUY_LINK_KEY, JSON.stringify(this.buyLinks));
    };

    BuyLinks.prototype.write = function(url) {
      this.buyLinks.push(url);
      return this.save();
    };

    BuyLinks.prototype.exist = function(url) {
      return this.buyLinks.indexOf(url) !== -1;
    };

    return BuyLinks;

  })();

  this.BuyLinks = BuyLinks;

}).call(this);
