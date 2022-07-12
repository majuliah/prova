import {
  View,
  TouchableOpacity,
  Text, StyleSheet,
  TouchableOpacityProps
} from 'react-native'

import {
  Container,
  ButtonCard,
  TextCard
} from './styles'

import { format } from 'date-fns'

interface ListNFClienteProps{
  id: string,
  dataNF: Date,
  descricao: string,
  valorNF: number,
  grupo: string,

}

interface ListCardProps extends TouchableOpacityProps {
  item: ListNFClienteProps;
}

export function ListCard({ item, ...rest }: ListCardProps) {

  function convertDate(birthDate: Date) {
    return format(new Date(birthDate), 'dd/MM/yyyy')
  }

  return (
    <Container>
    <ButtonCard
        {...rest}
        key={item.id}>
        <TextCard>Dados da Nota</TextCard>
        <TextCard>Data Nota: {item.dataNF}</TextCard>
        <TextCard>Descrição: {item.descricao}</TextCard>
        <TextCard>valorNF: {item.valorNF}</TextCard>
        <TextCard>Grupo: {item.grupo}</TextCard>
    </ButtonCard>
</Container>
    )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
  },
  buttonCard: {
    width: '100%',
    padding: 6,
    backgroundColor: '#969CB2',
    borderRadius: 10
  },
  textCard: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  titleCard: {
    color: '#ff872c',
    fontSize: 26,
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  separator: {
    marginTop: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
  }
})




