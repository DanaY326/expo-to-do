import React from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import tw from 'twrnc';

import SolidHeader from '@/components/SolidHeader';
import { ThemedView } from '@/components/ThemedView';
import ColoredButton from '@/components/ui/ColoredButton';
import { Color } from '@/themes/themes-data';
import { colors } from '@/themes/themes-data';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useContext } from 'react';
import { ThemeContext } from './_layout';

export default function TabTwoScreen() {
  const { tintColorLight, setTintColorLight, tintColorDark, setTintColorDark } = useContext(ThemeContext);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ThemedView style={tw`flex flex-col items-center justify-center`}>
          <ThemedView style={tw`flex flex-wrap items-center justify-center`}>
            <SolidHeader text="Themes" />
            <ThemedView style={tw`flex-row flex-wrap-reverse items-center justify-center mx-2`}>
              {
                colors.map((color: Color, index: number) => (
                  <ThemedView key={index} style={tw`items-center justify-center mx-2`}>
                    <ColoredButton
                      text={color.name}
                      onPress={() => {setTintColorDark(color.hex); setTintColorLight(color.hex)}}
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
