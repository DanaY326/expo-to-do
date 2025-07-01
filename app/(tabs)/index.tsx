import { Image } from 'expo-image';
import React from 'react';
import { Platform, StyleSheet, TextInput, TouchableHighlight, View, Text, FlatList } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabOneScreen() {
  var numTasks = 0;
  const [render, setRender] = React.useState(0);

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
      setRender(render + 1)
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
        <ThemedView 
        style={styles.titleContainer}>
          <ThemedText type="title">To Do:</ThemedText>
        </ThemedView>
        <ThemedView style={{flexDirection: 'column', gap: 8}}>
          <ThemedText>
            {
              getData().then((tasks) => {
                return (
                  <FlatList
                    keyExtractor={(item) => item[0]}
                    data={tasks}
                    extraData={render}
                    renderItem={({item}) => (
                    <ThemedView style={{flexDirection: 'row', alignItems: 'center'}}>
                      <ThemedText style={{margin: 8}}>{item[1]}</ThemedText>
                      <TouchableHighlight style={{alignItems:'center',justifyContent:'center'}} onPress = {() => removeValue(item[0])} underlayColor = 'transparent'>
                        <View>
                          <Text>Completed!</Text>
                        </View>
                      </TouchableHighlight>
                    </ThemedView>
                    )}>
                  </FlatList>
                );
              })
            }
            </ThemedText>
            <TouchableHighlight style={{alignItems:'center',justifyContent:'center'}} onPress = {removeAll} underlayColor = 'transparent'>
              <View>
                <Text>Clear tasks</Text>
              </View>
            </TouchableHighlight>
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});