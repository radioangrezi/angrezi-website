window.onload = function(){

   var myAudio = document.getElementById('my-audio');
   var play = document.getElementById('play');
   var pause = document.getElementById('pause');
   var loading = document.getElementById('loading');
   var bar = document.getElementById('bar');

   function displayControls() {
      loading.style.display = "none";
      play.style.display = "block";
   }

   // check that the media is ready before displaying the controls
   if (myAudio.paused) {
      displayControls();
   } else {
      // not ready yet - wait for canplay event
      myAudio.addEventListener('canplay', function() {
         displayControls();
      });
   }
    
   play.addEventListener('click', function() {
      myAudio.play();
      play.style.display = "none";
      pause.style.display = "block";
   });
    
   pause.addEventListener('click', function() {
      myAudio.pause();
      pause.style.display = "none";
      play.style.display = "block";
   });
    
   // display progress
    
/*    
   myAudio.addEventListener('timeupdate', function() {
      //sets the percentage
      bar.style.width = parseInt(((myAudio.currentTime / myAudio.duration) * 100), 10) + "%";
   });
    
    var progress = document.getElementById('progress');

progress.addEventListener('click', function(e) {
      
  // calculate the normalized position clicked
  var clickPosition = (e.pageX  - this.offsetLeft) / this.offsetWidth;
  var clickTime = clickPosition * myAudio.duration;

  // move the playhead to the correct position
  myAudio.currentTime = clickTime;
});
    
    
*/
    

}