import axiosClient from "../axios/axios.config.js";
import tmdbEndpoints from "./tmdb.Endpoin.js";


const tmdb = {
  mediaDetail: async ({ mediaType, mediaId }) => await axiosClient.get(
    tmdbEndpoints.mediaDetail({ mediaType, mediaId })),
  mediaList: async ({mediaType, mediaCategory, page, with_genres,sort_by})=> await axiosClient.get(
    tmdbEndpoints.mediaList({mediaType, mediaCategory}, {page, with_genres,sort_by}),
  ),
  mediaOption: async ({mediaType, mediaId , mediaOption, page})=> await axiosClient.get(
    tmdbEndpoints.mediaOption({mediaType, mediaId , mediaOption},{page})
  ),
  mediaVideo: async({mediaType, mediaId})=> await axiosClient.get(
    tmdbEndpoints.mediaVideo({mediaType,mediaId})
  ),
  mediaType: async({mediaType,page})=> await axiosClient.get(
    tmdbEndpoints.mediaType({mediaType},{page})
  ),
  mediaListGenres: async({mediaType})=>await axiosClient.get(
    tmdbEndpoints.mediaListGenres({mediaType})
  ),
  mediaCredits: async({mediaType, mediaId})=> await axiosClient.get(
    tmdbEndpoints.mediaCredits({mediaType, mediaId})
  ),
  mediaRecommendations: async({mediaType, mediaId})=>await axiosClient.get(
    tmdbEndpoints.mediaRecommendations({mediaType, mediaId})
  ),
  mediaSearch: async({query, page, mediaType})=> await axiosClient.get(
    tmdbEndpoints.mediaSearch({mediaType},{query, page})
  ),
  mediaSearchKey: async({query, page})=> await axiosClient.get(
    tmdbEndpoints.mediaSearchKey({},{query, page})
  )
  
  }
    export default tmdb