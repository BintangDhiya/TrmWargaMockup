import React, { useState } from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- MOCK DATA TIKET HELPDESK ---
const TICKET_DATA = [
    {
        id: '1',
        ticketNo: 'TKT-2604-001',
        category: 'Plumbing (Saluran Air)',
        subject: 'Pipa wastafel bocor',
        date: '16 Apr 2026, 09:00',
        status: 'active', // Sedang ditangani
        progress: 'In Progress',
    },
    {
        id: '2',
        ticketNo: 'TKT-2604-005',
        category: 'Electrical (Listrik)',
        subject: 'Lampu balkon mati',
        date: '15 Apr 2026, 14:20',
        status: 'active',
        progress: 'Open',
    },
    {
        id: '3',
        ticketNo: 'TKT-2603-088',
        category: 'Cleaning (Kebersihan)',
        subject: 'Pengambilan sampah tertinggal',
        date: '10 Mar 2026, 08:00',
        status: 'resolved', // Sudah selesai
        progress: 'Closed',
    },
];

export default function CSScreen() {
    const insets = useSafeAreaInsets();

    // State untuk Tab
    const [activeTab, setActiveTab] = useState<'active' | 'resolved'>('active');

    // Filter data berdasarkan tab aktif
    const filteredData = TICKET_DATA.filter(item => item.status === activeTab);

    // Menentukan icon berdasarkan kategori keluhan
    const getCategoryIcon = (category: string) => {
        if (category.includes('Plumbing')) return 'pipe-leak';
        if (category.includes('Electrical')) return 'lightning-bolt';
        if (category.includes('Cleaning')) return 'broom';
        return 'tools';
    };

    const renderTicketCard = ({ item }: { item: typeof TICKET_DATA[0] }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.iconBox}>
                    <MaterialCommunityIcons
                        name={getCategoryIcon(item.category) as any}
                        size={24}
                        color="#0D47A1"
                    />
                </View>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.ticketNo}>{item.ticketNo}</Text>
                    <Text style={styles.categoryText}>{item.category}</Text>
                </View>

                {/* Badge Status */}
                <View style={[
                    styles.badge,
                    item.progress === 'Closed' ? styles.badgeClosed :
                        item.progress === 'In Progress' ? styles.badgeProgress : styles.badgeOpen
                ]}>
                    <Text style={[
                        item.progress === 'Closed' ? styles.textClosed :
                            item.progress === 'In Progress' ? styles.textProgress : styles.textOpen
                    ]}>
                        {item.progress}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.cardBody}>
                <Text style={styles.subjectText}>{item.subject}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>

            {/* --- HEADER --- */}
            <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
                <Text style={styles.headerTitle}>Helpdesk & CS</Text>
            </View>

            {/* --- TOP TABS --- */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'active' ? styles.activeTabButton : null]}
                    onPress={() => setActiveTab('active')}
                >
                    <Text style={[styles.tabText, activeTab === 'active' ? styles.activeTabText : null]}>Active Tickets</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'resolved' ? styles.activeTabButton : null]}
                    onPress={() => setActiveTab('resolved')}
                >
                    <Text style={[styles.tabText, activeTab === 'resolved' ? styles.activeTabText : null]}>Resolved</Text>
                </TouchableOpacity>
            </View>

            {/* --- DAFTAR TIKET --- */}
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={renderTicketCard}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Tidak ada tiket pada kategori ini.</Text>
                }
            />

            {/* --- TOMBOL CREATE TICKET --- */}
            <View style={styles.bottomNav}>
                <TouchableOpacity
                    style={styles.createTicketBtn}
                    onPress={() => alert('Membuka form pembuatan tiket baru...')}
                >
                    <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" style={styles.btnIcon} />
                    <Text style={styles.createTicketText}>Create New Ticket</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

// --- STYLING (TEMA BIRU) ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F7F9' },
    header: {
        backgroundColor: '#0D47A1', // Biru Tua
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#003380',
    },
    headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },

    // Tabs
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E8EAE8',
    },
    tabButton: { flex: 1, paddingVertical: 15, alignItems: 'center' },
    activeTabButton: {
        borderBottomWidth: 3,
        borderBottomColor: '#0D47A1', // Penanda tab aktif (Biru Tua)
    },
    tabText: { fontSize: 14, color: '#757575', fontWeight: '500' },
    activeTabText: { color: '#0D47A1', fontWeight: 'bold' },

    // List & Cards
    listContainer: { padding: 16 },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E8EAE8',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#E3F2FD', // Biru muda terang
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerTextContainer: { flex: 1 },
    ticketNo: { fontSize: 13, fontWeight: 'bold', color: '#0D47A1', marginBottom: 2 },
    categoryText: { fontSize: 11, color: '#757575' },

    // Badges
    badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    badgeOpen: { backgroundColor: '#FFF3E0' }, // Oranye
    badgeProgress: { backgroundColor: '#E3F2FD' }, // Biru Pucat
    badgeClosed: { backgroundColor: '#F5F5F5' }, // Abu-abu
    textOpen: { color: '#E65100', fontSize: 10, fontWeight: 'bold' },
    textProgress: { color: '#0D47A1', fontSize: 10, fontWeight: 'bold' },
    textClosed: { color: '#757575', fontSize: 10, fontWeight: 'bold' },

    divider: { height: 1, backgroundColor: '#E8EAE8', marginBottom: 12 },

    cardBody: { gap: 4 },
    subjectText: { fontSize: 14, fontWeight: '600', color: '#333333' },
    dateText: { fontSize: 11, color: '#A9A9A9' },
    emptyText: { textAlign: 'center', color: '#A9A9A9', marginTop: 30 },

    // Bottom Button
    bottomNav: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E8EAE8',
    },
    createTicketBtn: {
        backgroundColor: '#0D47A1', // Biru Tua
        paddingVertical: 15,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnIcon: { marginRight: 8 },
    createTicketText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});