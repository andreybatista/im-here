import { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert, Button, Modal } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Participant } from '../../components/Participant';

import { styles } from './styles';

export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')
  const [title, setTitle] = useState<string>('Nome do Evento');
  const [modalVisible, setModalVisible] = useState(false);

  function handleParticipantAdd() {
    if (participantName == "") {
      return Alert.alert('Insira o nome do participante', 'O campo não pode estar em vazio.')
    }
    if (participants.includes(participantName)) {
      return Alert.alert('Participante já cadastrado', 'Já existe um participante na lista com esse nome.')
    }

    const newList = [...participants, participantName];
    setParticipants(newList);
    AsyncStorage.setItem('@i-m-here:participants-1.0.0', JSON.stringify(newList))
      .catch((error) => console.error(error));
    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remover ', `Remover o participante ${name} ?`, [
      {
        text: 'Sim',
        onPress: () => {
          setParticipants(state => state.filter(participant => participant !== name))
          const newList = [...participants, participantName];
          console.log(newList)
          AsyncStorage.setItem('@i-m-here:participants-1.0.0', JSON.stringify(newList))
            .catch((error) => console.error(error));
        },
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  function handleEditTitle(e: any) {
    setTitle(e)
    const newTitle = e;
    AsyncStorage.setItem('@i-m-here:title-1.0.0', newTitle)
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    AsyncStorage.getItem('@i-m-here:participants-1.0.0')
      .then((list) => {
        if (list !== null) {
          setParticipants(JSON.parse(list));
        }
      })
      .catch((error) => console.error(error));


    AsyncStorage.getItem('@i-m-here:title-1.0.0')
      .then((savedTitle) => {
        if (savedTitle !== null) {
          setTitle(savedTitle);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.eventName}>
          {title == "" ? "Nome do Evento" : title}
        </Text>
      </TouchableOpacity>


      <Text style={styles.eventDate}>
        {participants.length == 0 ? "Nem um participante até o momento." : `${participants.length} participante${participants.length > 1 ? "s" : ""} cadastrado${participants.length > 1 ? "s" : ""}`}
      </Text>

      <View style={styles.form}>
        <TextInput
          onChangeText={setParticipantName}
          value={participantName}
          style={styles.input}
          placeholder='Nome do Participante'
          placeholderTextColor='#6B6B6B'
        />

        <TouchableOpacity disabled={!participantName} style={[styles.button, !participantName && styles.disabledButton]} onPress={handleParticipantAdd}>
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
            onChangeText={e => handleEditTitle(e)} />

          <TouchableOpacity
            onPress={() => {
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
    </View >
  )
}