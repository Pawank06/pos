import { Image, ImageSourcePropType, View } from "react-native";

export const CustomIcon = ({
    source,
    width,
    height
  }: {
    source: ImageSourcePropType;
    width?: number;
    height?: number;
  }) => (
        <Image
          source={source}
          tintColor="white"
          resizeMode="contain"
          width={width}
          height={height}
        />

  );
