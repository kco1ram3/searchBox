
(function($) {
    $.fn.searchbox = function(options) {

        var defaults = {
            token: '1234567890',
            key: 'admin',
            url: '',
            titleText: 'Search Hotels',
            searchQuestionText: 'Where are you going?',
            startDateText: 'Check-in',
            endDateText: 'Check-out',
            buttonText: 'Search'
        };
     
        var settings = $.extend( {}, defaults, options );
        var id = this[0].id;

        return this.each(function() {
            var el = $(this);
            var content = $.fn.searchbox.search_box_hotel(id, settings);
            el.html(content);

            var loading = $('#' + id + '_loading');
            var searchText = $('#' + id + '_search_text');
            var searchButton = $('#' + id + '_search_hotel');

            loading.show();
            searchText.prop('placeholder', 'Loading...');
            searchButton.prop('disabled', true);

            $.ajax({
                'type': 'get',
                'headers': {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                'dataType': 'json',
                'async': false,
                'contentType': 'application/json; charset=utf-8',
                'url': 'https://raw.githubusercontent.com/twitter/typeahead.js/gh-pages/data/countries.json',
                'success': function (response) {
                    var data = response;
                    //data = JSON.parse(jsondata);

                    var countries = new Bloodhound({
                        datumTokenizer: Bloodhound.tokenizers.whitespace,
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        local: data
                    });

                    searchText.typeahead({
                        highlight: true
                    }, {
                        name: 'countries',
                        source: countries
                    });

                    /*
                    loading.hide();
                    searchText.prop('placeholder', 'City, Airport, Point of Interest');
                    searchButton.prop('disabled', false);
                    */
                    setTimeout(function() {
                        loading.hide();
                        searchText.prop('placeholder', 'City, Airport, Point of Interest');
                        searchButton.prop('disabled', false);
                    }, 3000);
                },
                'error': function (msg) {
                    console.log(msg);
                }
            });

            $('#' + id + '_form input.date-pick, .input-daterange, .date-pick-inline').datepicker({
                todayHighlight: true
            });

            $('#' + id + '_start_date')
                .datepicker('setDate', 'today')
                .on('changeDate', function(e) {
                     //$('.input-daterange input[name="end"]').datepicker('setStartDate', e.date);
                });
            $('#' + id + '_end_date').datepicker('setDate', '+7d');

            searchButton.bind( "click", function() {
                var search = {
                    token: settings.token,
                    key: settings.key,
                    location: $('#' + id + '_search_text').val(), 
                    startDate: $('#' + id + '_start_date').datepicker('getDate'),
                    endDate: $('#' + id + '_end_date').datepicker('getDate')
                };
                console.log(search);
            });
        });
    };

    $.fn.searchbox.search_box_hotel = function(id, settings) {
        var content = '';
        content += '<div class="row">';
        content += '<div class="col-md-12">';
        content += '<div id="' + id + '_loading" class="search_box_loading"></div>';
        content += '<h4>' + settings.titleText + '</h4>';
        content += '<form id="' + id + '_form" name="' + id + '_form">';
        content += '<div class="form-group form-group-icon-left"><i class="fa fa-map-marker input-icon"></i>';
        content += '<label>' + settings.searchQuestionText + '</label>';
        content += '<input class="form-control" name="' + id + '_search_text" id="' + id + '_search_text" placeholder="City, Airport, Point of Interest" type="text" autocomplete="off" spellcheck="false" />';
        content += '</div>';
        content += '<div class="input-daterange">';
        content += '<div class="row">';
        content += '<div class="col-md-6">';
        content += '<div class="form-group form-group-icon-left"><i class="fa fa-calendar input-icon input-icon-highlight"></i>';
        content += '<label>' + settings.startDateText + '</label>';
        content += '<input class="form-control" class="" name="' + id + '_start_date" id="' + id + '_start_date" type="text" />';
        content += '</div>';
        content += '</div>';
        content += '<div class="col-md-6">';
        content += '<div class="form-group form-group-icon-left"><i class="fa fa-calendar input-icon input-icon-highlight"></i>';
        content += '<label>' + settings.endDateText + '</label>';
        content += '<input class="form-control" name="' + id + '_end_date" id="' + id + '_end_date" type="text" />';
        content += '</div>';
        content += '</div>';
        content += '</div>';
        content += '</div>';
        content += '<button class="btn btn-primary" type="button" id="' + id + '_search_hotel">' + settings.buttonText + '</button>';
        content += '</form>';
        content += '</div>';
        content += '</div>';
        return content;
    };
})(jQuery);