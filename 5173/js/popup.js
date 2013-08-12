(function() {
  var Configs, DefConfigss, Golder;

  Configs = null;

  DefConfigss = {
    pages: [
      {
        url: 'http://s.5173.com/search/a36ead01453c40b584f8e1e687723f2d-5ootfk-1got2e-ymz55j-0-kb0ewi-0-0-0-a-a-a-a-a-0-itemprice_asc-0-0.shtml',
        gold: 450
      }
    ]
  };

  Golder = (function() {
    function Golder() {
      this.loadConfigs();
    }

    Golder.prototype.loadConfigs = function() {
      var configStr;
      configStr = localStorage.getItem('config');
      if (configStr) {
        Configs = JSON.parse(configStr);
      }
      return Configs = Configs != null ? Configs : DefConfigss;
    };

    Golder.prototype.render = function() {
      var fieldsetTmpFn;
      fieldsetTmpFn = doT.template($('#tmp-fieldset').html());
      return $('#stage').html(fieldsetTmpFn(Configs));
    };

    Golder.prototype.router = function() {};

    return Golder;

  })();

  $(function() {
    var golder;
    golder = new Golder;
    return golder.render();
  });

}).call(this);
