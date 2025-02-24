import React, { useState } from "react";
import { Text, View, Image, Modal, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/types";

import { themes } from "../../global/themes";
import { style } from "./styles";

import Logo from "../../../assets/logo.png";
import Linha from "../../../assets/Line.png";
import Voltar from "../../../assets/voltar.png";
import Verificado from "../../../assets/verificacao.png";

export default function Agendamentos() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [pressionadoCancelar, setPressionadoCancelar] = useState<boolean>(false);
  const [pressionadoVoltar, setPressionadoVoltar] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [pressionadoMessages, setPressionadoMessages] = useState<{ [key: string]: boolean }>({});
  const [pressionadoConfirmar, setPressionadoConfirmar] = useState<boolean>(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null); // Estado para o horário selecionado

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
        <Image source={Logo} style={style.logo} resizeMode="contain" />
        <Text style={style.textAgendamentos}>{themes.strings.textAgendamentos}</Text>
        <Image source={Linha} style={style.linhaCima} resizeMode="contain" />
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
                          ? themes.colors.branco8
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
        <Image source={Linha} style={style.linhaBaixo} resizeMode="contain" />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <Pressable
            style={({ pressed }) => [
              style.buttonVoltar,
              {
                backgroundColor: pressed ? themes.colors.verdeEscuro : themes.colors.branco8,
              },
            ]}
            onPressIn={() => setPressionadoVoltar(true)}
            onPressOut={() => setPressionadoVoltar(false)}
            onPress={() => navigation.navigate("Menu")}
          >
            {({ pressed }) => (
              <Image
                source={Voltar}
                resizeMode="contain"
                style={[
                  style.Voltar,
                  { tintColor: pressed ? themes.colors.branco8 : themes.colors.verdeEscuro },
                ]}
              />
            )}
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              style.buttonCancelar,
              {
                backgroundColor: pressed ? themes.colors.verdeEscuro : themes.colors.branco8,
              },
            ]}
            onPressIn={() => setPressionadoCancelar(true)}
            onPressOut={() => setPressionadoCancelar(false)}
            onPress={() => setModalVisible(true)}
          >
            {({ pressed }) => (
              <Text
                style={[
                  style.textCancelarAgendamento,
                  { color: pressed ? themes.colors.branco8 : themes.colors.verdeEscuro },
                ]}
              >
                {themes.strings.textCancelarAgendamento}
              </Text>
            )}
          </Pressable>
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
            <Text style={style.confirmaCancelamento}>{themes.strings.confirmaCancelamento}</Text>

            <Image source={Verificado} style={style.verificado} resizeMode="contain" />
          </View>
          <Pressable
            style={({ pressed }) => [
              style.modalButton,
              {
                backgroundColor: pressed ? themes.colors.verdeEscuro : themes.colors.branco8,
              },
            ]}
            onPressIn={() => setPressionadoConfirmar(true)}
            onPressOut={() => setPressionadoConfirmar(false)}
            onPress={() => setModalVisible(false)}
          >
            {({ pressed }) => (
              <Text
                style={[
                  style.confirma,
                  { color: pressed ? themes.colors.branco8 : themes.colors.verdeEscuro },
                ]}
              >
                {themes.strings.confirma}
              </Text>
            )}
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}