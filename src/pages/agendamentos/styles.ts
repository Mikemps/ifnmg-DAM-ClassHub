import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themes.colors.verdeClaro,
  },

  boxTop: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },

  logo: {
    width: 45,
    height: 45,
    marginBottom: 15,
  },

  textAgendamentos: {
    fontSize: themes.font_size.g,
    fontWeight: '400',
    color: themes.colors.verdeEscuro,
    fontFamily: themes.fonts.jaro,
  },

  linhaCima: {
    width: '90%',
    height: 1,
    backgroundColor: themes.colors.verdeEscuro,
    marginTop: 10,
    marginBottom: 10,
  },

  boxButtonMessages: {
    width: '90%',
    marginBottom: 10,
    alignSelf: 'center',
  },

  buttonMessages: {
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonMessagesSelected: {
    backgroundColor: themes.colors.verdeEscuro,
  },

  textMsgAgendamentosSelected: {
    color: themes.colors.branco,
  },

  textMsgAgendamentos: {
    fontSize: themes.font_size.m,
    fontFamily: themes.fonts.jaro,
    marginLeft: 10,
    marginRight: 10,
  },

  horariosContainer: {
    width: '100%',
  },

  linhaBaixo: {
    width: '90%',
    height: 1,
    backgroundColor: themes.colors.verdeEscuro,
    marginTop: 20,
  },

  rodape: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 55,
  },

  buttonVoltar: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginRight: 10,
    elevation: 4,
  },

  Voltar: {
    width: 25,
    height: 38,
  },

  buttonCancelar: {
    width: 279,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.colors.branco,
    borderRadius: 30,
    elevation: 4,
  },

  textCancelarAgendamento: {
    fontSize: themes.font_size.m,
    color: themes.colors.verdeEscuro,
    fontFamily: themes.fonts.jaro,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.verdeClaro75,
  },

  modalContent: {
    width: '80%',
    backgroundColor: themes.colors.branco,
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
  },

  confirmaCancelamento: {
    fontSize: themes.font_size.m,
    fontFamily: themes.fonts.jaro,
    marginBottom: 20,
    textAlign: 'center',
  },

  verificado: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },

  modalButton: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 120,
  },

  confirma: {
    fontSize: themes.font_size.m,
    fontFamily: themes.fonts.jaro,
  },

  // Estilos para os agendamentos
  eventosList: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
  },

  eventoContainer: {
    width: '95%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: themes.colors.branco5, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },

  eventoSelecionado: {
    backgroundColor: themes.colors.verdeEscuro,
  },

  eventoContent: {
    flex: 1, 
  },

  eventoDate: {
    fontSize: themes.font_size.m,
    color: themes.colors.verdeEscuro,
    fontFamily: themes.fonts.jaro,
  },

  eventoTime: {
    fontSize: themes.font_size.m,
    color: themes.colors.verdeEscuro,
    fontFamily: themes.fonts.jaro,
    textAlign: 'right',
  },

  loadingText: {
    fontSize: themes.font_size.m,
    textAlign: 'center',
    color: themes.colors.verdeEscuro,
    fontFamily: themes.fonts.jaro,
  },

  errorText: {
    fontSize: themes.font_size.m,
    textAlign: 'center',
    fontFamily: themes.fonts.jaro,
  },

  noEventsText: {
    fontSize: themes.font_size.m,
    textAlign: 'center',
    color: themes.colors.verdeEscuro,
    fontFamily: themes.fonts.jaro,
  },
});