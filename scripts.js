(function() {

    $(document).ready(function() {
        console.log('ready');

        $.ajax({
            url: "https://raw.githubusercontent.com/royermatt/compassiongroups/main/groups.json",
            method: "GET",
            success: function(r) {
                var json = JSON.parse(r);

                $.each(json.data, function(i, v) {
                    var html = '<div class="group">';
                        html += '<h3 class="title">' + v.name + '</h3>';
                        html += '<span class="time">' + v.day + ', ' + v.time + '</span>';
                        html += '<span class="tag">' + v.type + '</span>';
                    html += '</div>';
                    $('#groups').append(html);
                });
            }
        });
    });

})();