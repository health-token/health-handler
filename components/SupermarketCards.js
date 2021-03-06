import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import SainsburysLogo from './svg/Sainsburys'
import AsdaLogo from './svg/Asda'
import common from '../common.style'

export const Sainsburys = ({ onPress }) => {
  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={onPress}>
        <SainsburysLogo />
        <View style={styles.blank}>
          <View style={common.center}>
            <Text style={[common.text, {fontSize: 13}]}>
              Sainsbury's
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export const ASDA = ({ navigation }) => {
  return (
    <View style={styles.container} >
      <AsdaLogo />
      <View style={styles.blank}>
        <View style={common.center}>
          <Text style={[common.text, {fontSize: 13}]}>
            Coming soon...
          </Text>
        </View>
      </View>
    </View>
  )
}

export const Tesco = ({ navigation }) => {
  return (
    <View style={styles.container} >
      <Image 
        source={require('../assets/tesco.png')} 
        style={{tintColor: 'gray'}} 
      />
      <Image 
        source={require('../assets/tesco.png')} 
        style={{position: 'absolute', opacity: 0.10}} 
      />
      <View style={styles.blank}>
        <View style={common.center}>
          <Text style={[common.text, {fontSize: 13}]}>
            Tesco
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outer: {
    borderWidth: 0.55,
  },
  container: {
    marginTop: 40,
    borderRadius: 10,
    width: 136,
    height: 162,
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 5
  },
  blank: {
    height: 30,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
})
