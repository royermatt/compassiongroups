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
                    } 

                    if(v.full) {
                        tags += '<div class="full">This group is currently full</div>';
                    } else {
                        tags += '<button type="button" class="btn btn-sm">Join group</button>'
                    }

                    var description = v.description;
                    if(description.length > 120) {
                        description = description.substring(0,120).trim() + "...";
                    }

                    var html = [
                        '<div class="group card">',
                            '<div class="card-body>',
                                '<span class="icon circle"></span>',
                                '<h4 class="card-title">' + v.name + '</h4>',
                                '<p class="card-subtitle mb-2 text-muted">' + v.day + ' at ' + v.time + '</p>',
                                '<div class="type">' + v.type + '</div>',
                                '<div class="card-text">',
                                    '<p class="coach">Coach: ' + v.coach + '</p>',
                                    '<p class="description">' + description + '</p>',
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