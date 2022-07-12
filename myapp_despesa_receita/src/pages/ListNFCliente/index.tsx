import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, FlatList, Alert, Text } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Header } from "../../components/Header";
import { ListCard } from '../../components/ListCard';

interface ListNFClienteProps{
  id: string,
  dataNF: Date,
  descricao: string,
  valorNF: number,
  grupo: string,

}

const grupoDespesaOuReceita = ['RECEITA', 'DESPESA'];



export function ListNFCliente() {
  const [status, setStatus] = useState('')
  const [resultData, setResultData] = useState<ListNFClienteProps[]>([])
  let totalNota: ListNFClienteProps[] = [];

  async function loadDataNFCliente() {
    const data = await AsyncStorage.getItem('@si:nfdesrec')
    if (data) {
     console.log('Data', data)
     setResultData(JSON.parse(data))

     totalNota = JSON.parse(data)
     todasNotas: totalNota.map(nota => {
       const dados = {
         id: nota.id,
         dataNF: nota.dataNF,
         descricao: nota.descricao,
         valorNF: nota.valorNF,
         grupo: nota.grupo,
       }
       return dados;
       
     })
     setResultData(todasNotas)
    }
  }


  function handleDeleteNFCliente(id: string) {
    Alert.alert("Exclusão", 'Tem certeza?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {
          setStatus('E')
          setResultData(result =>
            resultData.filter(result => result.id !== id))
        },
      }
    ])
  }

  function totReceita(grupo: string) {
    if(grupo.toUpperCase() === grupoDespesaOuReceita[0]){
      return resultData.reduce((total, value) => total += (value.valorNF), 0)
    }
  }

  function totDespesa(grupo: string) {
    if(grupo.toUpperCase() === grupoDespesaOuReceita[1]){
      return resultData.reduce((total, value) => total += (value.valorNF), 0)
    }
  }

  function resultFinal(receita: number, despesa: number)
  {
    return (receita - despesa)
  }



  useEffect(() => {
    loadDataNFCliente()
  }, [])

  useFocusEffect(useCallback(() => {
    loadDataNFCliente()
  }, []))

  useEffect(() => {
    async function savedata() {
      await AsyncStorage.setItem('@si:nfclient', JSON.stringify(resultData))
    }
    savedata()
  }, [resultData])

  return (
    <View style={styles.container}>
      <Header title='Listagem de Nf do Cliente' />
      <View style={styles.content}>
        <Text style={styles.textCard}>Valor Total da Receita:{totReceita('RECEITA')}</Text>
      </View>

      <View style={styles.content}>
      <Text style={styles.textCard}>Valor Total da Despesa:{totDespesa('DESPESA')}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.textCard}>Resultado {resultFinal}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.textCard}>O resultado foi positivo ou negativo</Text>
      </View>
      { <FlatList
        data={resultData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListCard
            item={item}
            onPress={() => handleDeleteNFCliente(item.id)}
          />
        )}
      /> }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f2f5'
  },
  content: {
    marginTop: 5,
    marginLeft: 5,
    padding: 6,
  },
  textCard: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    flexDirection: 'row',
    marginBottom: 4
  },
})

//eu juro por tudo que é mais sagrado que passo fome mas não trabalho com javascript e derivados. 
//morte ao mobile react javascript 