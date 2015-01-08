
postCount = 0;
tags      = [];

function instapaper(url, title) {
  window.location = "http://www.instapaper.com/hello2?url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(title);
}

var sentences = ["Stop touching my face", "This is very silly", "Hi", "How are you?"];

var onLogoClick = function(e) {

  e.preventDefault();

  var top = 30 + Math.round(Math.random() * 70) + "px";
  var sentence = sentences[Math.round(Math.random() * (sentences.length - 1))];

  var right = $(".bubble").width(); 

  if ($(".bubble").length > 0) {
    $(".bubble").fadeOut(250, function() {
      $(this).remove();
      $("nav").append("<div class='bubble'></div>");
      $(".bubble").css({ top: top, right: right });
      $(".bubble").html(sentence);
    });
  } else {

    $("nav").append("<div class='bubble'></div>");
    $(".bubble").css({ top: top, right: right });
    $(".bubble").html(sentence);
  }


};

var bubbles = function() {

  $("nav a").click(onLogoClick);

};

var tumblrStats = function() {

  var tumblr = "http://api.tumblr.com/v2/blog/blog.javierarce.com/posts?api_key=RhHmR8xQlhikht0tMBKZ9JIyMMyh221P3SvPULRQIiaEe8rw4i";

  $.ajax({ url: tumblr, dataType: 'jsonp' }).done(function(data) {
    if (data.meta.status == 200 && data.meta.msg == "OK" ) {
      var response = data.response;

      postCount = response.total_posts;

      for (var i = 0; i< response.posts.length; i++) {
        if (response.posts[i].tags.length > 0) {
          for (var j = 0; j < response.posts[i].tags.length; j++) {
            tags.push(response.posts[i].tags[j]);
          }
        }

      }

      tags = _.uniq(tags);

      if (tags.length > 0 && postCount > 0) {

        $("#about .inner").append("<p class='tags' />");

        var shuffle = function(v){
          for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
          return v;
        };

        var rTags = shuffle(tags);

        $("#about .inner p.tags").html("There are about " + Math.round(postCount / 10) * 10 + " posts in this blog, with topics ranging from '" + rTags[0] + "' and '" + rTags[1] + "' to '" + rTags[2] + "', '" + rTags[3] + "' and '" + rTags[4] + "'.");

      }

    }
  });
};

function setupVideos() {

var videos = [];

    var color = "55AAAA";
    var opts = "title=0&byline=0&portrait=0";

    $("iframe").each(function() {
      var $obj = $(this);
      var data = $obj.attr("data");
      var vsrc = $obj.attr("src");
      var oldW = $obj.attr("width");
      var newW = 640;
      var oldH = $obj.attr("height");
      var p = oldW/newW;
      var newH = (oldH / p);
      if (vsrc.search("youtube") > 0) {
      $obj.replaceWith('<iframe src="'+vsrc+'?'+opts+'&amp;color='+color+'" width="'+newW+'" height="'+newH+'" frameborder="0"></iframe>');
      }
      });

    var
    i = 0,
      iframes = document.body.getElementsByTagName('iframe'),
      newVimeoWidth = 640,
      newVimeoHeight = 'auto';
    window.players = [];
    var players = [];
    for (var x in iframes){


      if(iframes[x].src && iframes[x].src.indexOf('player.vimeo.com') > -1){

        if (newVimeoHeight == 'auto'){
          newVimeoHeight = ( newVimeoWidth * 9 ) / 16;
        }

        iframes[x].setAttribute("id", "player" + x);
        iframes[x].width = newVimeoWidth;
        iframes[x].height = newVimeoHeight;
        iframes[x].setAttribute("src", iframes[x].src + "?api=1&player_id=player" + x);
      }
    }
}


$(function() {

  setupVideos();

  $("article").tumblrPlugins({ tag: "li.tag a", plugins: ["walk"] });
  $("#listening").snitch({ username: "javierarce", api_key: "52baf5483029010e0e7ece53ac76449e" });

  tumblrStats();
  $(".js-BookList").books();

  //bubbles();

  $("article.link").each(function(i, post) {
    var $post = $(post);
    var bottom = $post.height() - 58;
    $post.find(".comment").css("bottom", bottom);
  });

  $("article.photo").each(function(i, post) {
    var $post = $(post);
    var bottom = $post.height() - $post.find("img").height() + 4;
    $post.find(".comment").css("bottom", bottom);
  });

  $("article footer .edit").live("click", function(e) {
    e.preventDefault();

    var
    $article = $(this).parents("article");
    // height   = $article.data("height");

    // if (height != undefined) {
    //   $article.animate({height:height}, 250, function() {

    //     var
    //     $footer = $article.find("footer"),
    //     height  = $footer.data("paddingBottom");

    //     $(this).parent().find(".note").fadeToggle(250);
    //     $footer.css({position:'absolute', bottom:'0', paddingBottom:paddingBottom});
    //   });
    // } else {
    var text = $(this).text() == 'More' ? 'Less' : 'More';
    $article.find('.note').fadeToggle(250);
    $(this).text(text);
    // }
  });

  $("article .note").each(function(i, el) {
    var
    $el = $(el),
    $parent = $(this).parents("article"),
    $footer = $parent.find("footer"),
    articlePaddingBottom = parseInt($parent.css("paddingBottom").replace("px", "")),
    paddingTop = parseInt($el.css("paddingTop").replace("px", "")),
    paddingBottom = parseInt($el.css("paddingBottom").replace("px", ""));

    var height = $parent.height() - $footer.height() - paddingTop - paddingBottom;

    if ($el.height() < height) {
      $el.css({height: height});
    }

    var $button = $('<li class="more"><a href="#" class="edit">More</a></li>');

    $footer.find("ul").append($button);

    //   else {
    //     height = $el.height() + paddingTop + paddingBottom + articlePaddingBottom;
    //     $parent.data("height", height);
    //     $footer.data("paddingBottom", articlePaddingBottom);
    //   }

  });

  $("#about a.close").on("click", function(e) {
    e.preventDefault();
    e.stopPropagation();

    $("div.about").slideToggle(50);
    $(this).toggleClass("open");
  });

  $("a.about").on("click", function(e) {

    e.preventDefault();
    e.stopPropagation();

    if ($(this).hasClass("open")) {
      $(".main").animate({
        marginTop: 0
      },
      250, function() {
        $("div.about").slideToggle(50);
        $(this).toggleClass("open");

      });
    } else {
      $(".main").animate({
        marginTop: "20px"
      },
      250, function() {
        $("div.about").slideToggle(50);
        $(this).toggleClass("open");
      });

    }

  });

});
