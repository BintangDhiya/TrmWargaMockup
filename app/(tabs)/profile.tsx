import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Fungsi untuk menangani Log Out
    const handleLogout = () => {
        Alert.alert(
            "Konfirmasi Log Out",
            "Apakah Anda yakin ingin keluar dari akun ini?",
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Keluar",
                    style: "destructive", // Memberikan efek warna merah di iOS
                    onPress: () => router.replace('/') // Redirect ke halaman Login (app/index.tsx)
                }
            ]
        );
    };

    // Komponen Reusable untuk List Menu agar kode lebih bersih
    const ProfileMenu = ({
                             iconName,
                             title,
                             onPress,
                             isDestructive = false
                         }: {
        iconName: any,
        title: string,
        onPress: () => void,
        isDestructive?: boolean
    }) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
            <View style={[styles.menuIcon, isDestructive ? styles.menuIconDestructive : null]}>
                <Ionicons
                    name={iconName}
                    size={20}
                    color={isDestructive ? "#D32F2F" : "#0F5B44"}
                />
            </View>
            <Text style={[styles.menuText, isDestructive ? styles.menuTextDestructive : null]}>
                {title}
            </Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#A9A9A9" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

            {/* --- HEADER & AVATAR --- */}
            {/* Menggunakan insets.top agar aman dari notch/status bar */}
            <View style={[styles.headerSection, { paddingTop: insets.top + 20 }]}>
                <View style={styles.avatarContainer}>
                    <Ionicons name="person" size={60} color="#0F5B44" />
                </View>
                <Text style={styles.username}>Tsabit G</Text>
                <Text style={styles.unitText}>Unit 11/J T1</Text>
            </View>

            {/* --- MENU LIST --- */}
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Grup Menu Pengaturan */}
                <View style={styles.menuGroup}>
                    <ProfileMenu
                        iconName="shield-checkmark-outline"
                        title="Privacy Policy & FAQ"
                        onPress={() => alert('Membuka Privacy Policy & FAQ')}
                    />
                    <View style={styles.divider} />
                    <ProfileMenu
                        iconName="lock-closed-outline"
                        title="Change Password"
                        onPress={() => alert('Membuka form Change Password')}
                    />
                </View>

                {/* Grup Menu Keluar */}
                <View style={styles.menuGroup}>
                    <ProfileMenu
                        iconName="log-out-outline"
                        title="Log Out"
                        onPress={handleLogout}
                        isDestructive={true}
                    />
                </View>

                {/* Versi Aplikasi */}
                <Text style={styles.versionText}>App Version 1.0.0</Text>

            </ScrollView>
        </View>
    );
}

// --- STYLING ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7F5', // Background abu-abu muda
    },
    headerSection: {
        backgroundColor: '#0F5B44', // Tema hijau tua
        alignItems: 'center',
        paddingBottom: 30,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#5CB85C', // Aksen hijau muda di pinggir avatar
    },
    username: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    unitText: {
        fontSize: 14,
        color: '#E8F5E9',
    },
    scrollContent: {
        padding: 20,
    },
    menuGroup: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E8EAE8',
        overflow: 'hidden', // Agar border radius terlihat rapi menutupi isinya
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#F0F9F4', // Latar belakang icon hijau muda
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuIconDestructive: {
        backgroundColor: '#FFEBEE', // Latar belakang icon merah muda untuk Log Out
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        color: '#333333',
        fontWeight: '500',
    },
    menuTextDestructive: {
        color: '#D32F2F', // Teks merah untuk Log Out
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginLeft: 70, // Garis pemisah dimulai setelah icon
    },
    versionText: {
        textAlign: 'center',
        color: '#A9A9A9',
        fontSize: 12,
        marginTop: 10,
    },
});