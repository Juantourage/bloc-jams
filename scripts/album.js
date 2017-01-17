var albumPicasso = {
   title: 'The Colors',
   artist: 'Pablo Picasso',
   label: 'Cubism',
   year: '1881',
   albumArtUrl: 'assets/images/album_covers/01.png',
   songs: [
       {title: 'Blue', duration: '4:26'},
       {title: 'Green', duration: '3:14'},
       {title: 'Red', duration: '5:01'},
       {title: 'Pink', duration: '3:21'},
       {title: 'Magneta', duration: '2:15'}
    ]
};

// Another Example Album
 var albumMarconi = {
   title: 'The Telephone',
   artist: 'Giglielmo Marconi',
   label: 'EM',
   year: '1909',
   albumArtUrl: 'assets/images/album_covers/20.png',
   songs: [
       {title: 'Hello, Operator?', duration: '1:01'},
       {title: 'Ring, ring, ring', duration: '5:01'},
       {title: 'Fits in your pocket', duration: '3:21'},
       {title: 'Can you hear me now?', duration: '3:14'},
       {title: 'Wrong phone number', duration: '2:15'}
    ]
};

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
        
        if(currentPlayingSong !== null) {
            // Revert to the sonf number for currentPlayingSong becuase user started playing a new song.
            car currentPlayingCell = $('.song-item-number[data-song-number="' + currentPlayingSong + '"]');
            currentPlayingCell.html(currentPlayingSong);
        }
        
        if(currentPlayingSong !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
            currentPlayingSong = songNumber;
        }else if(currentPlayingSong === songNumber) {
            // Switch from Pause -> Play  button to pause currently playing song
            $(this).html(playButtonTemplate);
            currentPlayingSong = null;
        }
    };
    
    var onHover = function(event) {
        // Placeholder for the function logic
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        
        if (songNumber !== currentPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
        
    };
    
    var offHover = function(event) {
        // Placeholder for function logic
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        
        if (songNumber !== currentPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };
    
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var setCurrentAlbum = function(album) {
    
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

// Store state of playing songs
var currentPlayingSong = null;

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
});