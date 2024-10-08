import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
import Updatepost from './components/Updatepost';
import SideImages from './components/SideImages';

function App() {
    return (
        <div className="App">
            <Header />
            <Logo />
            <SideImages />
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
                <Route path="/Updatepost/:id" element={<Updatepost />} />
            </Routes>
        </div>
    );
}

export default App;
