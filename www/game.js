var tracks = [];
var t = "https://script.google.com/macros/s/AKfycbxrV80riTcPWC5MnIgi4Nd4r_85F9jyNk8TzCAW-x9mcvSeCyk/exec?text=";
var song = "";
fails = 0;
success = 0;

$(document).ready(function(){
    $.get("http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=15d042cd5a82a94e76b6820f6486276f&format=json", function(response){
        tracks = response.tracks.track;
        loaded();
    })
})
function loaded() {
    number = Math.ceil(Math.random()*50);;
    song = tracks[number].name.toLowerCase();
    $("#background").css("background-image", "url(" + tracks[number].image[3]["#text"] + ")");

    if(song.indexOf("(") > -1) {
        song = song.substr(0, song.indexOf("(")).trim();
    }

    console.log(song);
    $.get(t + encodeURIComponent(song), function(response){
        $("#songName").text(response);
        $("#loading").hide();
        $("#right").hide();
    })
}

$("#inputSong").keydown(function(e){
    if (e.keyCode != 13)
        return
    
    if($("#inputSong")[0].value.toLowerCase().trim() != song.toLowerCase().trim()) {
        $("#wrong").show();
        fails ++;
        $("#wrong").fadeToggle(500);
    }
    else if(fails < 3)
    {
        fails = 0;
        success += 1;
        $("#score").text(success);
        $("#right").show();
        loaded();
    }

    if(fails == 3) {
        //alert("LOL you failed 3 times. The song is called '" + song + "'");
        $("#songName").text(tracks[number].name);
        $("#inputSong").attr("disabled", true);
        $("#inputSong").attr("placeholder", "GAME OVER!");
        //fails = 0;
        //$("#loading").show();
        //loaded();
    }
    $("#inputSong").val("");
});