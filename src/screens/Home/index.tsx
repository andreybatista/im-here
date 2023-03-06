import { Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";

import { Participant } from "../../components/Participant";

import { styles } from "./styles";

export function Home() {
  const participants = [
    "Andrey",
    "Noeme",
    "Mini Noeme",
    "Mini Andrey",
    "Andrey2",
    "Noeme2",
    "Mini Noeme2",
    "Mini Andrey2",
    "Andrey3",
    "Noeme3",
    "Mini Noeme3",
    "Mini Andrey3",
  ]

  function handleParticipantAdd() {
    console.log('click')
  }

  function handleParticipantRemove(name: string) {
    console.log(`click para remove o participante ${name}`)
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
          style={styles.input}
          placeholder="Nome do Participante"
          placeholderTextColor="#6B6B6B"
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
        ListEmptyComponent={()=>(
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participante a sua lista de presença.
          </Text>
        )}
      />


    </View>
  )
}