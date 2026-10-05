import React, { useState } from 'react';
import { ScreenName, TabName, DeviceMode, UserProfile } from './types';
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

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('home');
  const [navigationHistory, setNavigationHistory] = useState<ScreenName[]>(['home']);
  const [activeTab, setActiveTab] = useState<TabName>('home');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('ios');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  // App States
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [selectedDistrict, setSelectedDistrict] = useState('Senopati, South Jakarta');
  const [selectedCafeId, setSelectedCafeId] = useState('tanamera');
  const [savedCafeIds, setSavedCafeIds] = useState<string[]>(['tanamera', 'giyanti']);
  const [stamps, setStamps] = useState<string[]>([]);

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
  };

  const handleSelectCafe = (cafeId: string) => {
    setSelectedCafeId(cafeId);
    navigateTo('cafe-detail');
  };

  const handleAddStamp = (stampName: string) => {
    if (!stamps.includes(stampName)) {
      setStamps((prev) => [...prev, stampName]);
    }
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  // Find active cafe object
  const activeCafe = MOCK_CAFES.find((c) => c.id === selectedCafeId) || MOCK_CAFES[0];

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
              cafes={MOCK_CAFES}
              savedCafeIds={savedCafeIds}
              onToggleSaveCafe={handleToggleSaveCafe}
              onSelectCafe={handleSelectCafe}
              onNavigate={navigateTo}
            />
          )}

          {currentScreen === 'map' && (
            <MapScreen
              cafes={MOCK_CAFES}
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
