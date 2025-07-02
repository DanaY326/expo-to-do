import React from 'react';
import { Platform, Button, StyleSheet, TextInput, TouchableHighlight, View, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import tw from 'twrnc';

type Props = {
  text?: string;
  onPress: () => void;
  colorDark?: string;
  colorLight?: string;
};

export default function ColoredButton({
    text,
    onPress,
    colorDark,
    colorLight
}: Props) {
  const colorScheme = useColorScheme();

  return (
    <TouchableHighlight style={tw`py-3 h-fit px-${text ? 6 : 3} items-center bg-${colorLight ? colorLight : 'midnight'} dark:bg-${colorDark ? colorDark : 'primary-dark'} rounded-3xl my-4`} onPress = {onPress} underlayColor = 'transparent'>
        <View>
            <Text style={tw`text-white`}>{text ? text : ''}</Text>
        </View>
    </TouchableHighlight>
  )
}