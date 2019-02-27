// Date functions
function convertTime(timestamp) {
  var d = new Date(timestamp * 1000),hh = d.getHours(),h = hh,min = ('0' + d.getMinutes()).slice(-2),time;
  time = h+':'+min;
  return time;
}
function convertDate(timestamp) {
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],months = ['January','February','March','April','May','June','July','August','September','October','November','December'],d = new Date(timestamp * 1000),yyyy = d.getFullYear(),month = d.getMonth(),month = months[month],day = d.getDay(),day = days[day],dd = ('0' + d.getDate()).slice(-2),dateFormatted;
  dateFormatted = day+', '+dd+' '+month;
  return dateFormatted;
}

 var timeNow = Date.now()/1000;// - 86400;

$(document).ready(function() {
$.ajaxSetup({
  timeout: 5000,
});
$.getJSON("http://stream.radioangrezi.de/api/week-info?callback=?",function(calendarProgram){
      var episode = "", episodeDay=false;
      var episodeCounter = 0;
      for(var x in calendarProgram) {
        for (var y in calendarProgram[x]) {
          var z = calendarProgram[x][y],
              episodeName = z['instance_description'] || z['name'],
              episodeDescription = z['description']
              episodeDate = z['starts'],
              episodeDateEnd = z['ends'];

          // Angrezi: Filter out shows containing "test" or "untitled show"
          var filterout_expr = /untitled show|test/i;

          if (filterout_expr.test(episodeName)) {
            continue;
          }

          if (typeof episodeName !== 'undefined' && typeof episodeDate !== 'undefined') {

            // start time
            episodeDate = episodeDate.replace(/\W+/g, ',').split(',');
            episodeDate = new Date(episodeDate[0], episodeDate[1]-1, episodeDate[2], episodeDate[3], episodeDate[4], episodeDate[5]);

            // end time
            episodeDateEnd = episodeDateEnd.replace(/\W+/g, ',').split(',');
            episodeDateEnd = new Date(episodeDateEnd[0], episodeDateEnd[1]-1, episodeDateEnd[2], episodeDateEnd[3], episodeDateEnd[4], episodeDateEnd[5]);

            var episodeDateUnix = episodeDate.getTime() / 1000,
                episodeDateISO = moment.unix(episodeDateUnix).toISOString(),
                episodeTime = convertTime(episodeDateUnix),
                // episodeTime = episodeTime.replace(':00', '00'),

                episodeDateEndUnix = episodeDateEnd.getTime() / 1000,
                episodeDateEndISO = moment.unix(episodeDateEndUnix).toISOString(),
                episodeTimeEnd = convertTime(episodeDateEndUnix),
                // episodeTimeEnd = episodeTimeEnd.replace(':00', '00'),
                currentEpisode = '';

            if (typeof episodeName !== 'undefined' && timeNow < episodeDateEndUnix) {

              if (timeNow < episodeDateEndUnix && timeNow >= episodeDateUnix) {
                currentEpisode = ' current';
              }

              if (episodeDay !== convertDate(episodeDateUnix)) {
                episodeDay = convertDate(episodeDateUnix);

              $('.show-section').append("<article class='show-item-date'><h1 class='date'>"+episodeDay+"</h1></article>");

              }
              //episode = episode+"<div class='row calendar__show"+currentEpisode+"' itemprop='episode' itemscope itemtype='https://schema.org/RadioEpisode'><div class='xs-2' itemprop='publication' itemscope itemtype='https://schema.org/BroadcastEvent'><meta itemprop='startDate' content='"+episodeDateISO+"'><meta itemprop='endDate' content='"+episodeDateEndISO+"'>"+episodeTime+"</div><div class='xs-10' itemprop='name'>"+episodeName+"</div><div class='xs-10' itemprop='description'>"+episodeDescription+"</div></div><br/>";

              episodeCounter++;
              episode = "<article class='show-item' itemprop='episode' itemscope itemtype='https://schema.org/RadioEpisode'><p class='show-date'></p>" +
              "<p class='show-date'>"+episodeDay+"</p>" +
              "<div class='headlines'>" +
              "<h1 class='show-time' itemprop='publication' itemscope itemtype='https://schema.org/BroadcastEvent'><meta itemprop='startDate' content='"+episodeDateISO+"'><meta itemprop='endDate' content='"+episodeDateEndISO+"'>"+episodeTime+"</h1>" +
              "<h1 class='show-title' itemprop='name'>"+episodeName+"</h1>" +
              "</div>"+
              "<p itemprop='description'>"+episodeDescription+"</p>"+ 
              "</article>"
              $('.show-section').append(episode);
            }
          }
        }
      }
      if(episodeCounter < 1){
        episode = "<article class='show-item'>" +
            "<div class='headlines'>" +
            "<img class='pixel' src='Images/MrPixel-moon.svg'>" +
            "<h1 class='show-time'>CIAO!</h1>" +
            "<h1 class='show-title'>Hear you next week.</h1>" +
            "</div>" +
            "</article>"
        $('.show-section').append(episode);
      }
      //$('.calendar__data').append('<div class="row"><div class="xs-10 xs-offset-2"><h2>Live Schedule</h2></div></div>');
      //$('.show-section').append(episode);
    }).fail(function(){
      // failed to load
      fail = "<article class='show-item'>" +
            "<div class='headlines'>" +
            "<img class='pixel' src='Images/MrPixel-tear.svg'>" +
            "<h1 class='show-time'>UUPZZ</h1>" +
            "<h1 class='show-title'>There seems to be a temporary issue connecting to the studio. Damn!</h1>" +
            "</div>" +
            "</article>"
      $('.show-section').append(fail);
    });
});