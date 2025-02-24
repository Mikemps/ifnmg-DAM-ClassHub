import React, { useState } from "react";
import { Text, View, Image, Pressable, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/types";

import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { Feather } from "@expo/vector-icons";

import { ptBR } from "../../utils/localeCalendarConfig";

import { themes } from "../../global/themes";
import { style, calendarTheme } from "./styles";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

import Logo from "../../../assets/logo.png";
import LinhaMeio from "../../../assets/Line.png";
import LinhaBaixo from "../../../assets/Line.png";
import LinhaCima from "../../../assets/Line.png";
import Voltar from "../../../assets/voltar.png";
import Verificado from "../../../assets/verificacao.png";

export default function Agendar() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [pressionadoAgendar, setPressionadoAgendar] = useState<boolean>(false);
  const [pressionadoVoltar, setPressionadoVoltar] = useState<boolean>(false);
  const [pressionadoConfirmar, setPressionadoConfirmar] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [pressionadoHorarios, setPressionadoHorarios] = useState<{ [key: string]: boolean }>({});
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null); // Estado para o horário selecionado
  const [day, setDay] = useState<DateData>();

  const horarios: (keyof typeof themes.strings)[] = [
    "horario1",
    "horario2",
    "horario3",
    "horario4",
    "horario5",
    "horario6",
  ];

  const handlePressIn = (horario: string) => {
    setHorarioSelecionado(horario); // Define o horário selecionado
    setPressionadoHorarios((prev) => ({ ...prev, [horario]: true }));
  };

  const handlePressOut = (horario: string) => {
    setPressionadoHorarios((prev) => ({ ...prev, [horario]: false }));
  };

  return (
    <View style={style.container}>
      {/* Cabeçalho */}
      <View style={style.boxTop}>
        <Image source={Logo} style={style.logo} resizeMode="contain" />
      </View>
      <Image source={LinhaCima} style={style.linhaCima} resizeMode="contain" />

      {/* Calendário */}
      <View style={style.boxCalendar}>
        <Calendar
          style={style.calendar}
          renderArrow={(direction: "right" | "left") => (
            <View style={style.arrowContainer}>
              <Feather size={35} color="#00350E" name={`chevron-${direction}`} />
            </View>
          )}
          theme={calendarTheme}
          minDate={new Date().toDateString()}
          onDayPress={setDay}
          markedDates={day ? { [day.dateString]: { selected: true } } : {}}
        />
      </View>

      {/* Horários */}
      <View style={style.horariosContainer}>
        <Image source={LinhaMeio} style={style.linhaMeio} resizeMode="contain" />
        <Text style={style.horariosTitle}>{themes.strings.textHorarios}</Text>
        <View style={style.horariosGrid}>
          {horarios.map((horario) => (
            <Pressable
              key={horario}
              style={({ pressed }) => [
                style.buttonHorarios,
                horarioSelecionado === horario && style.buttonHorariosSelected, // Aplica o estilo selecionado
                {
                  backgroundColor:
                    pressed || horarioSelecionado === horario
                      ? themes.colors.verdeEscuro
                      : themes.colors.branco8,
                },
              ]}
              onPressIn={() => handlePressIn(horario)}
              onPressOut={() => handlePressOut(horario)}
            >
              {({ pressed }) => (
                <Text
                  style={[
                    style.textMsgHorarios,
                    horarioSelecionado === horario && style.textMsgHorariosSelected, // Aplica o estilo selecionado
                    {
                      color:
                        pressed || horarioSelecionado === horario
                          ? themes.colors.branco8
                          : themes.colors.verdeEscuro,
                    },
                  ]}
                >
                  {themes.strings[horario]}
                </Text>
              )}
            </Pressable>
          ))}
        </View>
      </View>

      {/* Rodapé */}
      <View style={style.rodape}>
        <Image source={LinhaBaixo} style={style.linhaBaixo} resizeMode="contain" />
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
              style.buttonAgendar,
              {
                backgroundColor: pressed ? themes.colors.verdeEscuro : themes.colors.branco8,
              },
            ]}
            onPressIn={() => setPressionadoAgendar(true)}
            onPressOut={() => setPressionadoAgendar(false)}
            onPress={() => setModalVisible(true)}
          >
            {({ pressed }) => (
              <Text
                style={[
                  style.agendarText,
                  { color: pressed ? themes.colors.branco8 : themes.colors.verdeEscuro },
                ]}
              >
                {themes.strings.agendarText}
              </Text>
            )}
          </Pressable>
        </View>
      </View>

      {/* Modal de Confirmação */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={style.modalOverlay}>
          <View style={style.modalContent}>
            <Text style={style.confirmaAgendamento}>{themes.strings.confirmaAgendamento}</Text>
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