import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/themes/Colors';
import React from 'react';
import { Text, TouchableHighlight, View, Platform } from 'react-native';
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
    <TouchableHighlight style={tw`py-${text ? 3 : Platform.OS === 'ios' ? 2 : 3.8} px-${text ? 6 : 3.8} items-center bg-[${colorLight ? colorLight : Colors.light.tint}] dark:bg-[${colorDark ? colorDark : Colors.dark.tint}] rounded-3xl my-4`} onPress = {onPress} underlayColor = 'transparent'>
        <View>
            <Text style={tw`text-white`}>{text ? text : ''}</Text>
        </View>
    </TouchableHighlight>
  )
}