import React, { useState } from "react";
import { Text, View, Image, Modal, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/types";

import { themes } from "../../global/themes";
import { icons } from "../../global/icons";
import { style } from "./styles";

import { Button } from "../../components/button/button"; 

export default function Agendamentos() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [pressionadoMessages, setPressionadoMessages] = useState<{ [key: string]: boolean }>({});
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);

  // Define o tipo de `messages` como as chaves válidas de `themes.strings`
  const messages: (keyof typeof themes.strings)[] = [
    "message1",
    "message2",
    "message3",
    "message4",
    "message5",
    "message6",
    "message7",
    "message8",
  ];

  const handlePressIn = (message: string) => {
    setHorarioSelecionado(message);
    setPressionadoMessages((prev) => ({ ...prev, [message]: true }));
  };

  const handlePressOut = (message: string) => {
    setPressionadoMessages((prev) => ({ ...prev, [message]: false }));
  };

  return (
    <View style={style.container}>
      {/* Cabeçalho */}
      <View style={style.boxTop}>
        <Image source={icons.logo} style={style.logo} resizeMode="contain" />
        <Text style={style.textAgendamentos}>{themes.strings.agendamentos}</Text>
        <Image source={icons.linha} style={style.linhaCima} resizeMode="contain" />
      </View>

      {/* Lista de horários */}
      <ScrollView contentContainerStyle={style.horariosContainer}>
        {messages.map((message) => (
          <View key={message} style={style.boxButtonMessages}>
            <Pressable
              style={({ pressed }) => [
                style.buttonMessages,
                horarioSelecionado === message && style.buttonMessagesSelected,
                {
                  backgroundColor:
                    pressed || horarioSelecionado === message
                      ? themes.colors.verdeEscuro
                      : themes.colors.branco5,
                },
              ]}
              onPressIn={() => handlePressIn(message)}
              onPressOut={() => handlePressOut(message)}
            >
              {({ pressed }) => (
                <Text
                  style={[
                    style.textMsgAgendamentos,
                    horarioSelecionado === message && style.textMsgAgendamentosSelected,
                    {
                      color:
                        pressed || horarioSelecionado === message
                          ? themes.colors.branco
                          : themes.colors.verdeEscuro,
                    },
                  ]}
                >
                  {themes.strings[message]}
                </Text>
              )}
            </Pressable>
          </View>
        ))}
      </ScrollView>

      {/* Rodapé */}
      <View style={style.rodape}>
        <Image source={icons.linha} style={style.linhaBaixo} resizeMode="contain" />
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
          <Button
            iconSource={icons.voltar}
            buttonStyle={style.buttonVoltar}
            iconStyle={style.Voltar}
            onPress={() => navigation.navigate("Menu")}
          />

          <Button
            buttonText={themes.strings.cancelarAge}
            buttonStyle={style.buttonCancelar}
            textStyle={style.textCancelarAgendamento}
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>

      {/* Modal de confirmação */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={style.modalOverlay}>
          <View style={style.modalContent}>
            <Text style={style.confirmaCancelamento}>{themes.strings.agendCancelado}</Text>
            <Image source={icons.verificado} style={style.verificado} resizeMode="contain" />
          </View>

          <Button
            buttonText={themes.strings.confirmar}
            buttonStyle={style.modalButton}
            textStyle={style.confirma}
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
}