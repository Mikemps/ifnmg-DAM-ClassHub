import axios from 'axios';

const API_TOKEN = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzQyMDg5NDg0LCJqdGkiOiI2ZjI0M2YyMS1jZDExLTQwNmEtYWZiMy04NTA3NjdmOTIwNmEiLCJ1c2VyX3V1aWQiOiI4Y2MxYTU5OS1kMGE2LTRhNTQtYWQ1NC1iMWRlNWI4NDEwMTcifQ.bx60sCl7-7WnijbAP30SWmleGHlJeUK-Vb5Cj0e80Cv3OZhnyEpUXS8MYpcXDtQSAmx4-RZKKe-I6Q0Z1WbDQw'; // Substitua pela sua API Key
const BASE_URL = 'https://calendly.com/event_types/user/me';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Função para buscar tipos de eventos
export const getEventTypes = async () => {
  try {
    const response = await api.get('/event_types');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tipos de eventos:', error);
    throw error;
  }
};

// Função para agendar um evento
export const scheduleEvent = async (eventTypeUri: string, inviteeEmail: string, date: string) => {
  try {
    const response = await api.post('/scheduled_events', {
      event_type_uri: eventTypeUri,
      invitee_email: inviteeEmail,
      start_time: date,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao agendar evento:', error);
    throw error;
  }
};

// Função para cancelar um evento
export const cancelEvent = async (eventUri: string) => {
  try {
    const response = await api.delete(`/scheduled_events/${eventUri}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao cancelar evento:', error);
    throw error;
  }
};

// Função para listar eventos agendados
export const getScheduledEvents = async () => {
  try {
    const response = await api.get('/scheduled_events');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar eventos agendados:', error);
    throw error;
  }
};