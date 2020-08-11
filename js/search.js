$('#search-button').click(function () {
    render_json_data($('#key-word').val());
});

$('#key-word').keydown(function(event){
    if (event.keyCode==13){
        render_json_data($('#key-word').val());
    }
})