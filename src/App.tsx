import React, { useState, useEffect } from 'react';
import { Cafe, ScreenName, TabName, DeviceMode, UserProfile } from './types';
import {
  INITIAL_USER,
  MOCK_CAFES,
  MOCK_DISTRICTS,
  MOCK_CUPPING_POSTS,
  MOCK_BADGES
} from './data/mockData';
import { DeviceFrame } from './components/DeviceFrame';
import { TopHeader } from './components/TopHeader';
import { BottomNavBar } from './components/BottomNavBar';
import { WelcomeOnboardingScreen } from './screens/WelcomeOnboardingScreen';
import { SignInScreen } from './screens/SignInScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { VerifyCodeScreen } from './screens/VerifyCodeScreen';
import { HomeScreen } from './screens/HomeScreen';
import { MapScreen } from './screens/MapScreen';
import { CafeDetailScreen } from './screens/CafeDetailScreen';
import { LogVisitScreen } from './screens/LogVisitScreen';
import { DistrictSelectorScreen } from './screens/DistrictSelectorScreen';
import { AIMatchmakerScreen } from './screens/AIMatchmakerScreen';
import { CommunityScreen } from './screens/CommunityScreen';
import { PassportScreen } from './screens/PassportScreen';
import { AchievementsScreen } from './screens/AchievementsScreen';
import { UserProfileScreen } from './screens/UserProfileScreen';
import { PerkVoucherScreen } from './screens/PerkVoucherScreen';
import { BeanStoryScreen } from './screens/BeanStoryScreen';
import { CounterSessionScreen } from './screens/CounterSessionScreen';
import { ReactNativeCodeModal } from './screens/ReactNativeCodeModal';
import { api } from './services/api';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('home');
  const [navigationHistory, setNavigationHistory] = useState<ScreenName[]>(['home']);
  const [activeTab, setActiveTab] = useState<TabName>('home');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('ios');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  // Cafes state backed by SQLite backend API
  const [cafes, setCafes] = useState<Cafe[]>(MOCK_CAFES);

  // App States with LocalStorage Persistence & API Synchronization
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('kopifinder_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [selectedDistrict, setSelectedDistrict] = useState<string>(() => {
    return localStorage.getItem('kopifinder_district') || 'Senopati, South Jakarta';
  });

  const [selectedCafeId, setSelectedCafeId] = useState<string>('tanamera');

  const [savedCafeIds, setSavedCafeIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kopifinder_saved_cafes');
      return saved ? JSON.parse(saved) : ['tanamera', 'giyanti'];
    } catch {
      return ['tanamera', 'giyanti'];
    }
  });

  const [stamps, setStamps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kopifinder_stamps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Fetch initial data from SQLite REST API
  useEffect(() => {
    api
      .getCafes()
      .then((data) => {
        if (data && data.length > 0) {
          setCafes(data);
        }
      })
      .catch((err) => console.log('Using local cafes (backend syncing):', err));

    api
      .getUser()
      .then((userData: any) => {
        if (userData) {
          setUser((prev) => ({
            ...prev,
            name: userData.name || prev.name,
            avatar: userData.avatar || prev.avatar,
            level: userData.level || prev.level,
            perkPoints: userData.perkPoints ?? prev.perkPoints,
            cafesVisited: userData.cafesVisited ?? prev.cafesVisited,
            roasterStamps: userData.roasterStamps ?? prev.roasterStamps,
            reviewsLogged: userData.reviewsLogged ?? prev.reviewsLogged,
          }));
          if (userData.stamps && userData.stamps.length > 0) {
            setStamps(userData.stamps);
          }
          if (userData.savedCafeIds && userData.savedCafeIds.length > 0) {
            setSavedCafeIds(userData.savedCafeIds);
          }
        }
      })
      .catch((err) => console.log('Using local user stats:', err));
  }, []);

  // Sync states to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('kopifinder_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('kopifinder_saved_cafes', JSON.stringify(savedCafeIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedCafeIds]);

  useEffect(() => {
    try {
      localStorage.setItem('kopifinder_stamps', JSON.stringify(stamps));
    } catch (e) {
      console.error(e);
    }
  }, [stamps]);

  useEffect(() => {
    try {
      localStorage.setItem('kopifinder_district', selectedDistrict);
    } catch (e) {
      console.error(e);
    }
  }, [selectedDistrict]);

  // Navigation handlers
  const navigateTo = (screen: ScreenName) => {
    setNavigationHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);

    // Sync tab if applicable
    if (['home', 'map', 'ai-rec', 'community', 'passport'].includes(screen)) {
      setActiveTab(screen as TabName);
    }
  };

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const nextHistory = [...navigationHistory];
      nextHistory.pop();
      const previous = nextHistory[nextHistory.length - 1];
      setNavigationHistory(nextHistory);
      setCurrentScreen(previous);

      if (['home', 'map', 'ai-rec', 'community', 'passport'].includes(previous)) {
        setActiveTab(previous as TabName);
      }
    } else {
      navigateTo('home');
    }
  };

  const handleTabChange = (tab: TabName) => {
    setActiveTab(tab);
    navigateTo(tab as ScreenName);
  };

  const handleToggleSaveCafe = (cafeId: string) => {
    setSavedCafeIds((prev) =>
      prev.includes(cafeId) ? prev.filter((id) => id !== cafeId) : [...prev, cafeId]
    );
    api.toggleBookmark(cafeId).catch(console.error);
  };

  const handleSelectCafe = (cafeId: string) => {
    setSelectedCafeId(cafeId);
    navigateTo('cafe-detail');
  };

  const handleAddStamp = (stampName: string) => {
    if (!stamps.includes(stampName)) {
      setStamps((prev) => [...prev, stampName]);
      setUser((prev) => ({
        ...prev,
        cafesVisited: prev.cafesVisited + 1,
        perkPoints: prev.perkPoints + 150,
        reviewsLogged: prev.reviewsLogged + 1,
        roasterStamps: prev.roasterStamps + 1
      }));
      api.claimStamp(selectedCafeId, stampName).catch(console.error);
    }
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  // Find active cafe object from live DB state
  const activeCafe = cafes.find((c) => c.id === selectedCafeId) || cafes[0] || MOCK_CAFES[0];

  // Determine which tab to highlight based on current screen
  const getActiveTab = (): TabName => {
    if (currentScreen === 'map') return 'map';
    if (currentScreen === 'ai-rec') return 'ai-rec';
    if (currentScreen === 'community') return 'community';
    if (
      ['passport', 'achievements', 'voucher', 'counter-session', 'log-visit'].includes(
        currentScreen
      )
    ) {
      return 'passport';
    }
    return 'home';
  };

  const effectiveActiveTab = getActiveTab();

  // Show bottom nav bar across all screens so the user can always navigate at any time
  const showBottomNav = currentScreen !== 'welcome';

  return (
    <DeviceFrame
      deviceMode={deviceMode}
      onDeviceChange={setDeviceMode}
      currentScreen={currentScreen}
      onScreenChange={navigateTo}
      onOpenCodeModal={() => setIsCodeModalOpen(true)}
    >
      <div className="flex-1 w-full h-full overflow-hidden relative flex flex-col bg-[#fdf9f3]">
        {/* Top Header */}
        <TopHeader
          currentScreen={currentScreen}
          selectedDistrict={selectedDistrict}
          onNavigate={navigateTo}
          onGoBack={goBack}
          onOpenDistrictPicker={() => navigateTo('districts')}
          onOpenProfile={() => navigateTo('profile')}
          userAvatar={user.avatar}
        />

        {/* Screen Routing Content */}
        <div className="flex-1 w-full overflow-y-auto no-scrollbar relative flex flex-col">
          {currentScreen === 'welcome' && (
            <WelcomeOnboardingScreen onNavigate={navigateTo} />
          )}

          {currentScreen === 'signin' && (
            <SignInScreen
              onNavigate={navigateTo}
              onLoginSuccess={() => navigateTo('home')}
            />
          )}

          {currentScreen === 'signup' && (
            <SignUpScreen
              onNavigate={navigateTo}
              onSignUpSuccess={() => navigateTo('home')}
            />
          )}

          {currentScreen === 'verify-code' && (
            <VerifyCodeScreen onNavigate={navigateTo} />
          )}

          {currentScreen === 'home' && (
            <HomeScreen
              cafes={cafes}
              savedCafeIds={savedCafeIds}
              selectedDistrict={selectedDistrict}
              onToggleSaveCafe={handleToggleSaveCafe}
              onSelectCafe={handleSelectCafe}
              onNavigate={navigateTo}
            />
          )}

          {currentScreen === 'map' && (
            <MapScreen
              cafes={cafes}
              savedCafeIds={savedCafeIds}
              onToggleSaveCafe={handleToggleSaveCafe}
              onSelectCafe={handleSelectCafe}
              onNavigate={navigateTo}
            />
          )}

          {currentScreen === 'cafe-detail' && (
            <CafeDetailScreen
              cafe={activeCafe}
              isSaved={savedCafeIds.includes(activeCafe.id)}
              onToggleSave={() => handleToggleSaveCafe(activeCafe.id)}
              onNavigate={navigateTo}
            />
          )}

          {currentScreen === 'log-visit' && (
            <LogVisitScreen
              cafe={activeCafe}
              onNavigate={navigateTo}
              onSubmitLog={handleAddStamp}
            />
          )}

          {currentScreen === 'districts' && (
            <DistrictSelectorScreen
              districts={MOCK_DISTRICTS}
              selectedDistrict={selectedDistrict}
              onSelectDistrict={(d) => setSelectedDistrict(d)}
              onNavigate={navigateTo}
            />
          )}

          {currentScreen === 'ai-rec' && (
            <AIMatchmakerScreen
              cafes={cafes}
              onNavigate={navigateTo}
              onSelectCafe={handleSelectCafe}
            />
          )}

          {currentScreen === 'community' && (
            <CommunityScreen
              posts={MOCK_CUPPING_POSTS}
              userAvatar={user.avatar}
              onNavigate={navigateTo}
            />
          )}

          {currentScreen === 'passport' && (
            <PassportScreen
              user={user}
              stamps={stamps}
              onNavigate={navigateTo}
            />
          )}

          {currentScreen === 'achievements' && (
            <AchievementsScreen
              badges={MOCK_BADGES}
              onNavigate={navigateTo}
            />
          )}

          {currentScreen === 'profile' && (
            <UserProfileScreen
              user={user}
              onUpdateUser={handleUpdateUser}
              onNavigate={navigateTo}
            />
          )}

          {currentScreen === 'voucher' && (
            <PerkVoucherScreen onNavigate={navigateTo} />
          )}

          {currentScreen === 'bean-story' && (
            <BeanStoryScreen
              onNavigate={navigateTo}
              onSelectCafe={handleSelectCafe}
            />
          )}

          {currentScreen === 'counter-session' && (
            <CounterSessionScreen
              onNavigate={navigateTo}
              onStampCollected={() => handleAddStamp('Two Roasters Senopati')}
            />
          )}
        </div>

        {/* Persistent Bottom Tab Bar */}
        {showBottomNav && (
          <BottomNavBar activeTab={effectiveActiveTab} onTabChange={handleTabChange} />
        )}
      </div>

      {/* React Native Code Architecture Modal */}
      <ReactNativeCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </DeviceFrame>
  );
}
