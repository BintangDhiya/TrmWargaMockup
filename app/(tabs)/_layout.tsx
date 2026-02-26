// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#0F5B44', // Warna hijau tua untuk tab aktif
            headerShown: false, // Sembunyikan header default agar kita bisa buat custom
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="billing"
                options={{
                    title: 'Billing',
                    tabBarIcon: ({ color }) => <Ionicons name="receipt" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="cs"
                options={{
                    title: 'CS',
                    tabBarIcon: ({ color }) => <Ionicons name="headset" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}