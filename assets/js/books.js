;(function($) {

  (function(pluginName) {

    var defaults = {

      load: function($elem){

        var self = this;

        $.getJSON("http://books.javierarce.com/api/books/currently_reading", function(response) {
          self._onSuccess($elem, response)
        });

      },

      _onSuccess: function($elem, response) {

        var self = this;

        var urls = _.pluck(response, "cover_url");

        new preLoader(urls, {

          onError: function(src){
            // console.log(src)
          },

          onComplete: function(loaded, errors){

            var e = {};

            _.each(loaded, function (error) { e[error] = true; });

            var out = _.filter(response, function (val) {
              return e[val.cover_url];
            });

            for (var i = 0; i < out.length; i++) {

              var title     = out[i].title.replace(/'/g, '&#39;');
              var url       = out[i].url;
              var cover_url = out[i].cover_url;

              var $li = $("<li><a href='" + url + "' title='" + title + "'><img src='" + cover_url + "?default=false' /></a></li>");
              $elem.append($li);

            }
          }
        });
      }
    };

    $.fn[pluginName] = function(options) {

      options = $.extend(true, {}, defaults, options);

      var elem = this,
      $elem = $(elem);

      options.$elem = $elem;
      options.elem  = elem;

      options.load(options.$elem);

    };

    $.fn[pluginName].defaults = defaults;

  })('books');

})(jQuery);
