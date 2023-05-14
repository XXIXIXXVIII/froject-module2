import tmdbConfig from "./tmdb.config.js";

 const tmdbEndpoints = {
  mediaDetail: ({ mediaType, mediaId }, ) => tmdbConfig.getUrl(
    `${mediaType}/${mediaId}`, 
  ),
  mediaList: ({mediaType, mediaCategory},{page, with_genres,sort_by})=> tmdbConfig.getUrl(
    `${mediaType}/${mediaCategory}`,{page,with_genres,sort_by}
  ),
  mediaOption: ({mediaType, mediaId , mediaOption},{page}) => tmdbConfig.getUrl(
    `${mediaType}/${mediaId}/${mediaOption}`,{page}
  ),
  mediaVideo:({mediaType, mediaId})=> tmdbConfig.getUrl(
    `${mediaType}/${mediaId}/videos`
  ),
  mediaType:({mediaType},{page})=>tmdbConfig.getUrl(
    `${mediaType}`,{page}
  ),
  mediaListGenres:({mediaType},)=>tmdbConfig.getUrl(
    `genre/${mediaType}/list`
  ),
  mediaCredits:({mediaType, mediaId})=>tmdbConfig.getUrl(
    `${mediaType}/${mediaId}/credits`
  ),
  mediaRecommendations:({mediaType, mediaId})=>tmdbConfig.getUrl(
    `${mediaType}/${mediaId}/recommendations`
  ),
  mediaSearch: ({mediaType},{query,page})=>tmdbConfig.getUrl(
    `search/${mediaType}`,{query,page}
  ),
  mediaSearchKey:({},{query,page})=>tmdbConfig.getUrl(
    `search/keyword`,{query,page}
  )
}

export default tmdbEndpoints