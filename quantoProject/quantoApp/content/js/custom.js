$(function(){
    $("#Login").on('click', function(){
        $.ajax({
            url: '/',
            type: 'POST',
            dataType: 'json',
            data: 'login=' +  $('#username_field').val() + '&password=' + $('#password_field').val() + '&csrfmiddlewaretoken='+$("input[name='csrfmiddlewaretoken']").val(),
            success: function(data){
                if(data.error){
                    $('#Alert').removeClass('hidden');
                    return;
                }
                window.location.pathname = '/list/';
            }
        });
    });
});