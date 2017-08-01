(function($) {

    $.fn.columntoggle = function( options ) {



        // Establish our default settings
        var settings = $.extend({
            //Class of column toggle contains toggle link
            toggleContainerClass: 'columntoggle-container',

            //Text in column toggle box
            toggleLabel: 'Show/Hide columns: ',

            //the prefix of key in localstorage
            keyPrefix: 'columntoggle-',

            //keyname in localstorage, if empty, it will get from URL
            key: ''

        }, options);

        //set default key for storage
        if (settings.key.length == 0) {
            settings.key = window.location.href;
        }

        var toggleLinkStatus = {
            checkStatus: function(el, hidelist) {
                $(el).next().find('a').each(function(){
                    var columnindex = $(this).attr('data-columnindex');
                    if ($.inArray(columnindex + '', hidelist) >= 0) {
                        $(this).addClass('inactive');
                    } else {
                        $(this).removeClass('inactive');
                    }
                });
            }
        }

        var toggleStatusStorage = {
            save: function(el){
                var hidelist = [];
                $(el).find('thead > tr > th').each(function(index){
                    //column index start from 1
                    var columnindex = index + 1;

                    if ($(this).is(':visible') === false) {
                        hidelist.push(columnindex + '');
                    }
                });

                localStorage.setItem(settings.keyPrefix + settings.key, hidelist.join(','));

                toggleLinkStatus.checkStatus(el, hidelist);
            },
            load: function(el){
                if (settings.key.length > 0) {
                    var hidelistString = localStorage.getItem(settings.keyPrefix + settings.key);
                    if (hidelistString !== null && hidelistString.length > 0) {
                        var hidelist = hidelistString.split(',');
                        if (hidelist.length > 0) {
                            $.each(hidelist, function(index, columnindex){
                                $(el).find('td:nth-child('+columnindex+'), th:nth-child('+columnindex+')').hide();
                            });

                            toggleLinkStatus.checkStatus(el, hidelist);
                        }

                    }
                }
            }
        };



        return this.each( function() {

            //Detect to prevent add more togglebox to a table (ussally from react didUpdate)
            if ($(this).next().hasClass(settings.toggleContainerClass)) {
                $(this).next().remove();
            }
            
            var table = $(this);

            //find table header to extract columns
            var toggleColumnHtml = [];
            $(this).find('thead > tr > th').each(function(index){

                //column index start from 1
                var columnindex = index + 1;

                var togglenameAttr = $(this).attr('data-columntoggle');
                var toggleName = '';
                if (typeof togglenameAttr !== typeof undefined && togglenameAttr !== false) {
                    toggleName = togglenameAttr;
                } else {
                    toggleName = $(this).text();
                }

                toggleColumnHtml.push('<a href="#" data-columnindex="'+columnindex+'">'+toggleName+'</a>');
            });

            var toggleContainer = '<div class="'+settings.toggleContainerClass+'">'+settings.toggleLabel+' '+toggleColumnHtml.join(', ')+'</div>';
            $(this).after(toggleContainer);


            $(this).next().find('a').each(function(){
                $(this).bind('click', function(e){
                    var columnindex = $(this).attr('data-columnindex');
                    $(table).find('td:nth-child('+columnindex+'), th:nth-child('+columnindex+')').toggle();

                    //store
                    toggleStatusStorage.save(table);

                    e.preventDefault();
                });
            });

            //load hide status from cache
            toggleStatusStorage.load(table);
        });

    }
}(jQuery));
