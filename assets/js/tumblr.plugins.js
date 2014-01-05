plugins = {};

plugins.NSA = function($elem) {
  console.log("test plugin");
};

plugins.popcorn = function($article) {

  var $video = $article.find(".video");
  var src    = $video.find("iframe").attr("src");
  var width  = $video.find("iframe").css("width");
  var height = $video.find("iframe").css("height");

  $video.fadeOut(250, function() { this.remove(); });

  var id = "player_" + Math.round(Math.random(100) * 100);
  var annotationID = id + "_annotations";

  $article.prepend('<div id="'+id+'" class="annotation_player"><div id="' + annotationID +'" class="annotations" /></div>');
  $article.find("#" + id).width(width).height(height);

  var p = Popcorn.youtube('#' + id, src );

  p.code({
    "start": 0,
    "end": 4,
    onStart: function() {
      $("#" + annotationID).fadeOut(250, function() {
        $("#" + annotationID).html('<div class="welcome">This video contains annotations</div>');
        $("#" + annotationID).fadeIn(250);
      });
    }
  })
  .code({
    "start": 14,
    "end": 24,
    onStart: function() {
      $("#" + annotationID).fadeOut(250, function() {
        $("#" + annotationID).html('iTest');
        $("#" + annotationID).fadeIn(250);
      });
    }
  }).footnote({
    "start": 54,
    "end": 98,
    "target": annotationID,
    "text": '<a href="https://twitter.com/ioerror" target="_blank">Jacob Appelbaum on Twitter</a>'
  }).footnote({
    "start": 90,
    "end": 95,
    "target": annotationID,
    "text": "Test 2"
  }).footnote({
    "start": 45,
    "end": 65,
    "target": annotationID,
    "text": '<a href="http://www.cru-inc.com/products/wiebetech/mouse_jiggler" target="_blank">Mouse Jiggler</a>'
  });

};
