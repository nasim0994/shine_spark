export default function ProductImage({ thumbnail, galleries }) {
  console.log(galleries);

  return (
    <div>
      <div className="flex justify-center">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/products/${thumbnail}`}
          alt="thumbnail"
          className="h-52 w-56 object-cover sm:h-80 sm:w-80"
          loading="lazy"
        />
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 sm:gap-3">
        {galleries.map((gallery) => (
          <img
            key={gallery.id}
            src={`${import.meta.env.VITE_BACKEND_URL}/products/${gallery?.url}`}
            alt="gallery"
            className="h-48 w-full object-cover sm:h-80"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
