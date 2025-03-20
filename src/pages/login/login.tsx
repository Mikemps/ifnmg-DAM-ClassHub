<<<<<<< Updated upstream
import React, { useState } from "react";
import { View } from "react-native";

import { themes } from "../../global/themes";
import { styles } from "./styles";

=======
import React from "react";
import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/types";

import { themes } from "../../global/themes";
import { icons } from "../../global/icons";
import { style } from "./styles";

import { Button } from "../../components/button/button"; 
>>>>>>> Stashed changes
export default function Login() {
  
    return (
        <View style={styles.container}>

<<<<<<< Updated upstream
        </View>
    );
=======
  return (
    <View style={style.container}>
      {/* Cabeçalho */}
      <View style={style.boxTop}>
        <Image source={icons.logo} style={style.logo} resizeMode="contain" />
      </View>

      {/* Botão Gmail */}
      <View style={style.boxBotton}>
        <Button
          iconSource={icons.gmail}
          buttonText={themes.strings.gmail}
          buttonStyle={style.button1}
          textStyle={style.textGmail}
          iconStyle={style.icon}
          onPress={() => navigation.navigate("Menu")}
        />
      </View>

      {/* Botão Apple */}
      <View style={style.boxBotton}>
        <Button
          iconSource={icons.apple}
          buttonText={themes.strings.appleID}
          buttonStyle={style.button2}
          textStyle={style.textAppleID}
          iconStyle={style.icon}
          onPress={() => navigation.navigate("Menu")}
        />
      </View>
    </View>
  );
>>>>>>> Stashed changes
}