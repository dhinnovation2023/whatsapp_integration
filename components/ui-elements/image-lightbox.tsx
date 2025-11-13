'use client';

import { Dispatch, SetStateAction } from "react";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"

const ImageLightbox = ({
    isOpen,
    setIsOpen,
    images,
}: {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    images: SlideImage[],
}) => {

  return (
    <>
        <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={images}
        />
    </>
  )
}

export default ImageLightbox