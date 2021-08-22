import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";
import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from "./styles";

interface ImageSliderProps {
  imageUrl?: string[] | null;
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
        {imageUrl.map((_, index) => (
          <ImageIndex active={index === imageIndex} key={String(index)} />
        ))}
      </ImageIndexes>

      <FlatList
        horizontal
        onViewableItemsChanged={indexChange.current}
        showsHorizontalScrollIndicator={false}
        data={imageUrl}
        keyExtractor={(key) => key}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarImageWrapper>
        )}
      />
    </Container>
  );
};
