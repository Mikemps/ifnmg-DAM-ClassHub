import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes'; // Certifique-se de que o caminho está correto

export const style = StyleSheet.create({
    // Container principal
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: themes.colors.verdeClaro,
    },

    // Cabeçalho: Logo, texto "Agendamentos" e linha de cima
    boxTop: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50, // Espaço no topo
    },

    // Logo
    logo: {
        width: 45,
        height: 45,
        marginBottom: 15, 
    },

    // Texto "Agendamentos"
    textAgendamentos: {
        fontSize: 24,
        fontWeight: '400',
        color: themes.colors.verdeEscuro,
        fontFamily: themes.fonts.main,
    },

    // Linha horizontal (cima)
    linhaCima: {
        width: '90%', // 90% da largura da tela
        height: 1, // Altura da linha
        backgroundColor: themes.colors.verdeEscuro, // Cor da linha
        marginTop: 10, // Espaço abaixo do texto "Agendamentos"
        marginBottom: 10, // Espaço acima dos horários
    },

    // Container dos botões de horários
    boxButtonMessages: {
        width: '90%', // 90% da largura da tela
        marginBottom: 10, // Espaço entre os horários
        alignSelf: 'center', // Centraliza horizontalmente
    },

    // Botão de horário (com laterais arredondadas)
    buttonMessages: {
        width: '100%', // Ocupa toda a largura do container
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonMessagesSelected: {
        backgroundColor: themes.colors.verdeEscuro, 
    },
      
    textMsgAgendamentosSelected: {
        color: themes.colors.branco8, 
    },
    // Texto dentro do botão de horário
    textMsgAgendamentos: {
        fontSize: 20,
        fontFamily: themes.fonts.main,
        marginLeft: 10,
        marginRight: 10,
    },

    // Container da lista de horários (centralizado com espaço maior abaixo)
    horariosContainer: {
        width: '100%',
    },

    // Linha horizontal (baixo)
    linhaBaixo: {
        width: '90%', // 90% da largura da tela
        height: 1, // Altura da linha
        backgroundColor: themes.colors.verdeEscuro, // Cor da linha
        marginTop: 20, // Espaço acima da linha
    },

    // Container do rodapé (linha de baixo e botões)
    rodape: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 55, // Espaço no rodapé
    },

    // Botão "Voltar"
    buttonVoltar: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.branco8,
        borderRadius: 30, // Botão redondo
        marginRight: 10, // Espaço entre os botões
        elevation: 4, // Sombra no Android
    },

    // Ícone dentro do botão "Voltar"
    Voltar: {
        width: 25,
        height: 38,
    },

    // Botão "Cancelar Agendamento"
    buttonCancelar: {
        width: 279, // Largura fixa para o botão "Cancelar Agendamento"
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.branco8,
        borderRadius: 30, // Bordas arredondadas
        elevation: 4, // Sombra no Android
    },

    // Texto dentro do botão "Cancelar Agendamento"
    textCancelarAgendamento: {
        fontSize: 20,
        color: themes.colors.verdeEscuro,
        fontFamily: themes.fonts.main,
    },

    // Modal de confirmação
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themes.colors.verdeClaro75, // Fundo escuro semi-transparente
    },

    modalContent: {
        width: '80%', // 80% da largura da tela
        backgroundColor: themes.colors.branco8,
        borderRadius: 30,
        padding: 20,
        alignItems: 'center',
    },

    // Texto de confirmação no modal
    confirmaCancelamento: {
        fontSize: 20,
        color: themes.colors.verdeEscuro,
        fontFamily: themes.fonts.main,
        marginBottom: 20, // Espaço abaixo da mensagem
        textAlign: 'center', // Centraliza o texto
    },

    // Ícone de verificação no modal
    verificado: {
        width: 50,
        height: 50,
        marginBottom: 20, // Espaço abaixo do ícone
    },

    // Botão de confirmação no modal
    modalButton: {
        width: 60, // Ocupa toda a largura do modal
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.branco8,
        borderRadius: 30,
        marginTop: 120, // Espaço acima do botão
    },

    // Texto dentro do botão de confirmação no modal
    confirma: {
        fontSize: 20,
        color: themes.colors.verdeEscuro,
        fontFamily: themes.fonts.main,
    },
});