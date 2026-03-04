import React from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function BillingDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Memastikan nilainya dikonversi menjadi boolean dengan aman
    const isPaid = params.isPaid === 'true';

    return (
        <SafeAreaView style={styles.safeArea}>

            {/* --- HEADER --- */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detail Tagihan</Text>
                {/* Jarak kosong agar judul tetap di tengah, dipindah ke baris baru agar tidak memicu error spasi teks */}
                <View style={{ width: 24 }} />
            </View>

            {/* --- KONTEN DETAIL --- */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>

                    {/* Status Icon & Total */}
                    <View style={styles.statusContainer}>
                        <Ionicons
                            name={isPaid ? "checkmark-circle" : "time"}
                            size={50}
                            color={isPaid ? "#5CB85C" : "#FFA500"}
                        />
                        <Text style={[styles.statusText, { color: isPaid ? "#5CB85C" : "#FFA500" }]}>
                            {isPaid ? 'Lunas' : 'Belum Dibayar'}
                        </Text>
                        <Text style={styles.amountText}>{params.amount}</Text>
                    </View>

                    <View style={styles.divider} />

                    {/* Rincian Informasi */}
                    <View style={styles.detailContainer}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Nama Tagihan</Text>
                            <Text style={styles.detailValue}>{params.title}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Invoice No</Text>
                            <Text style={styles.detailValue}>{params.invoiceNo}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Ditagihkan Ke</Text>
                            <Text style={styles.detailValue}>{params.billedTo}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Unit</Text>
                            <Text style={styles.detailValue}>{params.unit}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Tanggal Invoice</Text>
                            <Text style={styles.detailValue}>{params.invoiceDate}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Jatuh Tempo</Text>
                            <Text style={[styles.detailValue, { color: isPaid ? '#333333' : '#D32F2F' }]}>
                                {params.dueDate}
                            </Text>
                        </View>
                    </View>

                </View>
            </ScrollView>

            {/* --- TOMBOL BAYAR --- */}
            {/* Menggunakan ternary operator (? : null) lebih aman dari pada && di React Native */}
            {!isPaid ? (
                <View style={styles.bottomNav}>
                    <TouchableOpacity
                        style={styles.payButton}
                        onPress={() => alert('Mengarahkan ke Payment Gateway...')}
                    >
                        <Text style={styles.payButtonText}>Bayar Sekarang</Text>
                    </TouchableOpacity>
                </View>
            ) : null}

        </SafeAreaView>
    );
}

// --- STYLING ---
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F5F7F5' },
    header: {
        backgroundColor: '#0F5B44',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    backButton: { padding: 5 },
    headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
    scrollContent: { padding: 20 },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statusContainer: { alignItems: 'center', marginBottom: 20 },
    statusText: { fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 5 },
    amountText: { fontSize: 28, fontWeight: 'bold', color: '#0F5B44' },
    divider: { height: 1, backgroundColor: '#E8EAE8', marginBottom: 20 },
    detailContainer: { gap: 15 },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between' },
    detailLabel: { fontSize: 13, color: '#757575', flex: 1 },
    detailValue: { fontSize: 13, color: '#333333', fontWeight: '600', flex: 1, textAlign: 'right' },
    bottomNav: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E8EAE8',
    },
    payButton: {
        backgroundColor: '#0F5B44',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    payButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});