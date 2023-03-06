import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './styles';

export function Home() {
  const [participants, setParticipants] = useState<String[]>([])
  const [participantName, setParticipantName] = useState('')

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert('Participante já cadastrado', 'Já existe um participante na lista com esse nome.')
    }

    setParticipants(state => [...state, participantName])
    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remover ', `Remover o participante ${name} ?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(state => state.filter(participant => participant !== name)),
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022.
      </Text>

      <View style={styles.form}>
        <TextInput
          onChangeText={setParticipantName}
          value={participantName}
          style={styles.input}
          placeholder='Nome do Participante'
          placeholderTextColor='#6B6B6B'
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={item => item}
        data={participants}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participante a sua lista de presença.
          </Text>
        )}
      />


    </View>
  )
}