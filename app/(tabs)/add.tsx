import { Image } from 'expo-image';
import React from 'react';
import { useContext } from 'react';
import { Platform, Button, StyleSheet, KeyboardAvoidingView, TextInput, TouchableHighlight, View, Text, Keyboard } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import tw from 'twrnc';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ColoredButton from '@/components/ui/ColoredButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SolidHeader from '@/components/SolidHeader';
import { ThemeContext } from './_layout';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabThreeScreen() {
  const [numTasks, setNumTasks] = React.useState(0);
  const [text, setText] = React.useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = React.useState(false);

  const colorScheme = useColorScheme();
  const { tintColorLight, setTintColorLight, tintColorDark, setTintColorDark } = useContext(ThemeContext);

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

    return () => {
      showSubscription.remove();
    };
  }, []);

  const handleKeyboardShow = (event : any ) => {
    setIsKeyboardVisible(true);
  };

  const handleKeyboardHide = (event : any ) => {
    setIsKeyboardVisible(false);
  };

  const storeData = async (value : string) => {
    try {
      await AsyncStorage.setItem(numTasks.toString(), value);
      setNumTasks(numTasks + 1);
    } catch (e) {
      // saving error
    }
  };

  const onSubmit = () => {
    storeData(text);
    setText("");
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ThemedView 
          style={tw`flex flex-col items-center justify-center`}>
          <SolidHeader text="Add Task" />
          <ThemedView style={tw`flex flex-col items-center justify-center`}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={tw `py-4 px-20`}>
              <Text>
              <TextInput
                  editable
                  multiline
                  numberOfLines={2}
                  maxLength={140}
                  style={tw`flex border border-gray-300 items-center text-sm w-full rounded-lg p-2`}
                  onChangeText={text => setText(text)}
                  value={text}
                  onSubmitEditing={onSubmit}
                  placeholder="What do you need to do?"
                  inputMode="text"
                />
              </Text>
              <ThemedView style={tw`items-center`}>
                <ColoredButton 
                  colorLight={tintColorLight}
                  colorDark={tintColorDark}
                  text="Submit"
                  onPress={onSubmit}/>
                {
                  isKeyboardVisible 
                  ? 
                  <ColoredButton text="V" onPress={Keyboard.dismiss} 
                    colorLight={tintColorLight}
                    colorDark={tintColorDark} /> 
                  : 
                  null
                }
              </ThemedView>
            </KeyboardAvoidingView>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
