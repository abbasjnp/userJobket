
$(window).ready(function() {

//video-placeholder function
       $('.embed-responsive-16by9 img').click(function(){
        video = '<iframe height="328" src="'+ $(this).attr('data-video') +'"></iframe>';
        
        $(this).after(video);
        
     });
       $('.play-btn').click(function(){
        video1 = '<iframe height="328" src="'+ $('.video-section img').attr('data-video') +'"></iframe>';
        
        $('.video-section img').after(video1);
     return false; 	
     
    });
    

});	

