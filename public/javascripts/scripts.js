// Shorthand for $( document ).ready()
$(function() {

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
      $episodesSectionWrapper.append('<div>hi</div>')
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
