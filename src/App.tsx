import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import ChatPage from '@/pages/ChatPage';
import ResourcesPage from '@/pages/ResourcesPage';
import MissionPage from '@/pages/MissionPage';
import WhyPage from '@/pages/WhyPage';
import HowItWorksPage from '@/pages/HowItWorksPage';
import Header from '@/components/layout/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/why" element={<WhyPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/mission" element={<MissionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
