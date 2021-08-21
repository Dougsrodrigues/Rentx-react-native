import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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

export const ImageSlider: React.FC<ImageSliderProps> = ({ imageUrl }) => {
  if (!imageUrl) return <></>;

  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>

      <CarImageWrapper>
        <CarImage source={{ uri: imageUrl[0] }} resizeMode="contain" />
      </CarImageWrapper>
    </Container>
  );
};
