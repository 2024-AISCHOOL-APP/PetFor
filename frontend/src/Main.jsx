import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './AuthContext';
import { UserInfo } from './UserInfo'

import Header from './components/Header';
import Logo from './components/Logo';
import Home from './components/Home';
import Register from './components/Register';
import Community from './components/Community';
import Chat from './components/Chat';
import Login from './components/Login';
import Signup from './components/Signup';
import WritePost from './components/WritePost';
import SearchResults from './components/SearchResults';
import RegisterMethod from './components/RegisterMethod';
import BusinessRegistration from './components/BusinessRegistration';
import ProfessionalCertification from './components/ProfessionalCertification';
import CommunityContent from './components/CommunityContent';
import Updatepost from './components/Updatepost';
import Chatting from './components/Chatting';
import SideImages from './components/SideImages';
import RegisterReco from './components/Register_reco';
import RegisterChat from './components/RegisterChat';
import ChatBotButton from './components/ChatBotButton';

const Main = () => {
    const [userId, setUserId] = useState(null);
    const [userPw, setUserPw] = useState(null);
    const [userNickname, setUserNickname] = useState(null);
    const [userProfile, setUserProfile] = useState('/images/basic.png');
    const [userType, setUserType] = useState('U');

  return (
    <AuthProvider>
      <UserInfo.Provider
        value={{ userId, setUserId, userPw, setUserPw, userNickname, setUserNickname, userProfile, setUserProfile, userType, setUserType }}>
          <SideImages />
          <Header />
          <Logo />
          <ChatBotButton></ChatBotButton>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/community" element={<Community />} />
          <Route path="/chat" element={<Chat />} />
          <Route path='/chatting' element={<Chatting />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/writepost" element={<WritePost />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/register-method" element={<RegisterMethod />} />
          <Route path="/business-registration" element={<BusinessRegistration />} />
          <Route path="/professional-certification" element={<ProfessionalCertification />} />
          <Route path="/community-content/:id" element={<CommunityContent />} />
          <Route path="/Updatepost/:id" element={<Updatepost />} />
          <Route path="/Register_reco" element={<RegisterReco />} />
          <Route path="/RegisterChat" element={<RegisterChat />} />
        </Routes>
      </UserInfo.Provider>
    </AuthProvider>
  );
}

export default Main
