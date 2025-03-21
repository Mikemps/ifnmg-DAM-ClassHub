import React from "react";
import { Text, Image, Pressable, PressableProps, StyleProp, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { themes } from "../../global/themes";

interface ButtonProps extends PressableProps {
  iconSource?: any;
  buttonText?: string; 
  buttonStyle?: StyleProp<ViewStyle>; 
  textStyle?: StyleProp<TextStyle>; 
  iconStyle?: StyleProp<ImageStyle>; 
}

export const Button: React.FC<ButtonProps> = ({
  iconSource,
  buttonText,
  buttonStyle,
  textStyle,
  iconStyle,
  ...props
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyle,
        {
          backgroundColor: pressed ? themes.colors.verdeEscuro : themes.colors.branco, 
        },
      ]}
      {...props}
    >
      {({ pressed }) => ( <>
          {iconSource && (
            <Image
              source={iconSource}
              style={[
                iconStyle,
                { tintColor: pressed ? themes.colors.branco : themes.colors.verdeEscuro }, 
              ]}
              resizeMode="contain"
              testID="button-icon"
            />
          )}
          {buttonText && (
            <Text
              style={[
                textStyle,
                { color: pressed ? themes.colors.branco : themes.colors.verdeEscuro },
              ]}
            >
              {buttonText}
            </Text>
          )}
        </>
      )}
    </Pressable>
  );
};