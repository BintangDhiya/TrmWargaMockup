import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack>
            {/* Mengatur halaman "index" agar header/judul atasnya tidak muncul */}
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    );
}