import React, { useState } from 'react';
import JSZip from 'jszip';

interface ReactNativeCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReactNativeCodeModal: React.FC<ReactNativeCodeModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<string>('App.js');
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [zipSuccess, setZipSuccess] = useState(false);

  if (!isOpen) return null;

  const projectFiles: Record<string, string> = {
    'package.json': `{
  "name": "kopifinder-mobile",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~51.0.0",
    "expo-status-bar": "~1.12.1",
    "react": "18.2.0",
    "react-native": "0.74.1",
    "react-native-safe-area-context": "4.10.1",
    "react-native-svg": "15.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },
  "private": true
}`,
    'App.js': `// App.js - KopiFinder React Native
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { HomeScreen } from './screens/HomeScreen';
import { MapScreen } from './screens/MapScreen';
import { AIMatchmakerScreen } from './screens/AIMatchmakerScreen';
import { CommunityScreen } from './screens/CommunityScreen';
import { PassportScreen } from './screens/PassportScreen';
import { CafeDetailScreen } from './screens/CafeDetailScreen';
import { BeanStoryScreen } from './screens/BeanStoryScreen';
import { CounterSessionScreen } from './screens/CounterSessionScreen';
import { MOCK_CAFES, INITIAL_USER } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedCafe, setSelectedCafe] = useState(MOCK_CAFES[0]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'cafe-detail':
        return <CafeDetailScreen cafe={selectedCafe} onBack={() => setCurrentScreen('home')} />;
      case 'bean-story':
        return <BeanStoryScreen onBack={() => setCurrentScreen('home')} />;
      case 'counter-session':
        return <CounterSessionScreen onBack={() => setCurrentScreen('passport')} />;
      case 'map':
        return <MapScreen cafes={MOCK_CAFES} onSelectCafe={(c) => { setSelectedCafe(c); setCurrentScreen('cafe-detail'); }} />;
      case 'ai-rec':
        return <AIMatchmakerScreen onSelectCafe={() => { setSelectedCafe(MOCK_CAFES[3]); setCurrentScreen('cafe-detail'); }} />;
      case 'community':
        return <CommunityScreen />;
      case 'passport':
        return <PassportScreen user={INITIAL_USER} onOpenSession={() => setCurrentScreen('counter-session')} />;
      case 'home':
      default:
        return (
          <HomeScreen
            cafes={MOCK_CAFES}
            onSelectCafe={(c) => { setSelectedCafe(c); setCurrentScreen('cafe-detail'); }}
            onOpenBeanStory={() => setCurrentScreen('bean-story')}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'} backgroundColor="#fdf9f3" />
      
      {/* Screen Body */}
      <View style={styles.screenWrapper}>
        {renderScreen()}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        {[
          { id: 'home', label: 'Home', icon: 'explore' },
          { id: 'map', label: 'Map', icon: 'location_on' },
          { id: 'ai-rec', label: 'AI Rec', icon: 'auto_awesome' },
          { id: 'community', label: 'Community', icon: 'forum' },
          { id: 'passport', label: 'Passport', icon: 'verified' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => {
                setActiveTab(tab.id);
                setCurrentScreen(tab.id);
              }}
              style={styles.tabButton}
            >
              <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                {tab.label}
              </Text>
              {isActive && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf9f3' },
  screenWrapper: { flex: 1 },
  bottomNav: {
    height: Platform.OS === 'ios' ? 76 : 64,
    paddingBottom: Platform.OS === 'ios' ? 16 : 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1ede7',
  },
  tabButton: { alignItems: 'center', justifyContent: 'center', minWidth: 56 },
  tabLabel: { fontSize: 11, color: '#504442', fontWeight: '500' },
  activeTabLabel: { color: '#271310', fontWeight: '700' },
  activeDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#7d562d', marginTop: 3 },
});`,
    'screens/HomeScreen.js': `// screens/HomeScreen.js - React Native
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

export function HomeScreen({ cafes, onSelectCafe, onOpenBeanStory }) {
  const [selectedChip, setSelectedChip] = useState('Study & Work');
  const chips = ['All Cafes', 'Study & Work', 'Date Spot', 'Chill & Read', 'Photoshoot', 'Artisan Roaster'];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Search Header */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search artisanal beans, quiet cafes..."
          placeholderTextColor="#827472"
          style={styles.searchInput}
        />
      </View>

      {/* Mood Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
        {chips.map((chip) => (
          <TouchableOpacity
            key={chip}
            onPress={() => setSelectedChip(chip)}
            style={[styles.chip, selectedChip === chip && styles.activeChip]}
          >
            <Text style={[styles.chipText, selectedChip === chip && styles.activeChipText]}>
              {chip}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sponsored Flash Perk */}
      <TouchableOpacity onPress={onOpenBeanStory} style={styles.sponsoredCard}>
        <View style={styles.sponsoredText}>
          <Text style={styles.sponsoredBadge}>SPONSORED PERK</Text>
          <Text style={styles.sponsoredTitle}>Two Roasters • B1G1 Manual Brew</Text>
          <Text style={styles.sponsoredSub}>Flash deal today for KopiFinder members only</Text>
        </View>
        <Image
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGanJrqx648dAo9BkyFso6xcTE_nZKumHfLfekYFiUYV-LfaVtBxTbmjpvLBM6zKiMfpCvphA26tzgcjOJGLPI3dfVYW6CPfswZGh-3nZsTVokBoLbCdsb70aBBKhbsDPTrwEQKQspvlvnVpnalKC6fSlB9w6Eo7RRotfu3nB_3QUeOIHQbsaRMB_E4a5kFkik6eZJ0HmUzaJuANh36yBfN9qlotY92eOYxBElZohF-90fvKQGyRq11A' }}
          style={styles.sponsoredImage}
        />
      </TouchableOpacity>

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Trending Near You</Text>
        <Text style={styles.sectionSub}>Selected by local roasters & remote workers</Text>
      </View>

      {/* Cafe Cards */}
      {cafes.map((cafe) => (
        <TouchableOpacity
          key={cafe.id}
          onPress={() => onSelectCafe(cafe)}
          style={styles.card}
        >
          <Image source={{ uri: cafe.images[0] }} style={styles.cardImage} />
          <View style={styles.cardBody}>
            <View style={styles.cardHeader}>
              <Text style={styles.cafeName}>{cafe.name}</Text>
              <Text style={styles.cafePrice}>{cafe.priceRange}</Text>
            </View>
            <Text style={styles.cafeRating}>{cafe.rating}★ ({cafe.reviewCount} reviews) • {cafe.neighborhood}</Text>
            
            {/* 5-Aspect Scores */}
            <View style={styles.aspectGrid}>
              <View style={styles.aspectBox}>
                <Text style={styles.aspectLabel}>Coffee</Text>
                <Text style={styles.aspectVal}>{cafe.aspectRatings.coffee}★</Text>
              </View>
              <View style={styles.aspectBox}>
                <Text style={styles.aspectLabel}>Vibe</Text>
                <Text style={styles.aspectVal}>{cafe.aspectRatings.vibe}★</Text>
              </View>
              <View style={styles.aspectBox}>
                <Text style={styles.aspectLabel}>Wi-Fi</Text>
                <Text style={styles.aspectValGreen}>{cafe.aspectRatings.wifiSpeed}</Text>
              </View>
              <View style={styles.aspectBox}>
                <Text style={styles.aspectLabel}>Plugs</Text>
                <Text style={styles.aspectVal}>{cafe.aspectRatings.plugs}</Text>
              </View>
              <View style={styles.aspectBox}>
                <Text style={styles.aspectLabel}>Service</Text>
                <Text style={styles.aspectVal}>{cafe.aspectRatings.service}★</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf9f3' },
  content: { padding: 16, paddingBottom: 80 },
  searchBar: { backgroundColor: '#f7f3ed', borderRadius: 24, paddingHorizontal: 16, height: 46, justifyContent: 'center' },
  searchInput: { fontSize: 13, color: '#1c1c18' },
  chipsScroll: { marginVertical: 12 },
  chip: { backgroundColor: '#ffffff', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8, borderWidth: 1, borderColor: '#e6e2dc' },
  activeChip: { backgroundColor: '#3e2723', borderColor: '#3e2723' },
  chipText: { fontSize: 12, fontWeight: '600', color: '#1c1c18' },
  activeChipText: { color: '#ffffff' },
  sponsoredCard: { backgroundColor: '#ebe8e2', borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  sponsoredText: { flex: 1, paddingRight: 8 },
  sponsoredBadge: { fontSize: 10, fontWeight: '800', color: '#7a532a', backgroundColor: '#ffca98', alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10, marginBottom: 4 },
  sponsoredTitle: { fontSize: 14, fontWeight: '700', color: '#271310' },
  sponsoredSub: { fontSize: 11, color: '#504442', marginTop: 2 },
  sponsoredImage: { width: 70, height: 70, borderRadius: 12 },
  sectionHeader: { marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#271310' },
  sectionSub: { fontSize: 12, color: '#504442' },
  card: { backgroundColor: '#ffffff', borderRadius: 16, marginBottom: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#f1ede7' },
  cardImage: { width: '100%', height: 160 },
  cardBody: { padding: 14 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cafeName: { fontSize: 15, fontWeight: '700', color: '#271310', flex: 1 },
  cafePrice: { fontSize: 11, fontWeight: '700', color: '#7d562d' },
  cafeRating: { fontSize: 12, color: '#504442', marginTop: 4 },
  aspectGrid: { flexDirection: 'row', backgroundColor: '#f7f3ed', borderRadius: 12, padding: 8, marginTop: 10, justifyContent: 'space-between' },
  aspectBox: { alignItems: 'center' },
  aspectLabel: { fontSize: 9, color: '#504442' },
  aspectVal: { fontSize: 11, fontWeight: '700', color: '#271310', marginTop: 2 },
  aspectValGreen: { fontSize: 11, fontWeight: '700', color: '#7ca034', marginTop: 2 },
});`,
    'screens/CafeDetailScreen.js': `// screens/CafeDetailScreen.js - React Native
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export function CafeDetailScreen({ cafe, onBack }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroContainer}>
        <Image source={{ uri: cafe.images[0] }} style={styles.heroImage} />
        <View style={styles.verifiedBadge}>
          <Text style={styles.verifiedText}>VERIFIED ROASTER</Text>
        </View>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.padding}>
        <Text style={styles.title}>{cafe.name}</Text>
        <Text style={styles.address}>{cafe.address} • 400m</Text>

        <View style={styles.specsRow}>
          <View style={styles.specCard}>
            <Text style={styles.specLabel}>PRICE</Text>
            <Text style={styles.specVal}>35k - 65k</Text>
            <Text style={styles.specSub}>IDR / cup avg</Text>
          </View>
          <View style={styles.specCard}>
            <Text style={styles.specLabel}>WI-FI</Text>
            <Text style={styles.specVal}>110 Mbps</Text>
            <Text style={styles.specSub}>Dedicated Fiber</Text>
          </View>
          <View style={styles.specCard}>
            <Text style={styles.specLabel}>NOISE</Text>
            <Text style={styles.specVal}>54 dB</Text>
            <Text style={styles.specSub}>Moderate Chill</Text>
          </View>
        </View>

        {/* Rating Dashboard */}
        <View style={styles.ratingCard}>
          <Text style={styles.ratingScore}>4.8★ Master Grade Cafe</Text>
          <Text style={styles.ratingSub}>Based on 342 verified bean lovers</Text>
        </View>

        {/* Menu Preview */}
        <Text style={styles.menuHeading}>Craft Brews & Bites</Text>
        {cafe.menu.map((item) => (
          <View key={item.id} style={styles.menuItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuName}>{item.name}</Text>
              <Text style={styles.menuDesc}>{item.description}</Text>
            </View>
            <Text style={styles.menuPrice}>{item.price}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf9f3' },
  content: { paddingBottom: 80 },
  heroContainer: { width, height: 240, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  verifiedBadge: { position: 'absolute', top: 16, left: 16, backgroundColor: '#c8f17a', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  verifiedText: { fontSize: 10, fontWeight: '700', color: '#131f00' },
  backBtn: { position: 'absolute', top: 16, right: 16, backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  backText: { fontSize: 12, fontWeight: '700', color: '#271310' },
  padding: { padding: 16 },
  title: { fontSize: 20, fontWeight: '700', color: '#271310' },
  address: { fontSize: 12, color: '#504442', marginTop: 4 },
  specsRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 14 },
  specCard: { flex: 1, backgroundColor: '#f7f3ed', padding: 10, borderRadius: 12, marginHorizontal: 3 },
  specLabel: { fontSize: 9, fontWeight: '700', color: '#7d562d' },
  specVal: { fontSize: 13, fontWeight: '700', color: '#271310', marginTop: 2 },
  specSub: { fontSize: 9, color: '#504442' },
  ratingCard: { backgroundColor: '#ffffff', padding: 14, borderRadius: 14, marginVertical: 10, borderWidth: 1, borderColor: '#e6e2dc' },
  ratingScore: { fontSize: 15, fontWeight: '700', color: '#271310' },
  ratingSub: { fontSize: 11, color: '#504442', marginTop: 2 },
  menuHeading: { fontSize: 16, fontWeight: '700', color: '#271310', marginTop: 14, marginBottom: 8 },
  menuItem: { backgroundColor: '#ffffff', padding: 12, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, borderWidth: 1, borderColor: '#f1ede7' },
  menuName: { fontSize: 13, fontWeight: '700', color: '#271310' },
  menuDesc: { fontSize: 11, color: '#504442', marginTop: 2 },
  menuPrice: { fontSize: 13, fontWeight: '700', color: '#271310', marginLeft: 8 },
});`,
    'screens/PassportScreen.js': `// screens/PassportScreen.js - React Native
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export function PassportScreen({ user, onOpenSession }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileCard}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userRole}>Lvl {user.level} • {user.levelTitle}</Text>
        <View style={styles.statsGrid}>
          <Text style={styles.statItem}>{user.cafesVisited} Visited</Text>
          <Text style={styles.statItem}>{user.roasterStamps} Stamps</Text>
          <Text style={styles.statItem}>{user.reviewsLogged} Reviews</Text>
        </View>
      </View>

      {/* 6-Slot Digital Stamps */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Artisanal Coffee Passport</Text>
        <Text style={styles.cardSub}>South Jakarta Edition • Collect 5 for perks</Text>

        <View style={styles.stampsGrid}>
          {['Tanamera', 'Giyanti', 'Anomali', 'Kroma'].map((name, i) => (
            <View key={i} style={styles.stampSlot}>
              <Text style={styles.stampStatus}>✓ STAMPED</Text>
              <Text style={styles.stampName}>{name}</Text>
            </View>
          ))}
          <View style={[styles.stampSlot, styles.dashedSlot]}>
            <Text style={styles.stampAdd}>+ 1 Left</Text>
            <Text style={styles.stampPerk}>Free V60</Text>
          </View>
        </View>
      </View>

      {/* Reward Card */}
      <TouchableOpacity onPress={onOpenSession} style={styles.voucherCard}>
        <Text style={styles.voucherBadge}>REWARD READY</Text>
        <Text style={styles.voucherTitle}>Free Single-Origin V60 Pour-over</Text>
        <Text style={styles.voucherSub}>Tap to open Barista Scanner & Live QR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf9f3' },
  content: { padding: 16, paddingBottom: 80 },
  profileCard: { backgroundColor: '#ffffff', padding: 16, borderRadius: 16, marginBottom: 16 },
  userName: { fontSize: 18, fontWeight: '700', color: '#271310' },
  userRole: { fontSize: 12, color: '#7d562d', marginTop: 2 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, backgroundColor: '#f7f3ed', padding: 10, borderRadius: 12 },
  statItem: { fontSize: 12, fontWeight: '700', color: '#271310' },
  card: { backgroundColor: '#ffffff', padding: 16, borderRadius: 16, marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#271310' },
  cardSub: { fontSize: 12, color: '#504442', marginTop: 2, marginBottom: 12 },
  stampsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  stampSlot: { width: '31%', backgroundColor: '#f7f3ed', padding: 10, borderRadius: 12, alignItems: 'center', marginBottom: 8 },
  stampStatus: { fontSize: 9, fontWeight: '800', color: '#ba1a1a' },
  stampName: { fontSize: 11, fontWeight: '700', color: '#271310', marginTop: 4 },
  dashedSlot: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#7d562d', borderStyle: 'dashed' },
  stampAdd: { fontSize: 11, fontWeight: '700', color: '#7d562d' },
  stampPerk: { fontSize: 9, color: '#ba1a1a', fontWeight: '700' },
  voucherCard: { backgroundColor: '#271310', padding: 16, borderRadius: 16 },
  voucherBadge: { backgroundColor: '#7d562d', color: '#ffffff', fontSize: 9, fontWeight: '800', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginBottom: 6 },
  voucherTitle: { fontSize: 15, fontWeight: '700', color: '#ffdad4' },
  voucherSub: { fontSize: 12, color: '#d3c3c0', marginTop: 4 },
});`,
    'screens/CounterSessionScreen.js': `// screens/CounterSessionScreen.js - React Native
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export function CounterSessionScreen({ onBack }) {
  const [seconds, setSeconds] = useState(585);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return \`\${String(m).padStart(2, '0')}:\${String(s).padStart(2, '0')}\`;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Active Counter Session</Text>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.closeBtn}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timerCard}>
        <Text style={styles.timerSub}>AUTO-EXPIRING SESSION</Text>
        <Text style={styles.timerVal}>{formatTime()}</Text>
      </View>

      <View style={styles.ticketCard}>
        <Text style={styles.ticketTitle}>Buy 1 Get 1 Manual Brew</Text>
        <Text style={styles.ticketSub}>Present directly to Barista Scanner</Text>
        
        {/* Mock QR Placeholder */}
        <View style={styles.qrPlaceholder}>
          <Text style={styles.qrText}>[ SCANNABLE QR CODE ]</Text>
          <Text style={styles.voucherCode}>#TF-B1G1-8921-JKT</Text>
          <Text style={styles.pinCode}>Staff PIN Override: 8921</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => setVerified(true)}
        style={[styles.baristaBtn, verified && styles.baristaBtnVerified]}
      >
        <Text style={styles.baristaBtnText}>
          {verified ? '✓ Verified by Cashier (POS-01)' : 'Barista: Tap to Confirm Stamp'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf9f3' },
  content: { padding: 16, paddingBottom: 80 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  headerTitle: { fontSize: 14, fontWeight: '700', color: '#7d562d' },
  closeBtn: { fontSize: 18, color: '#271310', padding: 4 },
  timerCard: { backgroundColor: '#3e2723', padding: 14, borderRadius: 14, marginBottom: 16 },
  timerSub: { fontSize: 9, fontWeight: '700', color: '#ffca98' },
  timerVal: { fontSize: 20, fontWeight: '700', color: '#ffffff', marginTop: 2 },
  ticketCard: { backgroundColor: '#ffffff', padding: 16, borderRadius: 16, alignItems: 'center', marginBottom: 16 },
  ticketTitle: { fontSize: 16, fontWeight: '700', color: '#271310' },
  ticketSub: { fontSize: 11, color: '#504442', marginTop: 2, marginBottom: 12 },
  qrPlaceholder: { backgroundColor: '#f7f3ed', padding: 24, borderRadius: 16, width: '100%', alignItems: 'center' },
  qrText: { fontSize: 14, fontWeight: '700', color: '#271310' },
  voucherCode: { fontSize: 14, fontWeight: '700', color: '#7d562d', marginTop: 10, letterSpacing: 1 },
  pinCode: { fontSize: 11, color: '#504442', marginTop: 4 },
  baristaBtn: { backgroundColor: '#271310', padding: 14, borderRadius: 14, alignItems: 'center' },
  baristaBtnVerified: { backgroundColor: '#c8f17a' },
  baristaBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 13 },
});`,
    'screens/BeanStoryScreen.js': `// screens/BeanStoryScreen.js - React Native
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

export function BeanStoryScreen({ onBack }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backText}>← Back to Feed</Text>
      </TouchableOpacity>

      <Text style={styles.edition}>DAILY STAFF PICK • MONDAY EDITION</Text>
      <Text style={styles.title}>Flores Bajawa Anaerobic Natural</Text>
      <Text style={styles.roaster}>Roasted by Anomali Coffee Roastery • Jakarta</Text>

      {/* Terroir & Varietal */}
      <View style={styles.detailsCard}>
        <Text style={styles.detailsHeading}>Terroir & Craft Details</Text>
        <Text style={styles.detailsText}>Bajawa, Flores (1,400 - 1,550m MASL)</Text>
        <Text style={styles.detailsText}>Varietal: Kartika & S-795 (Heritage volcanic soil)</Text>
        <Text style={styles.detailsText}>Process: 72-Hour Anaerobic Slow Dry Natural</Text>
      </View>

      {/* Dialed Recipe */}
      <View style={styles.recipeCard}>
        <Text style={styles.recipeTitle}>Barista's Dialed Recipe (Hot V60)</Text>
        <Text style={styles.recipeSub}>Dose: 1:15 (15g to 225g) • Temp: 92°C • Time: 2m 45s</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf9f3' },
  content: { padding: 16, paddingBottom: 80 },
  backBtn: { marginBottom: 12 },
  backText: { fontSize: 13, fontWeight: '700', color: '#7d562d' },
  edition: { fontSize: 10, fontWeight: '800', color: '#7d562d' },
  title: { fontSize: 22, fontWeight: '700', color: '#271310', marginTop: 4 },
  roaster: { fontSize: 12, color: '#504442', marginTop: 2, marginBottom: 16 },
  detailsCard: { backgroundColor: '#ffffff', padding: 14, borderRadius: 14, marginBottom: 14 },
  detailsHeading: { fontSize: 14, fontWeight: '700', color: '#271310', marginBottom: 6 },
  detailsText: { fontSize: 12, color: '#504442', marginVertical: 2 },
  recipeCard: { backgroundColor: '#271310', padding: 14, borderRadius: 14 },
  recipeTitle: { fontSize: 14, fontWeight: '700', color: '#ffffff' },
  recipeSub: { fontSize: 12, color: '#ffca98', marginTop: 4 },
});`,
    'data/mockData.js': `// data/mockData.js - React Native
export const INITIAL_USER = {
  name: 'Maya Putri',
  handle: '@mayabrews',
  level: 5,
  levelTitle: 'Jakarta Coffee Explorer',
  cafesVisited: 24,
  roasterStamps: 8,
  reviewsLogged: 14,
};

export const MOCK_CAFES = [
  {
    id: 'tanamera',
    name: 'Tanamera Specialty Roastery',
    address: 'Jl. Senopati No. 84, South Jakarta',
    neighborhood: 'Senopati',
    distance: '350m',
    priceRange: '$$ • Moderate',
    rating: 4.9,
    reviewCount: 342,
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAnsiSNdcWHKAHxZl-L1AtJPhQzwdS-dsxkLsZycNIgHoofI--fWcgeqLHknZcQ41B6LZvvY8FilR_MJmDvTKxWMY-mRTzDGWIOdTS4YRfGjHVYqAQeh_Kmi24mUrQT1kKX9zYWGHq_jYYeNP_6Kf37aTsGa8m4NCVeIwvSagN1-QNKTgYITw4f5IxXKAgG5HcOJOPMrHKPiqHQUm7yenbnhEqZmK81osZoA9_lJslRUXGX7phon5pVpQ'],
    aspectRatings: { coffee: 4.9, vibe: 4.8, wifiSpeed: '95M', plugs: 'Abundant', service: 4.7 },
    menu: [
      { id: 'm1', name: 'Aceh Gayo Anaerobic V60', price: 'IDR 48k', description: 'Light roast, tea-like finish' },
      { id: 'm2', name: 'Cold Drip Reserve', price: 'IDR 45k', description: 'Slow-extracted over iced volcanic water' }
    ]
  },
  {
    id: 'giyanti',
    name: 'Giyanti Coffee Roastery',
    address: 'Jl. Surabaya No. 20, Menteng',
    neighborhood: 'Menteng',
    distance: '1.2km',
    priceRange: '$$$ • Artisanal',
    rating: 4.8,
    reviewCount: 518,
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuA-r6NrO6H5tTWD5LG6BIh6be1kKKcLXUSDQW-HdC21NUrXNvFWr19Y_J9MH97lS8R1lv42mZb4sgs0EVB3CHaJ-6iOrGJ7d3z8JcpVQK7je-e94tURB0xgc6lCa3tvVJQCfIgzWZdbariUAiFxjnWLkcsIP_VKWAJGtZjTIpzRCzCBWYSBUH22q85dZDKacPVqy3-QYFMZV-DK7oxzim9GOTjXrxW3fuP2Rlryh_ZiRC67Fbg0LZ-67w'],
    aspectRatings: { coffee: 5.0, vibe: 4.9, wifiSpeed: '70M', plugs: 'Patio', service: 4.8 },
    menu: [
      { id: 'g1', name: 'Padang Solok Pourover', price: 'IDR 52k', description: 'Apricot, cinnamon, cane sugar' }
    ]
  },
  {
    id: 'anomali',
    name: 'Anomali Coffee Roastery',
    address: 'Jl. Senopati No. 19',
    neighborhood: 'Senopati',
    distance: '800m',
    priceRange: '$$ • Standard',
    rating: 4.7,
    reviewCount: 289,
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDPwyWU9n7KuM7Z1cTKXVSy9UvLXkJU7YGCNMGhzbNBoCwFX2DWJqnGKQ4yQyE24VbutJoPqZcMboEfgt_JeEtXkYHPSneLZMZQT4V_jkuyjRQHjZGfrdmjYX5XU6yEL7bIkJjyK9aXGnCZj9d9yDEWLXq-Nw0nl9u66Ask5wx_C7cON3ofOnOKIhp6xNnlOm4DiAzCDGOegciG12NVVb7DigVAZ6a4JyvmJg7dMIl5dz7HvIHdJrSI6A'],
    aspectRatings: { coffee: 4.8, vibe: 4.6, wifiSpeed: '120M', plugs: 'Every desk', service: 4.6 },
    menu: [
      { id: 'a1', name: 'Toraja Kalosi Single Origin', price: 'IDR 44k', description: 'Dark chocolate, herbal sweet cedar' }
    ]
  },
  {
    id: 'kroma',
    name: 'Kroma Studio & Roastery',
    address: 'Jl. Senopati Mezzanine No. 12',
    neighborhood: 'Senopati',
    distance: '450m',
    priceRange: '$$ • Moderate',
    rating: 4.9,
    reviewCount: 215,
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAqrNeL8DX5mFTL4NXDVsO5uUnasQxILGvjagIyVg35WOLip9Jfb2A2KDSG62iSo9u-OEkjQ0PjehMb6Ve5JAb6pWmJHfK-RcpZSi4aPQNgMvJtylAX7z8OFFMlzdzT7XN_SajLdT4ZIjgTAplm_BsuSmhyyMgex_5fJKfjUzBDjf7oM70jooa0z2gyaqB3xv6wF3sKYhB8LVYORSGNgJ2duDGnLbjrLTbi6sffmPkp0oSvIFJ0IaA2tg'],
    aspectRatings: { coffee: 4.9, vibe: 5.0, wifiSpeed: '118M', plugs: '100% Sockets', service: 4.8 },
    menu: [
      { id: 'k1', name: 'Kerinci Honey Pour-over', price: 'IDR 45k', description: 'Peach, jasmine, cane sugar' }
    ]
  }
];`,
    'README.md': `# KopiFinder - React Native Specialty Coffee App

A high-fidelity mobile app for Indonesian specialty coffee lovers, cupping notes, and digital roaster passport.

## Quick Start (Expo)
\`\`\`bash
# 1. Install dependencies
npm install

# 2. Run on iOS / Android simulator or physical phone via Expo Go
npx expo start
\`\`\`

## Features Included:
- **Home Discovery Feed:** Mood filters, trending roasters, and 5-aspect rating scores
- **Interactive Map:** Cafe pins and amenity filters
- **Cafe Detail Screen:** Tasting notes, roast profiles, and craft menus
- **Digital Passport:** 6-slot wax seal stamps and scannable barcode vouchers
- **Active Counter Session:** Live QR scanner with POS staff override PIN
- **Daily Staff Pick:** Flores Bajawa single origin story and dialed V60 recipe
- **Community Feed:** Cupping notes and speedtest reports
`
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(projectFiles[selectedFile] || '');
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingleFile = () => {
    const content = projectFiles[selectedFile] || '';
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.split('/').pop() || selectedFile;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Add all project files into the zip archive
      Object.keys(projectFiles).forEach((fileName) => {
        zip.file(fileName, projectFiles[fileName]);
      });

      // Generate the ZIP blob
      const zipBlob = await zip.generateAsync({ type: 'blob' });

      // Trigger automatic browser download
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'KopiFinder-ReactNative-Project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setZipSuccess(true);
      setTimeout(() => setZipSuccess(false), 3000);
    } catch (err) {
      alert('Gagal membuat file zip: ' + (err as Error).message);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#271310]/75 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#1c1c18] text-[#f4f0ea] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-[#3e2723]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title & Download Actions */}
        <div className="px-5 py-4 bg-[#271310] border-b border-[#3e2723] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3e2723] flex items-center justify-center text-[#ffca98] shadow-sm">
              <span className="material-symbols-outlined text-[22px]">folder_zip</span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                <span>Download React Native Project</span>
                <span className="bg-[#c8f17a] text-[#131f00] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Ready .zip
                </span>
              </h3>
              <p className="text-xs text-[#ffdcbd]">
                Semua file komponen iOS & Android siap diekstrak dan dijalankan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Download Entire Zip Button */}
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all ${
                zipSuccess
                  ? 'bg-[#c8f17a] text-[#131f00]'
                  : 'bg-[#ffca98] text-[#2c1600] hover:bg-[#ffdcbd]'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">
                {isZipping ? 'sync' : zipSuccess ? 'check_circle' : 'download'}
              </span>
              <span>
                {isZipping ? 'Membuat ZIP...' : zipSuccess ? 'Tersimpan!' : 'Download All (.zip)'}
              </span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-2 rounded-xl bg-[#3e2723] hover:bg-[#5b403c] text-white text-xs font-bold flex items-center gap-1 border border-[#7d562d] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#3e2723] text-white flex items-center justify-center hover:bg-[#5b403c] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* File Tabs Horizontal Scroll */}
        <div className="flex items-center gap-1 px-4 py-2 bg-[#181312] border-b border-[#3e2723] overflow-x-auto no-scrollbar">
          {Object.keys(projectFiles).map((fileName) => (
            <button
              key={fileName}
              onClick={() => setSelectedFile(fileName)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition-all ${
                selectedFile === fileName
                  ? 'bg-[#ffca98] text-[#2c1600]'
                  : 'text-[#d3c3c0] hover:text-white hover:bg-[#271310]'
              }`}
            >
              {fileName}
            </button>
          ))}
        </div>

        {/* Action ribbon for current file */}
        <div className="px-5 py-2 bg-[#271310]/60 flex items-center justify-between text-xs text-[#ae8d87] border-b border-[#3e2723]">
          <span className="font-mono text-white font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#ffca98]">description</span>
            {selectedFile}
          </span>
          <button
            onClick={handleDownloadSingleFile}
            className="text-xs text-[#ffdcbd] hover:underline flex items-center gap-1 font-semibold"
          >
            <span className="material-symbols-outlined text-[14px]">file_download</span>
            Download File Ini Saja
          </button>
        </div>

        {/* Code Content Box */}
        <div className="flex-1 p-4 overflow-auto font-mono text-xs leading-relaxed bg-[#141412] text-[#e6e2dc] select-text">
          <pre>{projectFiles[selectedFile]}</pre>
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 bg-[#181312] border-t border-[#3e2723] flex items-center justify-between text-[11px] text-[#d3c3c0]">
          <span>Format: Full React Native (Expo & Bare Workflow Ready)</span>
          <span className="text-[#ffca98]">17 Screens + Mock Data Included</span>
        </div>
      </div>
    </div>
  );
};
