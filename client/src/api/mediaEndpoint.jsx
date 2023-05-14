const mediaEndpoint = {
  list:({mediaType, mediaCategory, page}) => `${mediaType}/${mediaCategory}?page=${page}`,
  detail:({mediaType, mediaId}) => `${mediaType}/detail/${mediaId}` ,
  option:({mediaType},{mediaOption},{page})=>`${mediaType}/${mediaOption}?page=${page}`
}

export default mediaEndpoint