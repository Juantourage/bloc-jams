var createSongRow = function(songNumber, songName, songLength) {
    var template = 
        '<tr class = "album-view-song-item">'
     +  '   <td class = "song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     +  '   <td class = "song-item-title">' + songName + '</td>'
     +  '   <td class = "song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;
    
    var $row = $(template);
    
    var clickHandler = function() {
      var songNumber = $(this).attr('data-song-number');
        
        if(currentlyPlayingSongNumber !== null) {
            // Revert to the song number for currentPlayingSong becuase user started playing a new song.
            var currentPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
            currentPlayingCell.html(currentlyPlayingSongNumber);
        }
        
        if(currentlyPlayingSongNumber !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSongNumber = songNumber;
        }else if(currentlyPlayingSongNumber === songNumber) {
            // Switch from Pause -> Play  button to pause currently playing song
            $(this).html(playButtonTemplate);
            currentlyPlayingSongNumber = null;
        }
    };
    
    var onHover = function(event) {
        // Placeholder for the function logic
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
        
    };
    
    var offHover = function(event) {
        // Placeholder for function logic
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    };
    
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var setCurrentAlbum = function(album) {
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    
    
    $albumSongList.empty();
    
    
    for(var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

//Album Button Templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// #1
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
});