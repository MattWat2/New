function traverseBookmarks(bookmarkTreeNodesRoot) {
	bookmarkTreeNodes = bookmarkTreeNodesRoot[0].children;
    for (var i=0;i<bookmarkTreeNodes.length;i++) {
    	if (bookmarkTreeNodes[i].title == 'Bookmarks bar' && bookmarkTreeNodes[i].children) {
    		generateBar(bookmarkTreeNodes[i].children);
    		break;
    	}
    }
}

function generateBar(barNodes) {
	var added = 0;
	for (var i=0;i<barNodes.length;i++) {
		if (!barNodes[i].children) {
			$('#binner').append('<li><a href="'+barNodes[i].url+'">'+barNodes[i].title+'</a>');
			added++;
		}
	}

	if (added == 0) {
		$('#bnull').css('display','block');
	}
}

function resizeHandler() {
	var window_width = $(window).width();

	if ($('#binner').outerWidth() > window_width) {
		$('#bbutton').css('display','block');

		while ($('#binner').outerWidth() > window_width) {
			var kids = $('#blist').children();
			$('#bmenu').prepend(kids[kids.length - 1]);
			$('#blist').children()[kids.length - 1].remove();
		}
	}
	else {
		$('#bbutton').css('display','none');
	}
}

$(document).ready(function () {
	chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
		console.log(bookmarkTreeNodes);
		traverseBookmarks(bookmarkTreeNodes);
	});
});