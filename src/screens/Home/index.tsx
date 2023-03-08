import { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert, Button, Modal } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Participant } from '../../components/Participant';

import { styles } from './styles';

export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')
  const [title, setTitle] = useState('Nome do Evento');
  const [modalVisible, setModalVisible] = useState(false);

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

  useEffect(() => {
    const loadTitle = async () => {
      const savedTitle = await AsyncStorage.getItem('title');

      setTitle(savedTitle || 'Nome do Evento');
    };
    loadTitle();
  }, []);

  const saveTitle = async () => {
    await AsyncStorage.setItem('title', title);
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.eventName}>
          {title == "" ? "Nome do Evento" : title}
        </Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType='fade'
        onRequestClose={() => setModalVisible(false)}
        style={{ position: 'relative' }}
      >
        <View style={styles.backgroundModal} />

        <View style={styles.containerModal}>
          <Text style={styles.titleModal}>
            {title == '' ? 'Adicione um nome para o seu evento' : 'Altere o nome do seu evento'}
          </Text> 
          <TextInput
            value={title}
            style={styles.inputMobile}
            onChangeText={setTitle} />

          <TouchableOpacity
            onPress={() => {
              saveTitle();
              setModalVisible(false)
            }}
            style={styles.buttonModal}
          >
            <Text style={styles.buttonTextModal}>
              Salvar
            </Text>
          </TouchableOpacity>

        </View>
      </Modal >

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


    </View >
  )
}