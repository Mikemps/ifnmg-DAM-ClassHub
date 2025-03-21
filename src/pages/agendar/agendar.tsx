import React, { useState } from "react";
import { Text, View, Image, Modal, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/types";

import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { ptBR } from "../../utils/localeCalendarConfig";

import { themes } from "../../global/themes";
import { icons } from "../../global/icons";
import { style, calendarTheme } from "./styles";

import { Button } from "../../components/button/button";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export default function Agendar() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [pressionadoHorarios, setPressionadoHorarios] = useState<{ [key: string]: boolean }>({});
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
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
    setHorarioSelecionado(horario);
    setPressionadoHorarios((prev) => ({ ...prev, [horario]: true }));
  };

  const handlePressOut = (horario: string) => {
    setPressionadoHorarios((prev) => ({ ...prev, [horario]: false }));
  };

  return (
    <View style={style.container}>
      {/* Cabeçalho */}
      <View style={style.boxTop}>
        <Image source={icons.logo} style={style.logo} resizeMode="contain" />
      </View>

      <Image source={icons.linha} style={style.linhaCima} resizeMode="contain" />

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

      <Image source={icons.linha} style={style.linhaMeio} resizeMode="contain" />
      
      {/* Horários */}
      <ScrollView contentContainerStyle={style.horariosContainer}>
        <Text style={style.horariosTitle}>{themes.strings.textHorarios}</Text>
        <View style={style.horariosGrid}>
          {horarios.map((horario) => (
            <Pressable
              key={horario}
              style={({ pressed }) => [
                style.buttonHorarios,
                horarioSelecionado === horario && style.buttonHorariosSelected,
                {
                  backgroundColor:
                    pressed || horarioSelecionado === horario
                      ? themes.colors.verdeEscuro
                      : themes.colors.branco,
                },
              ]}
              onPressIn={() => handlePressIn(horario)}
              onPressOut={() => handlePressOut(horario)}
            >
              {({ pressed }) => (
                <Text
                  style={[
                    style.textMsgHorarios,
                    horarioSelecionado === horario && style.textMsgHorariosSelected,
                    {
                      color:
                        pressed || horarioSelecionado === horario
                          ? themes.colors.branco
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
            buttonText={themes.strings.agendar}
            buttonStyle={style.buttonAgendar}
            textStyle={style.agendarText}
            onPress={() => setModalVisible(true)}
          />
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
            <Text style={style.confirmaAgendamento}>{themes.strings.agendEfetuado}</Text>
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