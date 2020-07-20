"use strict";

$('input.date-pick, .input-daterange, .date-pick-inline').datepicker({
    todayHighlight: true
});

$('input.date-pick, .input-daterange input[name="start"]')
    .datepicker('setDate', 'today')
    .on('changeDate', function(e) {
         //$('.input-daterange input[name="end"]').datepicker('setStartDate', e.date);
    });
$('.input-daterange input[name="end"]').datepicker('setDate', '+7d');