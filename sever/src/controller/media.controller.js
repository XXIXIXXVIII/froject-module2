import tmdbApi from "../tmdb/tmdb.api";
import responseHandler from "../handlers/Response.handler.js"
import ResponseHandler from "../handlers/Response.handler.js";

const getDetail = async (req,res) =>{
  try {
    const { mediaType, mediaId } = req.params;
    
    const params = { mediaType, mediaId };
    
    const media = await tmdbApi.mediaDetail(params);
    
    media.video = await tmdbApi.mediaVideo(params)
    
    media.credits = await tmdbApi.mediaCredits(params)

    media.recommendations = await tmdbApi.mediaRecommendations(params)
    
    return responseHandler.ok(res,media)
    
  } catch (error) {
    responseHandler.error(res)
  }
}

const getList = async (req,res) =>{
  try {
    const {page, with_genres, sort_by} = req.query
    const {mediaType, mediaCategory,} = req.params
    const params ={ mediaType , mediaCategory, page, with_genres,sort_by };
    const media = await tmdbApi.mediaList(params)
    return responseHandler.ok(res, media)

  } catch (error) {
    responseHandler.error(res)
  }
}

const getOption = async (req, res) =>{
  try {
    const {page} = req.query

    const {mediaType, mediaId , mediaOption, } = req.params

    const params = {mediaType, mediaId , mediaOption, page}

    const media = await tmdbApi.mediaOption(params)

    return responseHandler.ok(res, media)
  } catch (error) {
    responseHandler.error(res)
  }
}

const getLitMediaType=async(req,res) => {
  try {
    const {page} = req.query
    
    const {mediaType} = req.params
    const params = {mediaType, page}
    const media = await tmdbApi.mediaType(params)
    return responseHandler.ok(res,media)
  } catch (error) {
    responseHandler.error(res)
  }
}

const getListGenres = async (req,res)=>{
  try {
    const params = req.params
    const media = await tmdbApi.mediaListGenres(params)
    return responseHandler.ok(res,media)
  } catch (error) {
    return ResponseHandler.error(res)
  }
  
}

const getDataSearch = async(req,res)=>{
  try {
    const {query,page} = req.query
    const {mediaType} = req.params
    console.log(mediaType)
    const params = {query, page, mediaType}
    const media = await tmdbApi.mediaSearch(params)
    media.key = await tmdbApi.mediaSearchKey({query,page})
    return ResponseHandler.ok(res, media)
  } catch (error) {
    return ResponseHandler.error(res)
  }
}

export default {getDetail, getList, getOption, getLitMediaType, getListGenres, getDataSearch}