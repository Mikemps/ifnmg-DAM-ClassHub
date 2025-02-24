import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export const style = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themes.colors.verdeClaro,
  },

  // Cabeçalho
  boxTop: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },

  // Logo
  logo: {
    width: 45,
    height: 45,
  },

  linhaCima: {
    width: '90%',
    height: 1.1,
    backgroundColor: themes.colors.verdeEscuro,
    top: 54, 
  },

  // Calendário
  boxCalendar: {
    width: '100%',
    alignItems: 'center',
  },

  calendar: {
    width: 360,
  },

  arrowContainer: {
    backgroundColor: themes.colors.branco8, 
    borderRadius: 15, 
    width: 40, 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 3,
  },

  // Linha horizontal (meio)
  linhaMeio: {
    width: '90%',
    height: 1,
    backgroundColor: themes.colors.verdeEscuro,
  },

  // Horários
  horariosContainer: {
    width: '100%',
    alignItems: 'center',
  },

  horariosTitle: {
    fontSize: 24,
    fontWeight: '400',
    color: themes.colors.verdeEscuro,
    fontFamily: themes.fonts.main,
    marginTop: 25,
  },

  horariosGrid: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  buttonHorarios: {
    width: '48%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 25,
    elevation: 4,
  },

  textMsgHorarios: {
    fontSize: 20,
    fontFamily: themes.fonts.main,
  },

  buttonHorariosSelected: {
    backgroundColor: themes.colors.verdeEscuro, 
  },

  textMsgHorariosSelected: {
    color: themes.colors.branco8, 
  },

  // Rodapé
  rodape: {
    position: 'absolute', 
    bottom: 50, 
    width: '100%',
    alignItems: 'center',
    paddingBottom: 5, 
    backgroundColor: themes.colors.verdeClaro, 
  },

  linhaBaixo: {
    width: '90%',
    height: 1,
    backgroundColor: themes.colors.verdeEscuro,
    marginTop: 10,
  },

  buttonVoltar: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.colors.branco8,
    borderRadius: 30,
    marginRight: 10,
    elevation: 4,
  },

  Voltar: {
    width: 25,
    height: 38,
  },

  buttonAgendar: {
    width: 279,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.colors.branco8,
    borderRadius: 30,
    elevation: 4,
  },

  agendarText: {
    fontSize: 20,
    color: themes.colors.verdeEscuro,
    fontFamily: themes.fonts.main,
  },

  // Modal de confirmação
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.verdeClaro75,
  },

  modalContent: {
    width: '80%',
    backgroundColor: themes.colors.branco8,
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
  },

  confirmaAgendamento: {
    fontSize: 20,
    color: themes.colors.verdeEscuro,
    fontFamily: themes.fonts.main,
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
    backgroundColor: themes.colors.branco8,
    borderRadius: 30,
    marginTop: 120, 
  },

  confirma: {
    fontSize: 20,
    color: themes.colors.verdeEscuro,
    fontFamily: themes.fonts.main,
  },
});

// Tema do calendário
export const calendarTheme = {
  calendarBackground: "transparent",
  textSectionTitleColor: themes.colors.verdeEscuro5,
  selectedDayBackgroundColor: themes.colors.verdeEscuro,
  selectedDayTextColor: themes.colors.branco8,
  todayTextColor: themes.colors.verdeEscuro,
  dayTextColor: themes.colors.verdeEscuro,
  arrowColor: themes.colors.verdeEscuro,
  monthTextColor: themes.colors.verdeEscuro,
  indicatorColor: themes.colors.verdeEscuro,
  textDayStyle: { color: themes.colors.verdeEscuro},
  textDisabledColor: themes.colors.verdeEscuro5,
  arrowStyle: {
    margin: 0,
    padding: 0,
  },
  //textDayFontFamily: themes.fonts.main,
  textMonthFontFamily: themes.fonts.main,
  //textDayHeaderFontFamily: themes.fonts.main,
  textDayFontSize: 16,
  textMonthFontSize: 20,
  textDayHeaderFontSize: 15,
  
};
