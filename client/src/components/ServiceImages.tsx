import asset1 from "../assets/asset1.png";
import asset2 from "../assets/asset2.png";
import asset3 from "../assets/asset3.png";
import asset4 from "../assets/asset4.png";
const ServiceImages = () => {
  const images = [
    {
      img: asset1,
      text: "HANDMADE ARTWORKS"
    },
    {
      img: asset2,
      text: "AUTHENTIC & SUSTAINABLE"
    },
    {
      img: asset3,
      text: "SECURE CHECKOUT"
    },
    {
      img: asset4,
      text: "WARRANTY"
    },
  ];
  return (
    <div className=" w-full h-full flex flex-wrap gap-10 md:gap-0 items-center justify-center">
      {
        images.map((obj, index) => (
          <div key={index} className="h-full w-full flex flex-col gap-4 p-4 md:w-1/3 lg:w-1/4">
            <div className="h-[80px] w-[80px] aspect-square mx-auto">
              <img src={obj.img} alt="images" className="h-full w-full object-cover" />
            </div>
            <div className="text-center text-primary font-bold hover:text-primary/90 hover:font-normal">
              {obj.text}
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default ServiceImages;
