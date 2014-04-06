var crowdCurator = (function() {

    var hydrate = function($post,str) {
        var metaType = str.split(":")[0];
        if (!metaType || !metaType.length) {
            return;
        }
        if (metaType === "location") {
            var unencode = decodeURIComponent(str.split(":")[1]);
            var $item = $post.find(".item-location");
            $item.find("span").text(unencode).end().css("display","block");
        } else if (metaType === "expires") {
            var timestamp = moment(parseInt(str.split(":")[1],10));
            var isExpired = timestamp.isBefore(new moment());
            var fromNow = timestamp.fromNow();
            var msg;
            if (isExpired) {
                msg = "Expired " + fromNow;
                $post.addClass("expired");
            } else {
                msg = "Expires " + fromNow;
            }
            var $item = $post.find(".item-time-remaining");
            $item.find("span").text(msg).end().css("display","block");
        } else if (metaType === "externalUrl") {
            var unencode = decodeURIComponent(str.split(":")[1]);
            var $item = $post.find(".item-external-url");
            $item.find("span").text(unencode).end()
                .attr("href",unencode)
                .attr("target","_blank")
                .css("display","block");
        }
    };

    var parsePosts = function() {
        $(".attribution-tags").each(function(i,obj) {
            // skip if already initialised
            if ($(obj).data("hasRun")) {
                return;
            }
            var $post = $(obj).siblings("figure");
            var tags = $(obj).find("a");
            $(tags).each(function(j,tag) {
                hydrate($post,tag.innerText);
            });
            $(obj).data("hasRun",true);
        });
    };

    // on pagination, parse new posts
    $.ajaxSetup({
        complete: function() {
            parsePosts();
        }
    });

    $(function() {
        parsePosts();
    });

}());