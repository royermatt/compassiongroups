var modal = new bootstrap.Modal(document.getElementById('modal'), {
    keyboard: false
});

var data = [];


$(document).ready(function() {

    $.ajax({
        url: "https://raw.githubusercontent.com/royermatt/compassiongroups/main/groups.json",
        method: "GET",
        success: function(r) {
            var json = JSON.parse(r);
            data = json.data || [];

            $.each(data, function(i, v) {

                var tags = '';

                if(v.online) {
                    tags += '<span class="badge">Online</span>';
                }
                
                if(v.childcare) {
                    tags += '<span class="badge">Childcare</span>';
                } 

                if(v.full) {
                    tags += '<div class="full">This group is currently full</div>';
                }

                var description = v.description;
                if(description.length > 120) {
                    description = description.substring(0,120).trim() + "...";
                }

                var html = [
                    '<div class="group card" onclick="openModal('+ i +')">',
                        '<div class="card-header">',
                            '<h4 class="card-title">' + v.name + '</h4>',
                            '<span class="card-subtitle mb-2">' + v.day + ' at ' + v.time + '</span>',
                        '</div>',
                        '<div class="card-body">',
                            '<div class="type">' + v.type + '</div>',
                            '<div class="card-text">',
                                '<p class="coach">Leader: ' + v.leader + '</p>',
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

var openModal = function(index) {

    var item = data[index];

    var html = [
        '<h3>' + item.name + '</h3>',
        '<p>' + item.description + '</p>',
        '<p>',
            '<strong>Campus</strong><br />',
            '<span>' + item.campus + '</span>',
        '</p>',
        '<p>',
            '<strong>Community Type</strong><br />',
            '<span>' + item.type + '</span>',
        '</p>',
        '<p>',
            '<strong>Location</strong><br />',
            '<span>' + item.location + '</span>',
        '</p>'
    ];

    $("#modal .modal-body").html(html.join(''));

    if($("#modal .modal-footer").length === 0) {  
        $("#modal .modal-content").append('<div class="modal-footer"><button class="btn" onclick="showRegisterForm()">Join this group</button></div>');
    }
    modal.show();
};

var showRegisterForm = function() {
    var html = [    
        '<h5>Join this group</h5>',
        '<p>Are you interested in joining this group? Use the form below to send an email to the group leader.</p>',
        '<form style="margin-top:15px;">',
        '<div class="mb-3 row">',
            '<label for="" class="form-label">Name</label>',
              '<div class="input-group">',
              '<input type="text" aria-label="First name" class="form-control" placeholder="First" />',
              '<input type="text" aria-label="Last name" class="form-control" placeholder="Last" />',
            '</div>',
          '</div>',
          '<div class="mb-3 row">',
              '<label for="" class="form-label">Email address</label>',
              '<div class="input-group">',
              '<input type="email" class="form-control" placeholder="example@example.com" />',
              '</div>',
            '</div>',
            '<button type="submit" class="btn">Register</button>',
        '</form>'
    ];

    $("#modal .modal-body").html(html.join(''));
    $("#modal .modal-footer").remove();
    modal.show();

}