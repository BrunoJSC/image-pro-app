import useFirestore from "../hooks/useFirestore";

function formattedDate(date: Date) {
  return Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export default function ImageGallery() {
  const { docs: images, isLoading } = useFirestore("images");
  console.log(images);

  if (!isLoading) {
    return (
      <div className="text-center mt-10">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-between mt-5 mb-5">
      {images.map((image) => (
        <div
          key={image.userEmail}
          className="card card-compact w-72 bg-base-100 shadow-xl gap-5"
        >
          <figure>
            <img src={`${image.imageUrl}`} alt="Shoes" />
          </figure>
          <div className="card-body">
            {<p>Upload by: {formattedDate(image.createdAt)}</p>}
            <span>Created on: {image?.userEmail}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
