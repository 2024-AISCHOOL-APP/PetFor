import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

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
import RegisterMethod from './components/RegisterMethod'; // RegisterMethod 컴포넌트 임포트
import BusinessRegistration from './components/BusinessRegistration'; // BusinessRegistration 컴포넌트 임포트
import ProfessionalCertification from './components/ProfessionalCertification'; // ProfessionalCertification 컴포넌트 임포트
import CommunityContent from './components/CommunityContent';
import Updatepost from './components/Updatepost';

import { AuthProvider } from './AuthContext'; // AuthProvider 임포트

import { UserInfo } from './UserInfo'
import ChatBotButton from './components/ChatBotButton';

const Main = () => {
    const [userId, setUserId] = useState(null);
    const [userPw, setUserPw] = useState(null);
    const [userNickname, setUserNickname] = useState(null);
    const [userProfile, setUserProfile] = useState('../../public/images/basic.png');
    const [userType, setUserType] = useState('U');

  return (
    <AuthProvider>
    <UserInfo.Provider
      value={{
        userId,
        setUserId,
        userPw,
        setUserPw,
        userNickname,
        setUserNickname,
        userProfile,
        setUserProfile,
        userType,
        setUserType
      }}>
        <Header />
        <Logo />
        <ChatBotButton></ChatBotButton>
        
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/community" element={<Community />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/writepost" element={<WritePost />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/register-method" element={<RegisterMethod />} />
        <Route path="/business-registration" element={<BusinessRegistration />} />
        <Route path="/professional-certification" element={<ProfessionalCertification />} />
        <Route path="/community-content/:id" element={<CommunityContent />} />
        <Route path="/Updatepost/:id" element={<Updatepost />} />
      </Routes>
    </UserInfo.Provider>
    </AuthProvider>
  );
}

export default Main