import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.innerContainer}
            >

                {/* --- AREA LOGO --- */}
                <View style={styles.logoContainer}>
                    <View style={styles.logoPlaceholder}>
                        <Text style={styles.logoText}>b</Text>
                    </View>
                    <Text style={styles.appName}>management</Text>
                </View>

                {/* --- TOMBOL PILIH APARTEMEN --- */}
                <TouchableOpacity style={styles.apartmentSelector}>
                    <Text style={styles.apartmentText}>Silahkan Pilih Apartemen</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="#0F5B44" />
                </TouchableOpacity>

                {/* --- FIELD USERNAME --- */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#A9A9A9"
                    />
                    <Ionicons name="person-outline" size={20} color="#757575" style={styles.icon} />
                </View>

                {/* --- FIELD PASSWORD --- */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="password"
                        placeholderTextColor="#A9A9A9"
                        secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                        <Ionicons
                            name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                            size={20}
                            color="#757575"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>

                {/* --- TOMBOL LOGIN --- */}
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                {/* --- KOTAK INFORMASI --- */}
                {/*<View style={styles.infoBox}>*/}
                {/*    <Ionicons name="information-circle" size={24} color="#FFA500" />*/}
                {/*    <Text style={styles.infoText}>*/}
                {/*        Aplikasi ini bersifat terbatas, untuk pendaftaran, support dan kendala silahkan hubungi Building Management*/}
                {/*    </Text>*/}
                {/*</View>*/}

                {/* --- VERSI APLIKASI --- */}
                <Text style={styles.versionText}>Versi 1.0.0</Text>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

// --- BAGIAN STYLING ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    logoPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#5CB85C',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    logoText: {
        color: '#FFFFFF',
        fontSize: 40,
        fontWeight: 'bold',
    },
    appName: {
        fontSize: 18,
        color: '#757575',
    },
    apartmentSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        marginBottom: 20,
    },
    apartmentText: {
        fontSize: 14,
        color: '#333333',
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FAFAFA',
        height: 50,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#333333',
    },
    icon: {
        marginLeft: 10,
    },
    loginButton: {
        backgroundColor: '#0F5B44',
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoBox: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#FFA500',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    infoText: {
        flex: 1,
        fontSize: 10,
        color: '#555555',
        marginLeft: 10,
    },
    versionText: {
        textAlign: 'center',
        fontSize: 10,
        color: '#A9A9A9',
    },
});