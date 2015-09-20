$(function (){

    // Activate animation events for non-touch
    if (Modernizr.touch) {   

    } else {  
        // Start skrollr
        var s = skrollr.init({forceHeight: false});

        // Scroll parallax
        $(document).scroll(function (){
            var scrollTop = $(window).scrollTop();

            $('[data-para-y]').each(function (){
                var yRatio = $(this).data('para-y');

                $(this).css({
                    transform: 'translateY(' + (scrollTop * yRatio) + 'px)'
                });
            });
        });

        // Init scrolling
        $(document).scroll();
    }

    // Animate in
        // Preset children animations
        if (!Modernizr.touch){
            $('[data-transition-children]').each(function (){
                var params = $(this).data('transition-children');
                params = params.split(";");

                $(this).find(params[0]).css('visibility', 'hidden');
            });
        }
        // Do the animations
    var setWaypoints = function (){
        $('[data-transition-children], [data-transition]').waypoint(function() {
            if (!$(this).hasClass("showing")){
                $(this).addClass("showing"); // Is now showing

                // Standard velocity transition
                if ($(this).data('transition')){

                    var params = $(this).data('transition');
                    params = params.split(";");

                    if (params.length == 1){
                        params[1] = 'block';
                    }

                    /*
                    params[0] // Transition
                    params[1] // Optional: display
                    */

                    $(this)
                        .velocity('transition.' + params[0], {
                            duration: 1000,
                            visibility: 'visible',
                            display: params[1]
                        });
                    return false;
                } else if ($(this).data('transition-children')){
                    // Transition a child element
                    var params = $(this).data('transition-children');
                    params = params.split(";");

                    /*
                    params[0] // Child
                    params[1] // Transition
                    params[2] // Duration
                    params[3] // Stagger
                    */

                    $(this).find(params[0])
                        .velocity('transition.' + params[1], {
                            duration: params[2],
                            stagger: params[3],
                            visibility: 'visible',
                            display: 'inline-block'
                        });
                }
            }
        }, {
            offset: '90%'
        });
    }

    if (!Modernizr.touch){
        setWaypoints();
    }
});
