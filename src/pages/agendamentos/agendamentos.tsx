import React, { useState, useEffect } from "react";
import { Text, View, Image, Modal, ScrollView, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/types";

import { themes } from "../../global/themes";
import { icons } from "../../global/icons";
import { style } from "./styles";

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
}

const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export default function Agendamentos() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [eventoSelecionado, setEventoSelecionado] = useState<string | null>(null);
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [isCanceling, setIsCanceling] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            setError(null);
            try {
                const userData = await getCurrentUser();
                const data = await getScheduledEvents(userData.resource.uri);
                setEventos(data.collection as Evento[]);
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
        if (!eventoSelecionado || isCanceling) {
            return;
        }

        setIsCanceling(true);

        try {
            const eventUuid = eventoSelecionado.substring(eventoSelecionado.lastIndexOf('/') + 1).trim();
            console.log("UUID do evento:", eventUuid);

            await cancelEvent(eventUuid, "Cancelado pelo usuário");
            setEventos(prevEventos => prevEventos.filter(evento => evento.uri !== eventoSelecionado));

            setModalVisible(false);
            Alert.alert("Sucesso", "Evento cancelado com sucesso!");
        } catch (error: any) {
            console.error("Erro ao cancelar evento:", error.response?.data || error.message);
            Alert.alert("Erro", "Erro ao cancelar evento. Tente novamente.");
            setModalVisible(false);
        } finally {
            setIsCanceling(false);
        }
    };

    const renderEvento = (evento: Evento) => {
        const startTime = new Date(evento.start_time);
        const formattedDate = startTime.toLocaleDateString('pt-BR');
        const formattedTime = startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        return (
            <Pressable
                key={evento.uri}
                style={({ pressed }) => [
                    style.buttonMessages,
                    eventoSelecionado === evento.uri && style.buttonMessagesSelected,
                    {
                        backgroundColor:
                            pressed || eventoSelecionado === evento.uri
                                ? themes.colors.verdeEscuro
                                : themes.colors.branco5,
                    },
                ]}
                onPress={() => setEventoSelecionado(evento.uri)}
            >
                <Text
                    style={[
                        style.textMsgAgendamentos,
                        eventoSelecionado === evento.uri && style.textMsgAgendamentosSelected,
                        {
                            color:
                                eventoSelecionado === evento.uri
                                    ? themes.colors.branco
                                    : themes.colors.verdeEscuro,
                        },
                    ]}
                >
                    {evento.name} - {formattedDate} às {formattedTime}
                </Text>
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
            <ScrollView contentContainerStyle={style.horariosContainer}>
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