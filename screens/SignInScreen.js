import React, { useState } from 'react'
import { Linking, View, Image, StyleSheet, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import GreenButton from '../components/GreenButton'
import TextField from '../components/TextField'
import SmallLogo from '../components/SmallLogo'
import common from '../common.style'


const SignInScreen = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [resultText, setResultText] = useState(null)

  const capitalize = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const signIn = async () => {
    const urlBase = 'https://handler.health/'
    const res = await fetch(urlBase + 'auth/login/', {
      method: 'POST',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    const r = await res.json()
    if (!r.key) {
      let res = ''
      for (let entry of Object.entries(r)) {
        const [field, [problem]] = entry 
        res += problem + '\n'
      }
      setResultText(res)
    } else {
      await AsyncStorage.setItem('@token', r.key)
      navigation.navigate('StartScreen', { 
        token: r.key, 
        username: username 
      })
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.loginContainer}>
        <View style={Platform.OS == 'ios' ? {marginTop: '30%'} : {marginTop: '20%'}}>
          <View style={Platform.OS == 'android' && [common.flexRow, {justifyContent: 'space-around'}]}>
            <SmallLogo />
            <View style={Platform.OS == 'android' && {marginBottom: 25}}>
              <Text style={common.headingMain}>
                Welcome! 
              </Text>
              <Text style={[common.text, {marginTop: 5}]}>
                Sign in to continue
              </Text>
            </View>
          </View>
          {
            resultText &&
            <Text style={[common.text, {marginTop: 5, fontSize: 15, color: 'red'}]}>
              {resultText}
            </Text>
          }
        </View>
        <View style={
          resultText ? {marginTop: 0} : {marginTop: '8%'}
        }>
          <TextField 
            label={'Username'} 
            value={username} 
            onChange={setUsername} 
            capitalize='none'
            correct={false}
          />
          <TextField 
            label={'Password'} 
            value={password} 
            onChange={setPassword} 
            secure={true} 
            type={'password'}
            capitalize='none'
            correct={false}
          />
          <Text 
            style={{
              textAlign: 'right', fontFamily: 'PoppinsRegular', 
              fontSize: 13, lineHeight: 19, marginBottom: 30
            }}
          >
            Forgot Password?
          </Text>
          <GreenButton text={'Sign in'} onPress={signIn} />
        </View>
      </View>
        <View style={{position: 'absolute', bottom: '12%', alignSelf: 'center'}}>
          <Text style={common.text}>
            New to Health Handler? {'\t'}
            <Text 
              style={{color: '#5AD710', fontFamily: 'PoppinsBold'}}
              onPress={() => navigation.navigate('SignUpScreen')}
            >
              Sign up
            </Text>
          </Text>
        </View>
        <View style={{position: 'absolute', bottom: '6%', alignSelf: 'center', flex: 1, flexDirection: 'row'}}>
          <Text 
            onPress={() => Linking.openURL('https://handler.health/privacy')} 
            style={[common.text, {marginRight: 25, color: '#676767', fontSize: 15}]}
          >
            Privacy Policy
          </Text>
          <Text 
            onPress={() => Linking.openURL('https://handler.health/tos')}
            style={[common.text, {marginRight: 25, color: '#676767', fontSize: 15}]}
          >
            Terms of Service 
          </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    ...common.screen,
    paddingHorizontal: 40
  },
})

export default SignInScreen 
