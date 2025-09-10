import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Casino Game' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="game/cpu" options={{ title: 'vs CPU' }} />
        <Stack.Screen name="game/local" options={{ title: 'Local Game' }} />
        <Stack.Screen name="game/[gameId]" options={{ title: 'Online Game' }} />
        <Stack.Screen name="game/create" options={{ title: 'Create Game' }} />
        <Stack.Screen name="game/invite" options={{ title: 'Game Invite' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
