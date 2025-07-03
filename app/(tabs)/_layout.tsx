import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useState } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/themes/Colors';
import { useContext } from 'react';
import { createContext } from 'react';


export const ThemeContext = createContext({tintColorLight : '#', setTintColorLight : (color : string) => {}, tintColorDark : '#77aaff', setTintColorDark : (color : string) => {}});

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [tintColorLight, setTintColorLight] = useState('#77aaff');
  const [tintColorDark, setTintColorDark] = useState('#77aaff');
  const value = {tintColorLight, setTintColorLight, tintColorDark, setTintColorDark};
  
  const Colors = {
    light: {
      text: '#11181C',
      background: '#fff',
      tint: tintColorLight,
      icon: '#687076',
      tabIconDefault: '#687076',
      tabIconSelected: tintColorLight,
    },
    dark: {
      text: '#ECEDEE',
      background: '#151718',
      tint: tintColorDark,
      icon: '#9BA1A6',
      tabIconDefault: '#9BA1A6',
      tabIconSelected: tintColorDark,
    },
  };
  
  return (
    <ThemeContext.Provider value={value}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarHideOnKeyboard: true,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="themes"
          options={{
            title: 'Themes',
            tabBarIcon: ({ color }) => <MaterialIcons size={28} name="color-lens" color={color} />,
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            title: 'New',
            tabBarIcon: ({ color }) => <MaterialIcons size={28} name="add-circle" color={color} />,
          }}
        />
      </Tabs>
    </ThemeContext.Provider>
  );
}
