import { useState } from "react";

interface ImageGaleryProps {
  images: string[]
}

const ImageGallery: React.FC<ImageGaleryProps> = ({ images }) => {
  const [mainImage, setMainImage] = useState<string>(images[0]);
  return (
    <div className="w-full h-full flex items-center">
      <div className="h-full flex-1 gap-1 flex flex-col pl-4">
        {
          images.map((pic, index) => (
            <div key={index} className="w-[60%] aspect-square" onMouseEnter={() => setMainImage(pic)}>
              <img src={pic} alt="images" className="w-full h-full object-contain" />
            </div>
          ))
        }
      </div>
      <div className="h-full aspect-square">
        <img src={mainImage} alt="image" className="h-full w-full object-contain" />
      </div>
    </div>
  );
};

export default ImageGallery;
