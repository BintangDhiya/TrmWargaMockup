import React from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity, Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BuildingMgtScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Komponen Reusable untuk list dokumen
    const DocumentItem = ({ title, iconName }: { title: string, iconName: any }) => (
        <TouchableOpacity style={styles.docItem} activeOpacity={0.7} onPress={() => alert(`Membuka dokumen: ${title}`)}>
            <View style={styles.docIconBox}>
                <Ionicons name={iconName} size={20} color="#0D47A1" />
            </View>
            <Text style={styles.docTitle}>{title}</Text>
            <Ionicons name="download-outline" size={20} color="#0D47A1" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

            {/* --- HEADER --- */}
            <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Building Management</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* --- HERO IMAGE (FOTO GEDUNG) --- */}
                <Image
                    source={{ uri: 'https://picsum.photos/seed/apartment/600/300' }}
                    style={styles.heroImage}
                />

                {/* --- INFO KANTOR PENGELOLA --- */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Kantor Pengelola</Text>
                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Ionicons name="location" size={20} color="#757575" style={styles.infoIcon} />
                        <Text style={styles.infoText}>Lobby Tower A, Lantai GF</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="time" size={20} color="#757575" style={styles.infoIcon} />
                        <Text style={styles.infoText}>Senin - Jumat: 08:00 - 17:00{"\n"}Sabtu: 08:00 - 12:00</Text>
                    </View>
                </View>

                {/* --- QUICK ACTION BUTTONS (CALL, WA, EMAIL) --- */}
                <View style={styles.actionGrid}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => alert('Membuka WhatsApp...')}>
                        <View style={styles.actionIconBg}>
                            <MaterialCommunityIcons name="whatsapp" size={28} color="#0D47A1" />
                        </View>
                        <Text style={styles.actionText}>WhatsApp CS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton} onPress={() => alert('Membuka Email...')}>
                        <View style={styles.actionIconBg}>
                            <MaterialCommunityIcons name="email-outline" size={28} color="#0D47A1" />
                        </View>
                        <Text style={styles.actionText}>Email Kami</Text>
                    </TouchableOpacity>
                </View>

                {/* --- KONTAK DARURAT (EMERGENCY) --- */}
                <View style={[styles.sectionCard, styles.emergencyCard]}>
                    <Text style={[styles.sectionTitle, styles.emergencyTitle]}>Kontak Darurat 24 Jam</Text>
                    <View style={[styles.divider, styles.emergencyDivider]} />

                    <TouchableOpacity style={styles.emergencyRow} onPress={() => alert('Menelepon Keamanan...')}>
                        <View style={styles.emergencyIconBox}>
                            <MaterialCommunityIcons name="shield-account-outline" size={24} color="#D32F2F" />
                        </View>
                        <View style={styles.emergencyTextContainer}>
                            <Text style={styles.emergencyLabel}>Security & Keamanan</Text>
                            <Text style={styles.emergencyNumber}>021-555-1234</Text>
                        </View>
                        <Ionicons name="call" size={24} color="#D32F2F" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.emergencyRow} onPress={() => alert('Menelepon Teknisi...')}>
                        <View style={styles.emergencyIconBox}>
                            <MaterialCommunityIcons name="tools" size={24} color="#D32F2F" />
                        </View>
                        <View style={styles.emergencyTextContainer}>
                            <Text style={styles.emergencyLabel}>Engineering / Teknisi</Text>
                            <Text style={styles.emergencyNumber}>021-555-9876</Text>
                        </View>
                        <Ionicons name="call" size={24} color="#D32F2F" />
                    </TouchableOpacity>
                </View>

                {/* --- DOKUMEN & PANDUAN --- */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Dokumen Warga</Text>
                    <View style={styles.divider} />

                    <DocumentItem title="Tata Tertib Apartemen (House Rules)" iconName="book-outline" />
                    <DocumentItem title="Panduan Renovasi Unit (Fitting Out)" iconName="hammer-outline" />
                    <DocumentItem title="Formulir Pindah Keluar/Masuk" iconName="document-text-outline" />
                </View>

                {/* Spacing bawah */}
                <View style={{ height: 30 }} />

            </ScrollView>
        </View>
    );
}

// --- STYLING (TEMA BIRU) ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F7F9' },
    header: {
        backgroundColor: '#0D47A1', // Biru Tua
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    backButton: { padding: 5 },
    headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
    scrollContent: {
        paddingBottom: 20,
    },
    heroImage: {
        width: '100%',
        height: 180,
        backgroundColor: '#E0E0E0',
    },
    sectionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginHorizontal: 16,
        marginTop: -20, // Menarik card ke atas gambar sedikit agar terlihat menyatu
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E8EAE8',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0D47A1', // Judul section biru tua
    },
    divider: { height: 1, backgroundColor: '#E8EAE8', marginVertical: 12 },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    infoIcon: { marginRight: 10, marginTop: 2 },
    infoText: { flex: 1, fontSize: 13, color: '#555555', lineHeight: 20 },

    // Action Grid
    actionGrid: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginBottom: 16,
        justifyContent: 'space-between',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E8EAE8',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    actionIconBg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E3F2FD', // Latar biru muda
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionText: { fontSize: 13, fontWeight: '600', color: '#333333' },

    // Emergency Section
    emergencyCard: {
        marginTop: 0, // Reset marginTop negatif
        backgroundColor: '#FFEBEE', // Latar merah sangat muda untuk darurat
        borderColor: '#FFCDD2',
    },
    emergencyTitle: { color: '#C62828' }, // Merah gelap
    emergencyDivider: { backgroundColor: '#FFCDD2' },
    emergencyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    emergencyIconBox: {
        width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFEBEE',
        justifyContent: 'center', alignItems: 'center', marginRight: 12,
    },
    emergencyTextContainer: { flex: 1 },
    emergencyLabel: { fontSize: 11, color: '#757575', marginBottom: 2 },
    emergencyNumber: { fontSize: 15, fontWeight: 'bold', color: '#C62828' },

    // Document List
    docItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    docIconBox: {
        width: 36, height: 36, borderRadius: 8, backgroundColor: '#E3F2FD',
        justifyContent: 'center', alignItems: 'center', marginRight: 12,
    },
    docTitle: { flex: 1, fontSize: 13, color: '#333333', fontWeight: '500' },
});