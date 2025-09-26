import type { Movie, MovieVideoResponse, ResponseData } from "./type";
import API from "../api";

export const getPopular = async () => {
  try {
    const response = await API.get("movie/popular");

    if (response.status === 200) {
      return response.data as ResponseData;
    }
  } catch (error: any) {
    console.error("Failed to fetch movie by id:", error);
  }
};

export const getTopRated = async (): Promise<ResponseData | undefined> => {
  try {
    const response = await API.get("movie/top_rated");
    if (response.status === 200) return response.data as ResponseData;
  } catch (error: any) {
    console.error("Failed to fetch top rated movies:", error);
  }
};

export const getMovieById = async (movieId: string | number) => {
  try {
    const response = await API.get(`/movie/${movieId}`);

    if (response.status === 200) {
      return response.data as Movie;
    }
  } catch (error: any) {
    console.error("Failed to fetch movie by id:", error);
  }
};

export const getMovieVideos = async (movieId: string | number) => {
  try {
    const response = await API.get(`/movie/${movieId}/videos`);
    if (response.status === 200) {
      return response.data as MovieVideoResponse;
    }
  } catch (error: any) {
    console.error("Failed to fetch movie videos:", error);
  }
};
