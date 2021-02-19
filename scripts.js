(function() {

    $(document).ready(function() {
        console.log('ready');

        $.ajax({
            url: "https://raw.githubusercontent.com/royermatt/compassiongroups/main/groups.json",
            method: "GET",
            success: function(r) {
                var json = JSON.parse(r);

                $.each(json.data, function(i, v) {

                    var tags = '';

                    if(v.online) {
                        tags += '<span class="badge">Online</span>';
                    }
                    
                    if(v.childcare) {
                        tags += '<span class="badge">Childcare</span>';
                    } else {
                        tags += '<span class="badge">No childcare</span>';
                    }

                    var html = [
                        '<div class="group card">',
                            '<div class="card-body>',
                                '<span class="icon circle"></span>',
                                '<h3 class="card-title">' + v.name + '</h3>',
                                '<p class="card-subtitle mb-2 text-muted">' + v.day + ', ' + v.time + '</p>',
                                '<div class="type">' + v.type + '</div>',
                                '<div class="card-text">',
                                    '<p class="coach">Coach: ' + v.coach + '</p>',
                                    '<p class="description">' + v.description + '</p>',
                                '</div>',
                                tags,
                            '</div>',
                        '</div>'
                    ];

                    $('#groups').append(html.join(''));
                });
            }
        });
    });

})();