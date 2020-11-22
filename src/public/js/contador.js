var limit = 150;
$(function() {
    $("#txaMessage").on("input", function () {
        //al cambiar el texto del txt_detalle
        var init = $(this).val().length;
        total_characters = (limit - init);

        $('#caracteres').html(total_characters + " caracteres restantes");
    });
});