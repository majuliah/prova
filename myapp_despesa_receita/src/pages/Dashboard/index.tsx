import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  View,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { InputMaskValorNF } from '../../components/InputMaskValorNF'
import { InputMaskDataNF } from '../../components/InputMaskDataNF'

export function Dashboard() {
  const [dataNF, setDataNF] = useState('')
  const [descricao, setDescricao] = useState('')
  const [valorNF, setValorNF] = useState('')
  const [grupo, setGrupo] = useState('')

  async function handleAddNFClient() {
    const nfClientData = {
      id: new Date().getTime(),
      descricao,
      valorNF: formatValorNF(valorNF),
      dataNF: convertDate(dataNF),
      grupo,
    }
    console.log(nfClientData)
    try {
      const data = await AsyncStorage.getItem('@si:nfdesrec')
      const currentData = data ? JSON.parse(data) : []
      const dataFormatted = [
        ...currentData,
        nfClientData
      ]
      await AsyncStorage.setItem('@si:nfdesrec',
        JSON.stringify(dataFormatted))
    } catch (err) {
      console.log(err)
      Alert.alert('Error ao salvar a NF do Cliente')
    }
    setDescricao('')
    setValorNF('')
    setDataNF('')
    setGrupo('')
  }

  async function loadDataNFClient() {
    const data = await AsyncStorage.getItem('@si:nfdesrec')
    const currentData = data ? JSON.parse(data) : []
  }

  function convertDate(data: string) {
    const dateArray = data.split('/')
    return new Date(dateArray[1] + '/' + dateArray[0] + '/' + dateArray[2])
  }

  function formatValorNF(valorNF: string) {
    return parseFloat(
      valorNF
        .slice(2, valorNF.length)
        .replace('.', '')
        .replace(',', '.')
    )
  }

  useEffect(() => {
    loadDataNFClient()
  }, [])

  return (
    <View style={styles.container}>
      <Header title='Cadastro NF por Cliente' />
      <ScrollView>

      <InputMaskDataNF
          placeholder='Data da Nota Fiscal'
          placeholderTextColor='#5636d3'
          value={dataNF}
          onChangeText={value => setDataNF(value)}
        />

      <Input
          placeholder='Descrição'
          placeholderTextColor='#5636d3'
          value={descricao}
          autoCapitalize='words'
          onChangeText={value => setDescricao(value)}
        />

      <InputMaskValorNF
          placeholder='Valor'
          placeholderTextColor='#5636d3'
          value={valorNF}
          onChangeText={value => setValorNF(value)}
        />

        <Input
          placeholder='Grupo (Despesa ou Receita)?'
          placeholderTextColor='#5636d3'
          value={grupo}
          onChangeText={value => setGrupo(value)}
        />

        <Button
          title='Incluir'
          onPress={handleAddNFClient}
        />
      </ScrollView>


    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f2f5'
  }
})



