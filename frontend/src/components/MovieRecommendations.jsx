import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
const chunkArray = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
const MovieCard = ({ movie, rating = 4.5, onSelect, showDescription }) => {
  const fallbackImage =
    "https://m.media-amazon.com/images/M/MV5BY2I4MmM1N2EtM2YzOS00OWUzLTkzYzctNDc5NDg2N2IyODJmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_SX677_AL_.jpg";

  return (
    <div className="w-[195px] flex-shrink-0 bg-[#f8f8f8] rounded-xl border border-black/5 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative w-[195px] h-[171px]">
        <img
          src={movie.posterUrl || fallbackImage}
          alt={movie.title}
          className="w-full h-full object-cover rounded-t-xl"
        />
        <div className="absolute top-2 right-2 bg-white rounded-lg px-2 py-0.5 text-xs font-semibold text-[#333] shadow-sm">
          ⭐ {rating}
        </div>
      </div>

      <div className="px-3 pb-3 pt-2 flex flex-col gap-2">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-black text-sm font-semibold line-clamp-2 leading-tight">
            {movie.title}
          </h3>
          <p className="text-xs text-[#555]">
            🎬 {movie.language} | 🕒 {Math.floor(movie.duration / 60)}h{" "}
            {movie.duration % 60}min
          </p>

          {showDescription && (
            <p className="text-xs text-[#666] font-normal mt-1 line-clamp-2 leading-snug">
              {movie.description}
            </p>
          )}
        </div>

        {!showDescription && (
          <button
            className="w-full h-9 bg-[#263fa8] hover:bg-[#BD60DE] text-white rounded-xl text-sm font-medium cursor-pointer transition-colors"
            onClick={onSelect}
          >
            🔘 Select
          </button>
        )}
      </div>
    </div>
  );
};

const MovieRecommendations = ({ movies, onSelect, showDescription }) => {
  const chunks = chunkArray(movies, 4);

  return (
    <div className="bg-white rounded-xl p-6 overflow-hidden w-full max-w-[1054px] mr-auto shadow-md">
      <h2 className="text-xl font-semibold text-black mb-5">
        {showDescription ? "Some Best Movies" : "Recommended"}
      </h2>
      <div className="max-w-[835px] w-full">
        <Swiper
          spaceBetween={17}
          grabCursor
          pagination={{
            el: ".custom-swiper-pagination",
            clickable: true,
            renderBullet: (_, className) =>
              `<span class="${className} min-w-10 h-2.5 opacity-10 bg-[#263fa8] rounded-[40px] transition-all duration-300"></span>`,
          }}
          modules={[Pagination]}
          className=" "
          breakpoints={{
            1024: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            0: { slidesPerView: 1 },
          }}
        >
          {chunks.map((group, i) => (
            <SwiperSlide key={i}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {group.map((movie) => (
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onSelect={() => onSelect(movie)}
                    showDescription={showDescription}
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-swiper-pagination inline-flex justify-center items-start gap-2 mt-4" />
      </div>
    </div>
  );
};
export default MovieRecommendations;
