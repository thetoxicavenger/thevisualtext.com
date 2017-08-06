$(function() {

  var MultiString = function(f) {
    return f.toString().split('\n').slice(1, -1).join('\n');
  }

  function injectErrorMessage() {

  }

  function returnHumanFriendlyDate(computerFriendlyDate) {
    /* TODO: Add a try catch for this with injectErrorMessage in the catch */
    var humanFriendlyDate = moment(computerFriendlyDate).format("dddd, MMMM Do YYYY");
    return humanFriendlyDate
  }

  function extractImportantEpisodeData (episode) {
    if (episode.published_at && episode.title && episode.images.large && episode.sharing_url && episode.description) {
      return {
        episodeDate: returnHumanFriendlyDate(episode.published_at),
        title: episode.title,
        episodeCoverArtSrc: episode.images.large,
        episodeListeningLink: episode.sharing_url,
        episodeDescription: episode.description,
      }
    }
  }

  function renderEpisodesMarkup(episodesData) {
    for (var i = 0; i < episodesData.length; i++) {
      var episode = episodesData[i]
      var data = extractImportantEpisodeData(episode)
      var $episodesSectionWrapper = $('#podcast-episodes-wrapper')


      var markup = '<div class="episode-container"><div class="episode-title"><a href="' + data.episodeListeningLink + '">' + data.title + '</a></div><div class="episode-image-container"><a href="' + data.episodeListeningLink + '"><img src="' + data.episodeCoverArtSrc + '" /></a></div></div>'


      // var markup = '<div class"container"><div class="row"><div class="col s12 m12"><div class="card"><div class="card-image"><img src="' + data.episodeCoverArtSrc + '"><span class="card-title black-text">' + data.episodeDate + '</span></div><div class="card-content black-text"><p>' + data.episodeDescription + '</p></div><div class="card-action"><a class="black-text" href="' + data.episodeListeningLink + '">Listen</a></div></div></div></div></div>'
      $episodesSectionWrapper.append(markup)
    }
  }

  function processReturnedData(proxyResponse) {
    if (proxyResponse.data && proxyResponse.data.length > 0) {
      var episodesData = proxyResponse.data
      renderEpisodesMarkup(episodesData)
    }
    else {
      injectErrorMessage()
    }
  }

  $.ajax({
    url: '/podcastData',
    error: function (err) {
      injectErrorMessage()
    },
    success: function (proxyResponse) { /* NOTE: Data or Error because 'done' could still bring back a bad res from the api */
      processReturnedData(proxyResponse)
    },
  })

});
