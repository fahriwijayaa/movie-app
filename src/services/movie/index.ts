import type { Movie, ResponseData, Video, MovieVideoResponse } from "./type";
import { getPopular, getTopRated, getMovieById, getMovieVideos } from "./api";

export { getPopular, getTopRated, getMovieById, getMovieVideos };
export type { Movie, ResponseData, Video, MovieVideoResponse };
