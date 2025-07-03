import { Image } from 'expo-image';
import React from 'react';
import { useContext } from 'react';
import { FlatList, ScrollView, Dimensions } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import tw from 'twrnc';

import SolidHeader from '@/components/SolidHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ColoredButton from '@/components/ui/ColoredButton';
import { ThemeContext } from './_layout';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabOneScreen() {
  const [renderDummy, setRenderDummy] = React.useState(true);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const colorScheme = useColorScheme();
  const { tintColorLight, setTintColorLight, tintColorDark, setTintColorDark } = useContext(ThemeContext);

  const getAllKeys = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      return keys;
    } catch(e) {
      // read key error
    }
  }

  const getData = async () => {
    const keys = await getAllKeys();
    let tasks = [];
    if (keys) {
      for (const key of keys) {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            // value previously stored
            tasks.push([key, value]);
          }
        } catch (e) {
          // error reading value
        }
      }
    }
    return tasks;
  };

  const removeValue = async (key : string) => {
    try {
      await AsyncStorage.removeItem(key)
      setRenderDummy(!renderDummy)
    } catch(e) {
      // remove error
    }

    console.log('Done.')
  }

  const removeAll = async () => {
    const keys = await getAllKeys();
    if (keys) {
      for (const key of keys) {
        try {
          await removeValue(key);
        } catch (e) {
          // error removing value
        }
      }
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ThemedView style={tw`flex flex-col items-center justify-center`}>
          <SolidHeader text="To Do:" />
          <ThemedView style={tw`items-center justify-center`}>
            <ThemedText
              style={tw`text-center`}>
              {
                getData().then((tasks) => {
                  return (
                    <FlatList
                      keyExtractor={(item) => item[0]}
                      data={tasks}
                      extraData={renderDummy}
                      style={tw``}
                      renderItem={({item}) => (
                      <ThemedView style={tw`flex-row items-center gap-4`}>
                        <ColoredButton
                          colorLight={tintColorLight}
                          colorDark={tintColorDark}
                          onPress={() => {
                            removeValue(item[0]);
                          }}/>
                        <ThemedText style={tw``}>{item[1]}</ThemedText>
                      </ThemedView>
                      )}
                      ListFooterComponent={
                        <ThemedView style={tw`flex-row items-center justify-center`}>
                          <ColoredButton 
                            colorLight={tintColorLight}
                            colorDark={tintColorDark}
                            text="Clear"
                            onPress={removeAll}/>
                        </ThemedView>
                      }
                    />
                  );
                })
              }
              </ThemedText>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
