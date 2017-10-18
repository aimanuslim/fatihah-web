$(document).ready(function(){
    // Change width offset if mobile browsing
    if (window.isMobileBrowsing())
	$('.fatihah-offset').css('width', '95%');

    // Image mapster
    $('#fatihah').mapster({
	render_highlight: {
	    fillOpacity: 0.4,
	    fillColor: "7FBCEA",
	},	
	render_select: {
	    fillOpacity: 0.4,
	    fillColor: "419641",
	    stroke: true,
	    strokeColor: "7FBCEA",
	    strokeOpacity: 0.8,
	    strokeWidth: 4
	},	
	noHrefIsMask: false,
	singleSelect: true,
	mapKey: 'class',
	listKey: 'name',
    });
    
    // On ayat click event, display tafsir of the ayat
    $('area').on('click', function(e) {
	displayTafsir($(this).parent().attr('id').split('-')[1], e);
    });

    // On top bar ayat button click event, display tafsir of the ayat
    $('area, li > button').click(function(e){
	displayTafsir($(this).attr('class').split('-')[0].replace('ayat', ''), e);
    })
    
    var url = $(location).attr('href');
    var share_content = '<div class="container-fluid"><a href="http://www.facebook.com/sharer.php?u=' + url + '" target="_blank" class="share-icon"><img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" /></a><a href="https://twitter.com/share?url=' + url + ';text=Let\'s revisit our fatihah!;hashtags=revisiting-fatihah,fatihah,quran" target="_blank" class="share-icon"><img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" /></a><a href="https://plus.google.com/share?url=' + url + '" target="_blank" class="share-icon"><img src="https://simplesharebuttons.com/images/somacro/google.png" alt="Google" /></a><a href="http://www.linkedin.com/shareArticle?mini=true&amp;url=' + url + '" target="_blank" class="share-icon"><img src="https://simplesharebuttons.com/images/somacro/linkedin.png" alt="LinkedIn"/></a><a href="http://www.tumblr.com/share/link?url='+ url +'&amp;title=Revisiting Fatihah" target="_blank" class="share-icon"><img src="https://simplesharebuttons.com/images/somacro/tumblr.png" alt="Tumblr" /></a></div>'
    
    $('html').on('mouseup', function(e) {
    	if(!$(e.target).closest('.popover').length) {
            $('.popover').each(function(){
    		$(this.previousSibling).popover('hide');
            });
    	}
    });
    
    $('#feedback-submit').on('click', function(e){
        e.preventDefault();

        // information to be sent to the server
        var info = $('#feedback-message').val();
        var contact_addr = $('#contact-address').val();
        var title = $('#feedback-title').val();

        $.ajax({
            type: "POST",
            url: '/email.php',
            data: {
                message: info,
                contact: contact_addr,
                title: title
                
            },
            success: function(data, textStatus, jqXHR) {
                $('#success-alert').show(200).css('display', 'inline');
            } ,
            error: function(jqXHR, status, error) {
                console.log(status + ": " + error);
            }
        });
    })
    
    $(".modal").on("hidden.bs.modal", function(){
        $("textarea").val('');
        $("#success-alert").hide();
    });
    
    $('#share-button').popover({
        placement: 'bottom',
        trigger: 'click',
        html: 'true',
        content: share_content
    });

    $('.change-button').click(function(e) {
	e.preventDefault();
        var fontSize = parseInt($('.contents').css('font-size'));
        if ($(this).attr('id') == 'increase-size') {
            fontSize += 1;    
        } else {
            fontSize -= 1;
        }
        $('.contents').css({'font-size': fontSize});
    })

    $('#guide-modal').modal('show');	
    
    // $('area, li > button').click(function(e){
    // 	e.preventDefault();
	
    // 	var class_name = $(this).attr('class').split(' ')[0];
    // 	//        console.log(class_name);
        
    // 	var ayatnumber = class_name.split('-')[0];
    // 	if(!$('#'+ayatnumber+'-text').is(":visible")){
    // 	    $('#'+ayatnumber+'-text').fadeIn();
    // 	    $('#'+ayatnumber+'-text').css({'overflow-y': 'auto'});
    //         $('#'+ayatnumber+'-text').siblings("div").hide();
    // 	}
    	
    //     if($(this).hasClass('mybutton') && current_clicked_area != class_name){
    //         $('area[class='+class_name+']').mapster('select');
            
    //         current_clicked_area = class_name;
    //     }
    // })
    
});

// Display tafsir
function displayTafsir(tafsir_id, e) {
    if (tafsir_id) {
	e.preventDefault();
	var tafsir = '#ayat' + tafsir_id + '-text';
	if (!$(tafsir).is(':visible')) {
	    $(tafsir).fadeIn();
	    $(tafsir).siblings("div").hide();
	}
    }
}

// Regex check whether mobile browsing or nah
window.isMobileBrowsing = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};
