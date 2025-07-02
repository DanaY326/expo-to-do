import { Image } from 'expo-image';
import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import tw from 'twrnc';

import SolidHeader from '@/components/SolidHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ColoredButton from '@/components/ui/ColoredButton';

export default function TabTwoScreen() {
  

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ThemedView style={tw`flex flex-col items-center justify-center`}>
          <ThemedView style={tw`flex flex-col min-h-screen items-center justify-center`}>
            <SolidHeader text="Themes" />
            <ThemedText
              style={tw`text-center h-screen`}>
                
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
