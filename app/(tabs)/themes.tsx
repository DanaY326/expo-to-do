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
import { Color } from '@/themes/themes-data';
import { colors } from '@/themes/themes-data';
import { setTintColorDark, setTintColorLight } from '@/themes/Colors';

export default function TabTwoScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ThemedView style={tw`flex items-center justify-center`}>
          <ThemedView style={tw`flex flex-col min-h-screen items-center justify-center`}>
            <SolidHeader text="Themes" />
            <ThemedView style={tw`flex-row gap-4 items-center justify-center`}>
                {colors.map((color: Color, index: number) => (
                    <ThemedView key={index} style={tw`items-center justify  -center my-4`}>
                        <ColoredButton
                        text={color.name}
                        onPress={() => {setTintColorDark(color.hex); setTintColorLight(color.hex);}}
                        colorDark={color.hex}
                        colorLight={color.hex}
                        />
                    </ThemedView>
                ))}
            </ThemedView>
        </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
