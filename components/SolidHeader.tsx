import type { PropsWithChildren } from 'react';
import tw from 'twrnc';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type Props = PropsWithChildren<{
  text: string;
}>;

export default function SolidHeader({
  text,
}: Props) {

  return (
    <ThemedView 
      style={tw`flex flex-col m-4 items-center justify-center`}>
      <ThemedText type="title">{text}</ThemedText>
    </ThemedView>
  );
}
