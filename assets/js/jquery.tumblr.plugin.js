;(function($) {

  (function(pluginName) {
    var defaults = {

      loadPlugin: function(pluginName) {
        plugins && plugins[pluginName] && plugins[pluginName].call(this, this.$elem);
      },

      checkTags: function(pluginName) {

        var exist = this.$elem.find(this.tag).filter(function() {
          return $(this).text() === pluginName;
        })

        if (exist && exist.length > 0) this.loadPlugin(pluginName);
      }

    };

    $.fn[pluginName] = function(options) {

      options = $.extend(true, {}, defaults, options);

      return this.each(function() {
        var elem = this,
        $elem = $(elem);

        options.$elem = $elem;
        options.elem  = elem;

        for (var i = 0; i < options.plugins.length; i++) {
          options.checkTags(options.plugins[i]);
        }

      });
    };
    $.fn[pluginName].defaults = defaults;
  })('tumblrPlugins');
})(jQuery);
