import React from "react";

function PicturePreview({ images }: { images: File[] }) {
  if (images.length === 0) return null;
  return (
    <div className="flex flex-row justify-center">
      {images.map((image, index) => (
        <img
          key={index}
          src={URL.createObjectURL(image)}
          alt={`preview-${index}`}
          className="h-80 w-80 object-cover rounded-lg mr-2"
        />
      ))}
    </div>
  );
}

export default PicturePreview;