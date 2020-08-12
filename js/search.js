$('#search-button').click(function () {
    searchKeyword();
});

$('#key-word').keydown(function (event) {
    if (event.keyCode == 13) {
        searchKeyword();
    }
});

function searchKeyword() {
    $("#key-word").data('value', $('#key-word').val());
    render_json_data();
}

function forgetKeyWord() {
    $('#key-word').val('')
    $("#key-word").data('value', '');
}