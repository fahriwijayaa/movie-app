import React, { forwardRef } from "react";
import type { Movie } from "../../services/movie";

interface ModalDetailProps {
  movie: Movie;
  open: boolean;
  onClose: () => void;
}

const IMG_BASE = import.meta.env.VITE_IMG_BASE;

const ModalDetail = forwardRef<HTMLDivElement, ModalDetailProps>(
  ({ movie, open, onClose }, ref) => {
    if (!open) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        onClick={onClose} // klik overlay menutup modal
      >
        <div
          ref={ref}
          className="bg-gray-900 text-white rounded-lg max-w-lg w-full p-6 relative shadow-xl"
          onClick={(e) => e.stopPropagation()} // klik di konten tidak menutup modal
        >
          {/* Tombol close */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            ✕
          </button>

          {/* Poster */}
          <div className="w-full h-[300px] bg-gray-700 flex items-center justify-center overflow-hidden rounded-lg mb-4">
            {movie.poster_path ? (
              <img
                src={`${IMG_BASE}${movie.poster_path}`}
                alt={movie.title}
                className="w-full object-cover object-top"
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>

          {/* Detail Info */}
          <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
          <p className="text-sm text-gray-400 mb-2">
            Release Date: {movie.release_date}
          </p>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-400">★</span>
            <span>{movie.vote_average}/10</span>
          </div>
          <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    );
  }
);

export default ModalDetail;
