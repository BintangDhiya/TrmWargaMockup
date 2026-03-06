import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack>
            {/* Halaman Login */}
            <Stack.Screen name="index" options={{ headerShown: false }} />
            {/* Halaman Tab Navigation (Home, dll) */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* Halaman Detail Billing */}
            <Stack.Screen name="billing-detail" options={{ headerShown: false }} />
            <Stack.Screen name="notification" options={{ headerShown: false }} />
            <Stack.Screen name="news" options={{ headerShown: false }} />
        </Stack>
    );
}