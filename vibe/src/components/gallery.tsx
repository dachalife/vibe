import { useState } from "react";
import PhotoAlbum, { Photo, RenderPhoto } from "react-photo-album";

const photos: ExtendedPhoto[] = [
  {
    key: "photo1",
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 4,
    height: 3,
    selected: false,
  },
  {
    key: "photo2",
    src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    width: 1,
    height: 1,
    selected: false,
  },
  {
    key: "photo3",
    src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    width: 3,
    height: 4,
    selected: false,
  },
  {
    key: "photo4",
    src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    width: 3,
    height: 4,
    selected: false,
  },
  {
    key: "photo5",
    src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
    width: 3,
    height: 4,
    selected: false,
  },
  {
    key: "photo6",
    src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
    width: 4,
    height: 3,
    selected: false,
  },
];

interface ExtendedPhoto extends Photo {
  selected: boolean;
}

export default function Vibe() {
  const [photoList, setPhotoList] = useState(photos);

  function toggleImageClick(photoKey: string | undefined) {
    console.log(photoKey);
    if (photoKey === undefined) return;
    setPhotoList(
      photoList.map((photo) => {
        if (photo.key === photoKey) {
          // Create a *new* object with changes
          return { ...photo, selected: !photo.selected };
        } else {
          // No changes
          return photo;
        }
      })
    );
  }

  const renderPhoto: RenderPhoto<ExtendedPhoto> = ({
    photo,
    imageProps: { alt, style, ...restImageProps },
  }) => (
    <div
      style={{
        position: "relative",
        top: "0",
        left: "0",
      }}
    >
      <img
        alt={alt}
        style={{
          ...style,
          position: "relative",
          top: "0",
          left: "0",
        }}
        {...restImageProps}
      />
      {photo.selected && (
        <svg
          style={{
            position: "absolute",
            top: "2px",
            right: "2px",
            width: "20px",
            height: "20px",
            fill: "green",
            filter: "drop-shadow(0 0 5px white)",
          }}
          viewBox="0 0 24 24"
        >
          <path d="M9 21.172l-5.172-5.171 2.828-2.828l2.344 2.343 7.086-7.086l2.828 2.828z"></path>
        </svg>
      )}
    </div>
  );
  const sortedPhotoList = photoList.sort(
    (a, b) => (b.selected ? 1 : 0) - (a.selected ? 1 : 0)
  );
  return (
    <>
      <div>
        <label>Choose 1 - 10 images that match your ideal trip aesthetic</label>
      </div>
      <div id="selectedphotos">
        <PhotoAlbum<ExtendedPhoto>
          layout="masonry"
          spacing={0}
          padding={2}
          photos={sortedPhotoList}
          onClick={({ photo }) => {
            toggleImageClick(photo.key);
          }}
          renderPhoto={renderPhoto}
        />
      </div>
    </>
  );
}
