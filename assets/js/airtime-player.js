// copyright: Sourcefabric - AirTime
// embend player version 2019-01-31

// --

// modified version to slim down the code, dependecies and have a custom UI.

// This variable is used to record the current track's name for twitter share.
var song_name = "";

var RETRY_DELAY_MSECS = 2000; //Delay before trying to reconnect to stream after an error.
var MAX_MOBILE_SCREEN_WIDTH = 760;

// We are creating a custom player object that acts as a wrapper
// around the player object we get from Muses. We are doing this
// for a couple reasons:
//
// 1. It will be easier to swap out Muses for a different player engine
//    in the future - if we ever decide to do that.
// 2. We had to add in some custom behaviour depending on the player
//    customizations and whether or not the player is in Flash or HTML5
//    mode.

var MusesPlayer = function() {
    this.mobileDetect = this.mobileDetect();
    this.playerMode = "auto";
    this.flashDetect = false;
    //this.flashDetect = FlashDetect.versionAtLeast(10, 1) ? true : false;
    this.settings = {
        'volume': 100,
        'jsevents': true,
        'autoplay': false,
        'buffering': 0,
        'title': 'Radio Angrezi',
        'reconnectTime' : 2000, //Doesn't seem to do anything
        'width': 180,
        'height': 60
    };

    if (this.playerMode == "manual") {
        this.settings.url = "";
        this.settings.codec = "";
    } else if (this.playerMode == "file") {
        this.settings.url = "";
        this.settings.codec = "";
    } else if (this.playerMode == "auto") {
        this.availableMobileStreamQueue = [];
        this.availableDesktopStreamQueue = [
        {
            "url":"http:\/\/angrezistudio.hfk-bremen.de:8000\/live",
            "codec":"mp3",
            "bitrate":192,
            "mobile":"0"
        },{
            "url":"http:\/\/angrezistudio.hfk-bremen.de:8000\/live-low",
            "codec":"mp3",
            "bitrate":64,
            "mobile":"1"
        }];
        var stream = this.getNextAvailableStream();
        this.settings.url = stream["url"];
        this.settings.codec = stream["codec"];
    }

    // Create the Muses player object
    if (this.flashDetect) {
        MRP.flashInsert(this.settings);
    } else {
        MRP.jsInsert(this.settings);
    }

    // Configure player title
    var player_title = 'Now Playing';
    if (player_title === null) {
        //$(".airtime_header").hide();
        $(".airtime_header").find(".station_name").hide();
        $(".airtime_player").css('height', '150px');
    } else {
        $(".station_name").html(player_title);
        $(".station_name").attr("title", player_title);
    }

    attachStreamMetadataToPlayer();

    // detects events in HTML5 mode
    if (!this.flashDetect) {

        var updatePlayerUI = function(e){
            console.log("Event fired -> updatePlayerUI")
            console.log(e)
            console.log(MRP.html.audio.paused)

            switch (e.type) {
                case "play":
                    $(".play_button").addClass("playing");
                    $(".play_button").removeClass("paused");
                    $(".play_button").html("PAUSE STREAM");
                    break;
                case "pause":
                case "ended":
                case "abort":
                    $(".play_button").addClass("paused");
                    $(".play_button").removeClass("playing");
                    $(".play_button").html("START STREAM");
                    break;
                case "error":
                    $(".play_button").removeClass("playing");
                    $(".play_button").html("Error");
                    break;
            }
        }

        MRP.html.audio.addEventListener('play', updatePlayerUI)
        MRP.html.audio.addEventListener('pause', updatePlayerUI)
        MRP.html.audio.addEventListener('ended', updatePlayerUI)
        MRP.html.audio.addEventListener('error', updatePlayerUI)
        MRP.html.audio.addEventListener('abort', updatePlayerUI)

        MRP.html.audio.addEventListener('error', function failed(e) {
            var streamUrl = "";
            if (musesPlayer.playerMode == "auto") {
                var nextAvailableStream = musesPlayer.getNextAvailableStream();
                streamUrl = nextAvailableStream["url"];
            } else {
                streamUrl = musesPlayer.settings.url;
            }

            var title_elem = $(".now_playing .track_title");

            title_elem.text("Error - Retrying");

            switch (e.target.error.code) {
                case e.target.error.MEDIA_ERR_NETWORK:
                    // If there is a network error keep retrying to connect
                    // to a stream.
                    musesPlayer.deferredPlay(streamUrl, RETRY_DELAY_MSECS);
                    break;
                case e.target.error.MEDIA_ERR_DECODE:
                    // If there was a corruption error or a problem with the browser
                    // display an error and stop playback.
                    //togglePlayStopButton();
                    clearTimeout(metadataTimer);
                    //$("p.now_playing").html("Error - Try again later");
                    title_elem.text("Error - Try again later");
                    title_elem.attr("title", "Error - Try again later");
                    break;
                case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    // If in manual mode and the current stream format is not supported
                    // or the max number of listeners has been reached
                    // display an error and stop play back.
                    //togglePlayStopButton();
                    clearTimeout(metadataTimer);
                    //$("p.now_playing").html("Error - Try again later");
                    title_elem.text("Error - Try again later");
                    title_elem.attr("title", "Error - Try again later");
                    break;
                default:
                    //togglePlayStopButton();
                    clearTimeout(metadataTimer);
                    //$("p.now_playing").html("Error - Try again later");
                    title_elem.text("Error - Try again later");
                    title_elem.attr("title", "Error - Try again later");
                    break;
            }

        }, true);
    }
};

MusesPlayer.prototype.mobileDetect = function() {
    return (screen.width <= MAX_MOBILE_SCREEN_WIDTH);
}

// This function is called if an error occurs while a client is
// attempting to connect to a stream (An error would occur if
// the streams listener count has been maxed out or if the stream is down).
// It checks if the client is a mobile device or not and returns the next
// best available stream.
MusesPlayer.prototype.getNextAvailableStream = function() {
    if (this.mobileDetect && this.availableMobileStreamQueue.length > 0) {
        return this.getNextAvailableMobileStream();
    }

    if (!this.mobileDetect && this.availableDesktopStreamQueue.length > 0) {
        return this.getNextAvailableDesktopStream();
    }

    // If we get to this point there are no available streams for the
    // type of device the client has connected with so just return
    // the next available stream - first we'll try the desktop streams
    var desktopStream = this.getNextAvailableDesktopStream();
    if (desktopStream) {
        return desktopStream;
    } else {
        return this.getNextAvailableMobileStream();
    }

}

// Gets and returns the next available mobile stream from the queue,
// but adds it back to the end of the queue to be recycled.
MusesPlayer.prototype.getNextAvailableMobileStream = function() {
    var stream = this.availableMobileStreamQueue.shift();
    //add to end of queue
    this.availableMobileStreamQueue.push(stream);
    return stream;
}

// Gets and returns the next available desktop stream from the queue,
// but adds it back to the end of the queue to be recycled.
MusesPlayer.prototype.getNextAvailableDesktopStream = function() {
    var stream = this.availableDesktopStreamQueue.shift();
    //add to end of queue
    this.availableDesktopStreamQueue.push(stream);
    return stream;
}

MusesPlayer.prototype.play = function() {
    this.flashDetect ? MRP.play() : musesHTMLPlayClick();;
    togglePlayStopButton();
};

MusesPlayer.prototype.stop = function() {
    this.flashDetect ? MRP.stop() : musesHTMLStopClick();
    togglePlayStopButton();
};

MusesPlayer.prototype.toggle = function() {
    this.flashDetect ? MRP.stop() : musesHTMLToggleClick();
    //togglePlayStopButton();
};

MusesPlayer.prototype.setURL = function(url) {
    this.flashDetect ? MRP.setUrl(url) : musesHTMLSetURL(url);

    // update musesPlayer object
    musesPlayer.settings.url = url;
};

MusesPlayer.prototype.setCodec = function(codec) {
    //TODO: get rid of this? Doesn't seem to make a difference
    this.flashDetect ? console.log("blah") : musesHTMLSetCodec(codec);
    musesPlayer.settings.codec = codec;
}

/** Retry playback after a few seconds (used to throttle attempts to reconnect/play). */
MusesPlayer.prototype.deferredPlay = function(streamUrl, delayMSec) {
    if (!this.flashDetect) {
        setTimeout(function() {
            var audio = $(MRP.html.audio);
            audio[0].src = streamUrl;
            audio[0].load();
            audio[0].play();
        }, delayMSec);

    }
};
MusesPlayer.prototype.setVolume = function (newVolume) {
    //this.flashDetect ? MRP.setVolume(newVolume): musesHTMLSetVolume(newVolume);
    if (this.flashDetect){
        MRP.setVolume(newVolume);
    }else{
        musesHTMLSetVolume(newVolume);
    }
    musesPlayer.settings.volume = newVolume;
};

// detects errors in FLASH mode
function musesCallback(event,value) {
    switch (event) {
        case "ioError":
            // problem connecting to stream
            var streamUrl = "";
            if (musesPlayer.playerMode == "auto") {
                streamUrl = musesPlayer.getNextAvailableStream()["url"];
            } else {
                streamUrl = musesPlayer.settings.url;
            }

            //Retry playback but only after sleeping for a bit, to avoid spinning.
            musesPlayer.deferredPlay(streamUrl, RETRY_DELAY_MSECS);
            break;
        case "securityError":
            // max listeners reached
            if (musesPlayer.playerMode == "auto") {
                var stream = musesPlayer.getNextAvailableStream();
                musesPlayer.deferredPlay(stream["url"], RETRY_DELAY_MSECS);
            } else if (musesPlayer.playerMode == "file") {
            } else {
                // If in manual mode and there is a problem connecting to
                // the stream display an error and stop play back.
                MRP.stop();
                if ($("#play_button").hasClass("hide_button")) {
                    //togglePlayStopButton();
                }
                clearTimeout(metadataTimer);
                //$("p.now_playing").html("Error - Try again later");
                $(".now_playing .track_title").text("Error - Try again later");
                $(".now_playing .track_title").attr("title", "Error - Try again later");
            }
            break;
    }
}

// Triggers the play function on the Muses player object in HTML5 mode
function musesHTMLPlayClick() {
    MRP.html.audio.src = musesPlayer.settings.url;
    MRP.html.audio.play();
}

// Triggers the stop function on the Muses player object in HTML5 mode
// NOTE: The HTML5 audio element doesn't have stop functionality. It
// can only be paused.
function musesHTMLStopClick() {
    MRP.html.audio.pause();
    //delete MRP.html;
}

function musesHTMLToggleClick() {
    MRP.html.audio.paused ? musesHTMLPlayClick() : musesHTMLStopClick();
}

function musesHTMLSetURL(url)
{
    MRP.html.audio.src = url;

    //MRP.html.audio.play();
    //musesPlayer.play();
}

function musesHTMLSetCodec(codec) {
    MRP.html.audio.codec = codec;
}

function musesHTMLSetVolume(newVolume){
    MRP.html.audio.volume = newVolume/100;
}
$(document).ready(function() {
    $(".play").click(function () {
        if ($(this).hasClass("pause")) {
            musesPlayer.stop();
        } else {
            musesPlayer.play();
        }

        $(this).toggleClass("pause");
    });

});

// attach marquee to <title>
var title_default = document.title;
var title_marquee = document.title;
var title_marquee_interval = null;
var title_marquee_step = function() {
  title_marquee = title_marquee.substr(1) + title_marquee.substr(0,1);
  document.title = title_marquee.substr(0,15);
}
var title_marquee_start = function() {
    if (!title_marquee_interval) title_marquee_interval = setInterval (title_marquee_step, 100);
}
var title_marquee_stop = function(text = title_default){
    clearInterval(title_marquee_interval)
    title_marquee_interval = undefined;
    document.title = text
}



// variables for updating the player's metadata
var time_to_next_track_starts = 0;
var metadataTimer = null;

// Fetches the streams metadata from the Airtime live-info API
// and attaches it to the player UI.
//
// The metadata is fetched when the current track is about to end.
function attachStreamMetadataToPlayer(){
    $.ajax({url: "http://stream.radioangrezi.de/api/live-info",
        data: {type:"interval",limit:"5"},
        dataType: "jsonp",
        success: function(data) {
            var marquee_elm = $("p.now_playing");
            var title_elm = $(".now_playing .track_title");
            var artist_elm = $(".now_playing .artist");
            var show_elm = $(".now_playing .show_title");
            var description_elm = $(".now_playing .show_description");
            var marquee_elm = $(".now_playing .marquee");
            var str_off_air = "Off Air";
            var str_offline = "Offline or maybe not";
            var html_offline = "Offline or maybe not – <a href=\"https://t.me/radioangrezi\">Notification when on air?</a>";
            var marquee_str = ""

            // Angrezi: Filter out shows containing "test" or "untitled show"
            var filterout_expr = /untitled show|test/i;
            if(data.current && data.currentShow[0]){
                episodeName = data.currentShow[0].name;
                if (filterout_expr.test(episodeName)) {
                    data.current = null;
                }
            }

            if (data.current === null) {
                //title_elm.attr("title", $.i18n._("Off Air"));
                //artist_elm.attr("title", $.i18n._("Offline"));
                //Refresh in 20 seconds
                // title_elm.text(str_off_air);
                // artist_elm.text(str_offline);
                // title_elm.attr("title", str_off_air);
                // artist_elm.attr("title", str_offline);
                marquee_html = html_offline;
                marquee_str = str_offline;
                title_marquee_stop();
                time_to_next_track_starts = 20000;
            } else {

                // var artist = "";
                // var track = "";
                //var nowPlayingHtml = "";

                show = data.currentShow[0].name;
                description = data.currentShow[0].description;

                if (show) {
                    marquee_str = marquee_html = "On Air Now: " + show
                }else{
                    marquee_str = marquee_html = "Live from the Angrezi Studio at Speicher XI"
                }
                title_marquee_start();

                var current_time = new Date();

                var current_track_end_time = new Date(data.current.ends);

                if (current_track_end_time == "Invalid Date" || isNaN(current_track_end_time)) {
                    // If the conversion didn't work (since the String is not in ISO format)
                    // then change it to be ISO-compliant. This is somewhat hacky and may break
                    // if the date string format in live-info changes!
                    current_track_end_time = new Date((data.current.ends).replace(" ", "T"));
                }

                //convert current_time to UTC to match the timezone of time_to_next_track_starts
                current_time = new Date(current_time.getTime() + current_time.getTimezoneOffset() * 60 * 1000);
                time_to_next_track_starts = current_track_end_time - current_time;

                //Auto-update the metadata every few seconds for live streams since we can't predict when it'll change.
                if (data.current.type == 'livestream') {
                    time_to_next_track_starts = 10000;
                }
                // Add 3 seconds to the timeout so Airtime has time to update the metadata before we fetch it
                metadataTimer = setTimeout(attachStreamMetadataToPlayer, time_to_next_track_starts+3000);
            }

            $("p.now_playing").html(marquee_html);
            $("p.now_playing").attr("title", marquee_elm.text());

            if(title_marquee) {
                title_marquee = marquee_str.toUpperCase() + " +++ ";
            }

            // if (data.next === null) {
            //     $("ul.schedule_list").find("li").html($.i18n._("Nothing scheduled"));
            // } else {
            //     $("ul.schedule_list").find("li").html(data.next.name);
            //     $("ul.schedule_list").find("li").attr("title", function () {return $(this).text();});
            // }
        }
    });

    //Preventative code if the local and remote clocks are out of sync.
    if (isNaN(time_to_next_track_starts) || time_to_next_track_starts < 0) {
        time_to_next_track_starts = 0;
    }

}
