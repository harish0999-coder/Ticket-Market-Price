import React, { useState } from 'react';
import LayoutWrapper from './components/layout/LayoutWrapper';
import DashboardPage from './pages/DashboardPage';
import TicketsPage from './pages/TicketsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CommunityPage from './pages/CommunityPage';
import SettingsPage from './pages/SettingsPage';

const pages = {
  dashboard: DashboardPage,
  tickets: TicketsPage,
  analytics: AnalyticsPage,
  community: CommunityPage,
  settings: SettingsPage,
  help: SettingsPage,
};

export default function App() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [search, setSearch] = useState('');

  const PageComponent = pages[activeNav] || DashboardPage;

  return (
    <LayoutWrapper
      activeNav={activeNav}
      onNavChange={(nav) => { setActiveNav(nav); setSearch(''); }}
      searchValue={search}
      onSearchChange={setSearch}
    >
      <PageComponent searchValue={search} />
    </LayoutWrapper>
  );
}
