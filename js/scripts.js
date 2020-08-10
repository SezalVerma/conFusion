/*  *************************************  TOOLTIP 
    
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });

    ************************************    JQUERY FOR PAUSE N PLAY BUTTONS , CAROUSEL

    $(document).ready(function(){
        $("#mycarousel").carousel({interval : 2000});

        $("#carousel-pause").click(function(){
            $("#mycarousel").carousel('pause');
        })

        $('#carousel-play').click(function(){
            $('#mycarousel').carousel('cycle');
        })
    })
 */

// ***************************************  ONE BTN ACTING BOTH AS PLAY N PAUSE 
    $(document).ready(function(){
        $('#mycarousel').carousel({interval : 2000});

        $('#carouselButton').click(function(){
            if( $('#carouselButton').children('span').hasClass('fa-pause')) {         
                $('#mycarousel').carousel('pause');
                $('#carouselButton').children('span').removeClass('fa-pause');
                $('#carouselButton').children('span').addClass('fa-play');
            }
        else{
                $('#mycarousel').carousel('cycle');
                $('#carouselButton').children('span').removeClass('fa-play');
                $('#carouselButton').children('span').addClass('fa-pause');
            }
        });
    })

// *************************************    ENABLE MODALS FOR LOGIN AND RESERVE TABLE

    $(document).ready(function(){
        $('#LoginLink').click(function(){
            $('#loginModal').modal('toggle');
        })
        $('#ReserveLink').click(function(){
            $('#reserveModal').modal('toggle');
        })
    })
