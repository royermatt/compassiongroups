var modal = new bootstrap.Modal(document.getElementById('modal'), {
    keyboard: false
});

var data = [];

var cities = ["Savannah", "Statesboro", "Rincon", "Midway"];
var campuses = ["Henderson", "Downtown", "Effingham", "East", "Midway", "Statesboro", "Latino"];
var campusCity = [0, 0, 2, 0, 3, 1, 0];

var translateData = function(data) {
    var newData = [];
    var randomItems = [295,291,214,191,272,57,168,128,595,565,19,382,108,555,374,433,250,13,209,220,18,137,230,585,548,331,129,274,16,102,314,572,176,232,536,159,452,404,256,357,266,352,494,508,471,2,75,178,88,490];

    $.each(data, function(i,d) {
        if(randomItems.includes(i)) {
            var random = Math.floor(Math.random() * 7);
            newData.push({        
                "id": d.Id,
                "name": d.Name,
                "description": d.Description,
                "type": d.CCVGroupType,
                "audience": d.CCVGroupAudience,
                "occurance": "Weekly",
                "day": d.DayOfWeek,
                "time": d.TimeOfDay,
                "campus": campuses[random],
                "city": cities[campusCity[random]],
                "state": "GA",
                "online": d.OnlineGroup,
                "childcare": d.Childcare,
                "leader": d.CoachFirstName + " " + d.CoachLastName,
                "icon": "default",
                "picture": (d.FamilyPicture) ? "https://ccv.church/GetImage.ashx?guid=" + d.FamilyPicture +"&width=4=600" : null,
                "full": d.AtCapacity
            });
        }
    });

    return newData;
};

$(document).ready(function() {


    $.ajax({
        url: "https://raw.githubusercontent.com/royermatt/compassiongroups/main/ccv.json",
        method: "GET",
        success: function(r) {
            var json = JSON.parse(r);
            data = translateData(json.Data) || [];

            $.each(data, function(i, v) {

                var tags = '';

                if(v.online) {
                    tags += '<span class="badge">Online</span>';
                }
                
                if(v.childcare) {
                    tags += '<span class="badge">Childcare</span>';
                } 

                if(v.full) {
                    tags += '<span class="full">This group is currently full</span>';
                }

                var description = v.description;
                if(description.length > 255) {
                    description = description.substring(0,255).trim() + "...";
                }

                var image = '';
                if(v.picture) {
                    //image = '<img class="card-img-top" src="'+ v.picture +'" alt="Card image cap" />';
                }

                if(i % 3 === 0) {
                    //$('#groups').append('<div class="row" data-masonry=\'{"percentPosition": true }\'>');
                }

                var html = [
                        '<div class="group card'+ ((v.full) ? ' full' : '') +'" onclick="openModal('+ i +')">',
                            image,
                            '<div class="card-header">',
                                '<h4 class="card-title">' + v.name + '</h4>',
                                '<span class="card-subtitle mb-2">' + v.day + ' at ' + v.time + '</span>',
                            '</div>',
                            '<div class="card-body">',
                                '<div class="type">' + v.audience + '</div>',
                                '<div class="card-text">',
                                    '<p class="coach">Leader: ' + v.leader + '</p>',
                                    '<p class="description">' + description + '</p>',
                                '</div>',
                                tags,
                            '</div>',
                        '</div>'
                ];

                $('#groups').append(html.join(''));

                //msnry.masonry( 'appended', $(html.join('')) );
                
                if(i % 3 === 1) {
                    //$('#groups').append('</div>');
                }
            });

            $('#groups').masonry({
                itemSelector: '.group',
                percentPosition: true
              })

        }
    });
});

var openModal = function(index) {

    var item = data[index];

    var html = [
        '<h3>' + item.name + '</h3>',
        '<p>' + item.day + ' at ' + item.time + '</p>',
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
            '<span>' + item.city + ', ' + item.state + '</span>',
        '</p>'
    ];

    if($("#modal .modal-footer").length === 0) {
        $("#modal .modal-content").append('<div class="modal-footer"></div>');
    }

    $("#modal .modal-title").html(item.name);    
    $("#modal .modal-body").html(html.join(''));

    if(item.full) {
        $("#modal .modal-footer").html('<span class="full">This group is currently full</span>');
    } else {
        $("#modal .modal-footer").html('<button class="btn" onclick="showRegisterForm()">Join this group</button>');
    }
    
    modal.show();
};

var showRegisterForm = function() {
    var html = [    
        '<h5>Join this group</h5>',
        '<p>We are glad that you are interested in joining this group! Use the form below to send an email to the group leader. They will be in touch with you soon.</p>',
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