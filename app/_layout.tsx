import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack>
            {/* Halaman Login */}
            <Stack.Screen name="index" options={{ headerShown: false }} />
            {/* Halaman Tab Navigation (Home, dll) */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}