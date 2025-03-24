import React, { useState, useEffect } from "react";
import { Text, View, Image, Modal, ScrollView, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/types";

import { themes } from "../../global/themes";
import { icons } from "../../global/icons";
import { style } from "./styles"; // Importando os estilos

import { Button } from "../../components/button/button";
import { cancelEvent, getScheduledEvents, getCurrentUser } from "../../../services/calendlyService";

interface Evento {
  uri: string;
  name: string;
  start_time: string;
  end_time: string;
  event_type: string;
  invitees_counter: number;
  location: {
    type: string;
    location: string;
  };
  created_at: string;
  updated_at: string;
  status: string;
}

// Função para formatar a data e hora
const formatDate = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const optionsDate: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDate = date.toLocaleDateString("pt-BR", optionsDate);
  const formattedTime = date.toLocaleTimeString("pt-BR", optionsTime) + "h";

  return { formattedDate, formattedTime };
};

export default function Agendamentos() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [eventoSelecionado, setEventoSelecionado] = useState<string | null>(null);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isCanceling, setIsCanceling] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Carrega os eventos agendados
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setError(null);
      try {
        const userData = await getCurrentUser();
        const data = await getScheduledEvents(userData.resource.uri, { count: 50 });
  
        // Filtra os eventos cancelados e os eventos que já passaram
        const eventosAtivos = data.collection.filter((evento: Evento) => {
          const eventoCancelado = evento.status === "canceled";
          const eventoJaPassou = new Date(evento.end_time) < new Date(); // Verifica se o evento já terminou
  
          return !eventoCancelado && !eventoJaPassou; // Mantém apenas eventos ativos e não passados
        });
  
        setEventos(eventosAtivos as Evento[]);
      } catch (error: any) {
        console.error("Erro ao buscar eventos:", error.response?.data || error.message);
        setError("Erro ao buscar eventos. Tente novamente.");
        Alert.alert("Erro", "Erro ao buscar eventos. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    }
  
    loadData();
  }, []);
  
  const handleCancelarEvento = async () => {
    if (!eventoSelecionado) {
      Alert.alert("Atenção", "Nenhum evento selecionado.");
      return;
    }
  
    if (isCanceling) return; // Evita múltiplos cliques
    setIsCanceling(true);
  
    try {
      const eventUuid = eventoSelecionado.substring(eventoSelecionado.lastIndexOf('/') + 1).trim();
      await cancelEvent(eventUuid, "Cancelado pelo usuário");
  
      // Atualiza a lista de eventos após o cancelamento
      const userData = await getCurrentUser();
      const data = await getScheduledEvents(userData.resource.uri, { count: 50 });
      const eventosAtivos = data.collection.filter((evento: Evento) => evento.status !== "canceled");
  
      setEventos(eventosAtivos as Evento[]);
      setModalVisible(false);
      Alert.alert("Sucesso", "Evento cancelado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao cancelar evento:", error.response?.data || error.message);
      if (error.response?.data?.title === "Permission Denied" && error.response?.data?.message === "Event is already canceled") {
        Alert.alert("Atenção", "Este evento já foi cancelado.");
      } else {
        Alert.alert("Erro", "Erro ao cancelar evento. Tente novamente.");
      }
    } finally {
      setIsCanceling(false);
    }
  };

  {/* Renderiza cada evento na lista */}
  const renderEvento = (evento: Evento) => {
    const { formattedDate, formattedTime } = formatDate(evento.start_time);

    return (
      <Pressable
        key={evento.uri}
        style={({ pressed }) => [
          style.eventoContainer,
          eventoSelecionado === evento.uri && style.eventoSelecionado,
          {
            backgroundColor:
              pressed || eventoSelecionado === evento.uri
                ? themes.colors.verdeEscuro
                : themes.colors.branco5,
          },
        ]}
        onPress={() => setEventoSelecionado(evento.uri)}
      >
        {({ pressed }) => (
          <>
            <Text
              style={[
                style.eventoDate,
                (eventoSelecionado === evento.uri || pressed) && { color: themes.colors.branco },
              ]}
            >
              {formattedDate}
            </Text>
            <Text
              style={[
                style.eventoTime,
                (eventoSelecionado === evento.uri || pressed) && { color: themes.colors.branco },
              ]}
            >
              {formattedTime}
            </Text>
          </>
        )}
      </Pressable>
    );
  };

  const isCancelarButtonDisabled = !eventoSelecionado || isCanceling;

  return (
    <View style={style.container}>
      {/* Cabeçalho */}
      <View style={style.boxTop}>
        <Image source={icons.logo} style={style.logo} resizeMode="contain" />
        <Text style={style.textAgendamentos}>{themes.strings.agendamentos}</Text>
        <Image source={icons.linha} style={style.linhaCima} resizeMode="contain" />
      </View>

      {/* Lista de eventos */}
      <ScrollView
        contentContainerStyle={style.eventosList}
        showsVerticalScrollIndicator={false} 
      >
        {isLoading ? (
          <Text style={style.loadingText}>Carregando eventos...</Text>
        ) : error ? (
          <Text style={style.errorText}>{error}</Text>
        ) : eventos.length > 0 ? (
          eventos.map(renderEvento)
        ) : (
          <Text style={style.noEventsText}>Nenhum evento agendado.</Text>
        )}
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
            buttonStyle={[
              style.buttonCancelar,
              { opacity: isCancelarButtonDisabled ? 0.5 : 1 },
            ]}
            textStyle={style.textCancelarAgendamento}
            onPress={() => setModalVisible(true)}
            disabled={isCancelarButtonDisabled}
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
            onPress={handleCancelarEvento}
          />
        </View>
      </Modal>
    </View>
  );
}