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
    $.ajax({
        url: '/list/',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            var serverData = new Array();
            for(var i = 0; i < data.length; i++){
                var row = {};
                row['number'] = i;
                row['name'] = data[i].name;
                serverData[i] = row;
            }
            var source = {
                localdata: serverData,
                datatype: 'array'
            }
            var dataAdapter = new $.jqx.dataAdapter(source, {
                loadComplete: function(data){},
                loadError: function (xhr, status, error) {}
            });
            $('#jqxgrid').jqxGrid({
                source: dataAdapter,
                autoheight: true,
                autowidth: true,
                columns: [
                    {text: 'Number', datafield:'number'},
                    {text: 'Name', datafield: 'name'}
                ]
            });
        }
    });
});