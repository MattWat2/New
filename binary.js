function pad(str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

function shadeColor(color, percent) {
  var f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff;
  return (
    "#" +
    (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)
  );
}

function binaryList(digit) {
  var remaining = digit;
  var positions = [0, 0, 0, 0];
  while (remaining > 0) {
    if (remaining >= 8) {
      positions[0] = 1;
      remaining -= 8;
    } else if (remaining >= 4) {
      positions[1] = 1;
      remaining -= 4;
    } else if (remaining >= 2) {
      positions[2] = 1;
      remaining -= 2;
    } else if (remaining >= 1) {
      positions[3] = 1;
      remaining -= 1;
    }
  }
  return positions;
}

function refreshGui(positionLists, timeList, num_rows, num_cols) {
  for (i = 0; i < num_cols; i++) {
    for (j = 0; j < num_rows; j++) {
      var itemBox = $(".column" + i.toString())[j];
      if (positionLists[i][j] == 1) {
        itemBox.style["opacity"] = 1;
        if (itemBox.children.length > 0) {
          itemBox.children[0].style["box-shadow"] =
            "0px 0px 3px 1px rgba(0,0,0,0.3)";
        }
      } else {
        itemBox.style["opacity"] = 0.1;
        if (itemBox.children.length > 0) {
          itemBox.children[0].style["box-shadow"] = "inset 1px 1px 3px #000";
        }
      }
    }
    if (LAST_ROW == "digits") {
      $("#tooltip :nth-child(" + (i + 1).toString() + ")").html(timeList[i]);
    }
  }
}

var lights = {};
lights["white"] = "rgb(252,252,252)";
lights["grey"] = "rgb(220,220,220)";
lights["green"] = "rgb(215,220,210)";
lights["blue"] = "rgb(221, 229, 255)";
lights["pink"] = "rgb(245, 221, 221)";
lights["orange"] = "rgb(246, 115, 0)";

var darks = {};
darks["black"] = "rgb(15,15,15)";
darks["grey"] = "rgb(40,40,40)";
darks["green"] = "rgb(40,45,35)";
darks["blue"] = "rgb(49, 52, 78)";
darks["red"] = "rgb(123, 13, 13)";

function foreground(theRgb) {
  //DARKER AREAS BY DEFAULT
  $(".circle").css("background-color", theRgb);
  $("#tooltip td, .vert-tip").css("color", theRgb);
  $("#settings").css("background-color", theRgb);
  $("#settings-show-button").css("color", theRgb);
  $(".update").css("color", theRgb);
  $(".settings-group").css("color", theRgb);
  $("#bbar").css("background-color", theRgb);
  $("#bmenu").css("background-color", theRgb);
}

function background(theRgb, op) {
  //LIGHTER AREAS BY DEFAULT
  $("body").css("background-color", theRgb);
  $("#settings").css("color", theRgb);
  $(".settings-group").css("background-color", theRgb);
  $("#bbar").css("color", theRgb);
  $("#bmenu").css("color", theRgb);
}

function size(num) {
  if (num == "1") {
    border_spacing = 0.2;
    gap_padding = 8;
    circle_diameter = 12;
    circle_margin = 6;
    tooltip_padding_top = 5;
    verttip_padding_top = 5;
    font_size = 10;
  } else if (num == "2") {
    border_spacing = 0.3;
    gap_padding = 15;
    circle_diameter = 20;
    circle_margin = 9;
    tooltip_padding_top = 5;
    verttip_padding_top = 5;
    font_size = 12;
  } else if (num == "4") {
    border_spacing = 0.3;
    gap_padding = 25;
    circle_diameter = 40;
    circle_margin = 18;
    tooltip_padding_top = 5;
    verttip_padding_top = 5;
    font_size = 16;
  } else {
    border_spacing = 0.3;
    gap_padding = 25;
    circle_diameter = 30;
    circle_margin = 13;
    tooltip_padding_top = 5;
    verttip_padding_top = 5;
    font_size = 12;
  }

  $("table").css("border-spacing", toPx(border_spacing));
  $("tr td:nth-child(2), tr td:nth-child(4)").css(
    "padding-right",
    toPx(gap_padding)
  );
  $(".circle").css("width", toPx(circle_diameter));
  $(".circle").css("height", toPx(circle_diameter));
  $(".circle").css("border-radius", toPx(circle_diameter / 2));
  $(".circle").css("margin", toPx(circle_margin));
  $("#circles").css(
    "margin-top",
    toPx(-2 * circle_diameter - 4 * circle_margin)
  );
  $("#circles").css(
    "margin-left",
    toPx(-3 * (circle_diameter + 2 * circle_margin) - gap_padding)
  );
  $("#tooltip td").css("padding-top", toPx(tooltip_padding_top));
  $(".vert-tip").css("padding-top", toPx(verttip_padding_top));
  $("#tooltip td, .vert-tip").css("font-size", toPx(font_size));
}

function toPx(pxint) {
  return pxint.toString() + "px";
}

function tranbez(property) {
  return property + " 300ms cubic-bezier(0.460, 0.095, 0.285, 1.300)";
}

function locateMe(position) {
  $("#geolocate").html('<i class="fa fa-check"></i>');
  $("#geolocate").attr("title", "Now using current location");
  $("input#lat").val(position.coords.latitude);
  $("input#long").val(position.coords.longitude);
  $("form#suntools").submit();
}

function locateError(error) {
  $("#geolocate").html('<i class="fa fa-exclamation"></i>');
  $("#geolocate").attr("title", "An error occurred");
}

function updateClock() {
  var rows = 4;
  var columns = 6;

  var timenow = new Date();
  var hours = timenow.getHours();
  var minutes = timenow.getMinutes();
  var seconds = timenow.getSeconds();

  var combinedTime = [
    pad(hours.toString(), 2),
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2),
  ]
    .join("")
    .split("");

  var binaryLists = [];
  for (n = 0; n < combinedTime.length; n++) {
    binaryLists.push(binaryList(parseInt(combinedTime[n])));
  }

  refreshGui(binaryLists, combinedTime, rows, columns);

  checkSun();

  var hex_col = "#" + combinedTime.join("");
  if (HEX == "1") {
    INVERT == "1" ? background(hex_col) : foreground(hex_col);
  }

  if (HEX_LIGHT == "1") {
    var brightHex = shadeColor(hex_col, 0.8);
    INVERT == "1" ? foreground(brightHex) : background(brightHex);
  }
}

function updateSettings(sender) {
  var settingKey = sender.attr("name");
  var settingTag = sender.prop("tagName").toLowerCase();
  if (settingTag == "select") {
    var value = sender.find(":selected").attr("value");
    if (settingKey == "last-row") {
      chrome.storage.local.set({ lastrow: value });
      LAST_ROW = value;
    } else if (settingKey == "light") {
      chrome.storage.local.set({ light: value });
      LIGHT = value;
    } else if (settingKey == "dark") {
      chrome.storage.local.set({ dark: value });
      DARK = value;
    } else if (settingKey == "size") {
      chrome.storage.local.set({ size: value });
      SIZE = value;
    } else if (settingKey == "bookmarks") {
      chrome.storage.local.set({ bookmarks: value });
      BOOKMARKS = value;
    }
  } else if (settingTag == "input" && sender.attr("type") == "checkbox") {
    if (sender.prop("checked")) {
      var ischecked = "1";
    } else {
      var ischecked = "0";
    }

    if (settingKey == "show-vert-tip") {
      chrome.storage.local.set({ showverttips: ischecked });
      SHOW_VERT_TIPS = ischecked;
    }

    if (settingKey == "invert") {
      chrome.storage.local.set({ invert: ischecked });
      INVERT = ischecked;
    }

    if (settingKey == "hex") {
      chrome.storage.local.set({ hex: ischecked });
      HEX = ischecked;
      $('select[name="dark"]').prop("disabled", HEX == "1" ? true : false);
    }

    if (settingKey == "hex-light") {
      chrome.storage.local.set({ "hex-light": ischecked });
      HEX_LIGHT = ischecked;
      $('select[name="light"]').prop(
        "disabled",
        HEX_LIGHT == "1" ? true : false
      );
    }

    if (settingKey == "auto-invert") {
      chrome.storage.local.set({ "auto-invert": ischecked });
      AUTO_INVERT = ischecked;
      $('input[name="invert"]').prop(
        "disabled",
        AUTO_INVERT == "1" ? true : false
      );
      $("#suntools-wrap").css("opacity", AUTO_INVERT == "1" ? 1 : 0);
      checkSun();
    }
  } else if (settingTag == "input" && sender.attr("type") == "text") {
    var value = sender.val();
    if (settingKey == "lat") {
      chrome.storage.local.set({ lat: value });
      LAT = parseFloat(value);
    }
    if (settingKey == "long") {
      chrome.storage.local.set({ long: value });
      LONG = parseFloat(value);
    }
  }
  applySettings();
}

function applySettings() {
  if (LAST_ROW == "nothing") {
    $("tr#tooltip").css("opacity", 0);
  } else {
    $("tr#tooltip").css("opacity", 1);
  }

  if (LAST_ROW == "letters") {
    $("tr#tooltip").html(
      "<td>H</td><td>H</td><td>M</td><td>M</td><td>S</td><td>S</td>"
    );
  }

  $(".vert-tip").css("opacity", parseInt(SHOW_VERT_TIPS));

  var sunTimes = SunCalc.getTimes(new Date(), LAT, LONG);
  SUNRISE = sunTimes.sunrise;
  SUNSET = sunTimes.sunset;
  rise_str = SUNRISE.getHours() + ":" + pad(SUNRISE.getMinutes(), 2);
  set_str = SUNSET.getHours() + ":" + pad(SUNSET.getMinutes(), 2);
  $("#suntools .status").html(
    "<b>Active: </b> Sunrise at " + rise_str + ", sunset at " + set_str
  );
  checkSun();

  fg = INVERT == "1" ? lights[LIGHT] : darks[DARK];
  bg = INVERT == "1" ? darks[DARK] : lights[LIGHT];
  foreground(fg);
  background(bg);

  size(SIZE);

  $("#bbar").css("display", "block");
  if (BOOKMARKS == "2") {
    $("#bbar").css("opacity", 1);
  } else if (BOOKMARKS == "1") {
    $("#bbar").css("opacity", 0);
  } else {
    $("#bbar").css("display", "none");
  }

  console.log("Settings applied");

  updateClock();
}

function isDay() {
  var timenow = new Date();
  return timenow > SUNRISE && timenow < SUNSET;
}

function checkSun(force) {
  if (AUTO_INVERT == "1") {
    INVERT = isDay() ? "0" : "1";
    $('input[name="invert"]').prop("checked", INVERT == "1" ? true : false);
    if (isDay() != WASDAY || force) {
      WASDAY = isDay();
      INVERT = INVERT == "1" ? "0" : "1";
      updateSettings($('input[name="invert"]'));
      //chrome.storage.local.set({"invert":INVERT});
    }
  }
}

//GLOBAL VARIABLES OVERWRITTEN BY SETTINGS VALUES (DEFAULTS SHOWN)
var LAST_ROW = "digits"; //'letters','digits' or 'nothing'
var THEME = "default";
var USE_HEX = "0";
var SHOW_VERT_TIPS = "1";
var INVERT = "0";
var LIGHT = "green";
var DARK = "green";
var SIZE = "3";
var HEX = "0";
var HEX_LIGHT = "0";
var VERSION = 1.9;
var AUTO_INVERT = "0";
var LAT = -41.29;
var LONG = 174.74;
var BOOKMARKS = "2";

//ASSIGNED AT INITIALISATION
var sunTimes = SunCalc.getTimes(new Date(), LAT, LONG);
var SUNRISE = sunTimes.sunrise;
var SUNSET = sunTimes.sunset;
var WASDAY = isDay();

var SUNTIMER = false;

function initialiseSettings() {
  chrome.storage.local.get("dark", function (obj) {
    the_dark = obj["dark"];
    if (typeof the_dark === "undefined") {
      chrome.storage.local.set({ dark: DARK });
    } else {
      DARK = the_dark;
    }
    $('select[name="dark"]').val(DARK);
  });

  chrome.storage.local.get("light", function (obj) {
    the_light = obj["light"];
    if (typeof the_light === "undefined") {
      chrome.storage.local.set({ light: LIGHT });
    } else {
      LIGHT = the_light;
    }
    $('select[name="light"]').val(LIGHT);
  });

  chrome.storage.local.get("size", function (obj) {
    the_size = obj["size"];
    if (typeof the_size === "undefined") {
      chrome.storage.local.set({ size: SIZE });
    } else {
      SIZE = the_size;
    }
    $('select[name="size"]').val(SIZE);
  });

  chrome.storage.local.get("lastrow", function (obj) {
    the_last_row = obj["lastrow"];
    if (typeof the_last_row === "undefined") {
      chrome.storage.local.set({ lastrow: LAST_ROW });
    } else {
      LAST_ROW = the_last_row;
    }
    $('select[name="last-row"]').val(LAST_ROW);
  });

  chrome.storage.local.get("showverttips", function (obj) {
    the_show_vert_tips = obj["showverttips"];
    if (typeof the_show_vert_tips === "undefined") {
      chrome.storage.local.set({ showverttips: SHOW_VERT_TIPS });
    } else {
      SHOW_VERT_TIPS = the_show_vert_tips;
    }
    $('input[name="show-vert-tip"]').prop(
      "checked",
      SHOW_VERT_TIPS == "1" ? true : false
    );
  });

  chrome.storage.local.get("invert", function (obj) {
    the_invert = obj["invert"];
    if (typeof the_invert === "undefined") {
      chrome.storage.local.set({ invert: INVERT });
    } else {
      INVERT = the_invert;
    }
    $('input[name="invert"]').prop("checked", INVERT == "1" ? true : false);
  });

  chrome.storage.local.get("hex", function (obj) {
    the_hex = obj["hex"];
    if (typeof the_hex === "undefined") {
      chrome.storage.local.set({ hex: HEX });
    } else {
      HEX = the_hex;
    }
    $('input[name="hex"]').prop("checked", HEX == "1" ? true : false);
    $('select[name="dark"]').prop("disabled", HEX == "1" ? true : false);
  });

  chrome.storage.local.get("hex-light", function (obj) {
    the_hex_light = obj["hex-light"];
    if (typeof the_hex_light === "undefined") {
      chrome.storage.local.set({ "hex-light": HEX_LIGHT });
    } else {
      HEX_LIGHT = the_hex_light;
    }
    $('input[name="hex-light"]').prop(
      "checked",
      HEX_LIGHT == "1" ? true : false
    );
    $('select[name="light"]').prop("disabled", HEX_LIGHT == "1" ? true : false);
    applySettings();
  });

  chrome.storage.local.get("lastrow", function (obj) {
    the_last_row = obj["lastrow"];
    if (typeof the_last_row === "undefined") {
      chrome.storage.local.set({ lastrow: LAST_ROW });
    } else {
      LAST_ROW = the_last_row;
    }
    $('select[name="last-row"]').val(LAST_ROW);
  });

  chrome.storage.local.get("version", function (obj) {
    the_version = obj["version"];
    if (typeof the_version === "undefined" || VERSION > the_version) {
      chrome.storage.local.set({ version: VERSION });
      $(".update").css("display", "inline-block");
    }
  });

  chrome.storage.local.get("lat", function (obj) {
    the_lat = obj["lat"];
    if (typeof the_lat === "undefined") {
      chrome.storage.local.set({ lat: LAT });
    } else {
      LAT = the_lat;
    }
    $('input[name="lat"]').val(LAT.toString());
  });

  chrome.storage.local.get("long", function (obj) {
    the_long = obj["long"];
    if (typeof the_long === "undefined") {
      chrome.storage.local.set({ long: LONG });
    } else {
      LONG = the_long;
    }
    $('input[name="long"]').val(LONG.toString());
  });

  chrome.storage.local.get("bookmarks", function (obj) {
    the_bookmarks = obj["bookmarks"];
    if (typeof the_bookmarks === "undefined") {
      chrome.storage.local.set({ bookmarks: BOOKMARKS });
    } else {
      BOOKMARKS = the_bookmarks;
    }
    $('select[name="bookmarks"]').val(BOOKMARKS);
  });

  chrome.storage.local.get("auto-invert", function (obj) {
    the_auto_invert = obj["auto-invert"];
    if (typeof the_auto_invert === "undefined") {
      chrome.storage.local.set({ "auto-invert": "1" });
    } else {
      AUTO_INVERT = the_auto_invert;
    }
    applySettings();

    checkSun();

    $('input[name="auto-invert"]').prop(
      "checked",
      AUTO_INVERT == "1" ? true : false
    );
    $('input[name="invert"]').prop(
      "disabled",
      AUTO_INVERT == "1" ? true : false
    );
    $("#suntools-wrap").css("opacity", AUTO_INVERT == "1" ? 1 : 0);
  });
}

/*function fetchBookmarks(query) {
	var bookmarkTreeNodes = chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
		for (i = 0; i < bookmarkTreeNodes.length; i++) {
			bookmarkNode = bookmarkTreeNodes[i];
			console.log(bookmarkNode.title?bookmarkNode.title:'No title');
		}
	});
}*/

function dumpBookmarks(query) {
  var bookmarkTreeNodes = chrome.bookmarks.getTree(function (
    bookmarkTreeNodes
  ) {
    console.log(dumpTreeNodes(bookmarkTreeNodes, query).toString());
  });
}
function dumpTreeNodes(bookmarkNodes, query) {
  var list = [];
  var i;
  for (i = 0; i < bookmarkNodes.length; i++) {
    list.append(bookmarkNodes[i].title, query);
  }
  return list;
}

$(document).ready(function () {
  initialiseSettings();
  updateClock();
  setInterval(updateClock, 1000);

  $('input:not([type="text"]),select').change(function () {
    updateSettings($(this));
  });
  $("span.version").html(VERSION.toString());

  $("form#suntools").submit(function (e) {
    e.preventDefault();

    var lat_float = parseFloat($("#lat").val());
    var long_float = parseFloat($("#long").val());

    lat_valid = lat_float != NaN && lat_float >= -85 && lat_float <= 85;
    long_valid = long_float != NaN && long_float >= -180 && long_float <= 180;

    $("#lat").val(lat_valid ? lat_float : LAT);
    $("#long").val(long_valid ? long_float : LONG);

    updateSettings($("#lat"));
    updateSettings($("#long"));

    return false;
  });

  if (navigator.geolocation) {
    $("#geolocate").css("display", "block");
  }

  $("#geolocate").click(function () {
    navigator.geolocation.getCurrentPosition(locateMe, locateError);
  });

  setTimeout(function () {
    $("body").css("transition", "background-color .3s ease-out");
    $("table").css("transition", tranbez("border_spacing"));
    $("tr td:nth-child(2), tr td:nth-child(4)").css(
      "transition",
      tranbez("padding-right")
    );
    $(".circle").css(
      "transition",
      tranbez("height") +
        "," +
        tranbez("width") +
        "," +
        tranbez("border-radius") +
        "," +
        tranbez("margin")
    );
    $("#circles").css(
      "transition",
      tranbez("margin-left") + "," + tranbez("margin-top")
    );
    $("#bbar").css(
      "transition",
      "opacity .3s ease-out .3s, background-color .3s ease-out 0s"
    );
  }, 300);

  chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
    traverseBookmarks(bookmarkTreeNodes);
  });

  chrome.bookmarks.onChanged.addListener(function () {
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
      traverseBookmarks(bookmarkTreeNodes);
    });
  });

  chrome.bookmarks.onCreated.addListener(function () {
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
      traverseBookmarks(bookmarkTreeNodes);
    });
  });

  chrome.bookmarks.onRemoved.addListener(function () {
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
      traverseBookmarks(bookmarkTreeNodes);
    });
  });

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    applySettings();
    for (key in changes) {
      var storageChange = changes[key];
      console.log(
        'Storage key "%s" in namespace "%s" changed. ' +
          'Old value was "%s", new value is "%s".',
        key,
        namespace,
        storageChange.oldValue,
        storageChange.newValue
      );
    }
  });
});

function traverseBookmarks(bookmarkTreeNodesRoot) {
  bookmarkTreeNodes = bookmarkTreeNodesRoot[0].children;
  for (var i = 0; i < bookmarkTreeNodes.length; i++) {
    if (
      bookmarkTreeNodes[i].title == "Bookmarks bar" &&
      bookmarkTreeNodes[i].children
    ) {
      generateBar(bookmarkTreeNodes[i].children);
      break;
    }
  }
}

function generateBar(barNodes) {
  $("#binner").children().remove();
  var added = 0;
  for (var i = 0; i < barNodes.length; i++) {
    if (!barNodes[i].children) {
      $("#binner").append(
        '<li><a href="' + barNodes[i].url + '">' + barNodes[i].title + "</a>"
      );
      added++;
    }
  }

  if (added == 0) {
    $("#bnull").css("display", "block");
  }
}

/*function resizeHandler() {
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
}*/
