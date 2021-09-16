import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";
import { PhotosEntity } from "../../dtos/CarDTO";
import { Bullet } from "../Bullet";
import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from "./styles";

interface ImageSliderProps {
  imageUrl?: PhotosEntity[] | null;
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ imageUrl }) => {
  const [imageIndex, setImageIndex] = useState(0);

  if (!imageUrl) return <></>;

  const indexChange = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;

    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imageUrl.map((item, index) => (
          <Bullet active={index === imageIndex} key={String(item.id)} />
        ))}
      </ImageIndexes>

      <FlatList
        horizontal
        onViewableItemsChanged={indexChange.current}
        showsHorizontalScrollIndicator={false}
        data={imageUrl}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item.photo }} resizeMode="contain" />
          </CarImageWrapper>
        )}
      />
    </Container>
  );
};
