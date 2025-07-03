import { Image } from 'expo-image';
import React, { use } from 'react';
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
import { useColorScheme } from '@/hooks/useColorScheme';
import { useContext } from 'react';
import { createContext } from 'react';
import { ThemeContext } from './_layout';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const { tintColorLight, setTintColorLight, tintColorDark, setTintColorDark } = useContext(ThemeContext);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ThemedView style={tw`flex flex-col items-center justify-center`}>
          <ThemedView style={tw`flex flex-wrap min-h-screen items-center justify-center`}>
            <SolidHeader text="Themes" />
              <ThemedView style={tw`flex-row w-full items-center justify-center`}>
                    {
                      colors.map((color: Color, index: number) => (
                        <ThemedView key={index} style={tw`items-center justify-center my-4 mx-2`}>
                          <ColoredButton
                            text={color.name}
                            onPress={() => {(colorScheme && colorScheme === 'dark') ? setTintColorDark(color.hex) : setTintColorLight(color.hex)}}
                            colorDark={color.hex}
                            colorLight={color.hex}
                          />
                        </ThemedView>
                      ))
                    }
                  </ThemedView>
        </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
