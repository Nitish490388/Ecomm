

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ImageGaleryProps {
  images: string[]
}

const ImageGalleryMobile: React.FC<ImageGaleryProps> = ({ images }) => {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {images.map((pic, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex  items-center justify-center p-2">
                    <img src={pic} alt="Images" className="h-full w-full object-contain" />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="w-full h-[90px] flex items-center justify-center gap-2 border-2 border-blue-700 overflow-auto">
        {
          images.map((pic, index) => (
            <div key={index} className="h-[90%]">
              <img src={pic} alt="images" className="" />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ImageGalleryMobile;