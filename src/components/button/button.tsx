import React from "react";
import { Text, Image, Pressable, PressableProps, StyleProp, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { themes } from "../../global/themes";

interface ButtonProps extends PressableProps {
  iconSource?: any;
  buttonText?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  isSelected?: boolean; // Nova propriedade para controlar o estado de seleção
}

export const Button: React.FC<ButtonProps> = ({
  iconSource,
  buttonText,
  buttonStyle,
  textStyle,
  iconStyle,
  isSelected = false, // Valor padrão é false
  ...props
}) => {
  return (
    <Pressable
      style={[
        buttonStyle,
        {
          backgroundColor: isSelected ? themes.colors.verdeEscuro : themes.colors.branco, // Cor de fundo baseada no estado de seleção
        },
      ]}
      {...props}
    >
      {iconSource && (
        <Image
          source={iconSource}
          style={[
            iconStyle,
            { tintColor: isSelected ? themes.colors.branco : themes.colors.verdeEscuro }, // Cor do ícone baseada no estado de seleção
          ]}
          resizeMode="contain"
          testID="button-icon"
        />
      )}
      {buttonText && (
        <Text
          style={[
            textStyle,
            { color: isSelected ? themes.colors.branco : themes.colors.verdeEscuro }, // Cor do texto baseada no estado de seleção
          ]}
        >
          {buttonText}
        </Text>
      )}
    </Pressable>
  );
};