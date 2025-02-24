import React, { useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/types";

import { themes } from "../../global/themes";
import { style } from "./styles";

import Logo from "../../../assets/logo.png";
import IconApple from "../../../assets/Apple.png";
import IconGmail from "../../../assets/logos_google-gmail.png";

export default function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [pressionadoGmail, setPressionadoGmail] = useState<boolean>(false);
  const [pressionadoApple, setPressionadoApple] = useState<boolean>(false);

  return (
    <View style={style.container}>
      {/* Cabeçalho */}
      <View style={style.boxTop}>
        <Image source={Logo} style={style.logo} resizeMode="contain" />
      </View>

      {/* Botão Gmail */}
      <View style={style.boxBotton1}>
        <Pressable
          style={({ pressed }) => [
            style.button1,
            {
              backgroundColor: pressed ? themes.colors.verdeEscuro : themes.colors.branco8,
            },
          ]}
          onPressIn={() => setPressionadoGmail(true)}
          onPressOut={() => setPressionadoGmail(false)}
          onPress={() => navigation.navigate('Menu')}
        >
          {({ pressed }) => ( <>
              <Image
                source={IconGmail}
                style={{
                  width: 30,
                  height: 23,
                  marginRight: 10,
                  left: 5,
                  tintColor: pressed ? themes.colors.branco8 : themes.colors.verdeEscuro,
                }}
                resizeMode="contain"
              />
              <Text
                style={[
                  style.textGmail,
                  { color: pressed ? themes.colors.branco8 : themes.colors.verdeEscuro },
                ]}
              >
                {themes.strings.textGmail}
              </Text>
            </>
          )}
        </Pressable>
      </View>

      {/* Botão Apple */}
      <View style={style.boxBotton2}>
        <Pressable
          style={({ pressed }) => [
            style.button2,
            {
              backgroundColor: pressed ? themes.colors.verdeEscuro : themes.colors.branco8,
            },
          ]}
          onPressIn={() => setPressionadoApple(true)}
          onPressOut={() => setPressionadoApple(false)}
          onPress={() => navigation.navigate('Menu')}
        >
          {({ pressed }) => ( <>
              <Image
                source={IconApple}
                style={{
                  width: 30,
                  height: 28,
                  marginRight: 10,
                  left: 5,
                  tintColor: pressed ? themes.colors.branco8 : themes.colors.verdeEscuro,
                }}
                resizeMode="contain"
              />
              <Text
                style={[
                  style.textAppleID,
                  { color: pressed ? themes.colors.branco8 : themes.colors.verdeEscuro },
                ]}
              >
                {themes.strings.textAppleID}
              </Text>
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}