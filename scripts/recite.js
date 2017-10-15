var recital = new Audio;

$(document).ready(function(){

    /* Play recital on double click
     * Recitation API is from http://docs.globalquran.com
     */
    $('a').on('dblclick', function() {
	var verse_num = this.id.split('-')[1];
	if (verse_num) {
	    if (!recital.paused) recital.pause(); // Pause current playing recital if any
	    recital = new Audio('http://audio.globalquran.com/ar.abdulbasitmurattal/mp3/64kbs/' + verse_num + '.mp3');
	    recital.currentTime = 0.5; // Cut initial delay
	    recital.play();
	}
    });

});
