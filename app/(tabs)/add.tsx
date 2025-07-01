import { Image } from 'expo-image';
import React from 'react';
import { Platform, Button, StyleSheet, TextInput, TouchableHighlight, View, Text } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabTwoScreen() {
  const [numTasks, setNumTasks] = React.useState(0);
  const [text, setText] = React.useState("");

  const storeData = async (value : string) => {
    try {
      await AsyncStorage.setItem(numTasks.toString(), numTasks.toString() + ": " + value);
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
        style=
        {[styles.titleContainer,
        ]}>
          <ThemedText type="title">Add a task</ThemedText>
        </ThemedView>
        <TextInput
            editable
            multiline
            numberOfLines={6}
            maxLength={140}
            style={styles.input}
            onChangeText={text => setText(text)}
            value={text}
            onSubmitEditing={onSubmit}
            placeholder="What do you need to do?"
            inputMode="text"
          />
        <TouchableHighlight style={{alignItems:'center',justifyContent:'center'}} onPress = {onSubmit} underlayColor = 'transparent'>
          <View>
              <Text>Submit</Text>
          </View>
      </TouchableHighlight>
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
