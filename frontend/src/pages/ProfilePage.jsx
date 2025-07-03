import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
// import { getUserProfile, updateProfile, updatePassword } from '../services/userService'; // For real data

const ProfilePage = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { t } = useTranslation();

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    emergencyContacts: [], // Array of { name, number }
    preferences: [], // e.g., ['female_co_traveler', 'window_seat']
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileMessage, setProfileMessage] = useState('');

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated && user) {
      // In a real app: fetch user profile from backend
      // getUserProfile(user.id).then(data => setProfileData(data));
      // For hackathon: use mock data or context user data
      setProfileData({
        name: user.name || 'John Doe',
        email: user.email,
        phone: user.phone || '9876543210',
        emergencyContacts: user.emergencyContacts || [{ name: 'Family Member', number: '9988776655' }],
        preferences: user.preferences || ['Female Co-Traveler', 'Lower Berth'],
      });
    }
  }, [isAuthenticated, user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileError('');
    setProfileMessage('');
    // In a real app:
    // try {
    //   await updateProfile(user.id, profileData);
    //   setProfileMessage(t('profileUpdated'));
    //   // Optionally, update auth context user
    // } catch (err) {
    //   setProfileError(err.response?.data?.message || t('updateFailed'));
    // }
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setProfileMessage(t('profileUpdated'));
    setProfileLoading(false);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError('');
    setPasswordMessage('');

    if (newPassword !== confirmNewPassword) {
      setPasswordError(t('passwordsDoNotMatch'));
      setPasswordLoading(false);
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError(t('passwordMinLength'));
      setPasswordLoading(false);
      return;
    }

    // In a real app:
    // try {
    //   await updatePassword(user.id, { currentPassword, newPassword });
    //   setPasswordMessage(t('passwordUpdated'));
    //   setCurrentPassword('');
    //   setNewPassword('');
    //   setConfirmNewPassword('');
    // } catch (err) {
    //   setPasswordError(err.response?.data?.message || t('passwordUpdateFailed'));
    // }
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    if (currentPassword === 'oldpass') { // Simulate incorrect old password
        setPasswordMessage(t('passwordUpdated'));
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    } else {
        setPasswordError(t('incorrectCurrentPassword'));
    }
    setPasswordLoading(false);
  };

  const handleAddEmergencyContact = () => {
    setProfileData(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, { name: '', number: '' }]
    }));
  };

  const handleEmergencyContactChange = (index, field, value) => {
    setProfileData(prev => {
      const updatedContacts = [...prev.emergencyContacts];
      updatedContacts[index][field] = value;
      return { ...prev, emergencyContacts: updatedContacts };
    });
  };

  if (authLoading) {
    return <Layout><div className="text-center py-20"><LoadingSpinner /></div></Layout>;
  }

  if (!isAuthenticated || !user) {
    return <Layout><div className="container mx-auto p-4 text-center text-red-600">{t('pleaseLoginToViewProfile')}</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('profile')}</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('editProfile')}</h2>
          <form onSubmit={handleProfileUpdate}>
            <InputField
              label={t('name')}
              id="name"
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            />
            <InputField
              label={t('email')}
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              disabled
              className="opacity-70" // Email usually not editable
            />
            <InputField
              label={t('phone')}
              id="phone"
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            />

            <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">{t('emergencyContacts')}</h3>
            {profileData.emergencyContacts.map((contact, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-4 mb-4 items-end">
                <InputField
                  label={t('contactName')}
                  id={`contactName-${index}`}
                  type="text"
                  value={contact.name}
                  onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value)}
                  className="flex-grow"
                />
                <InputField
                  label={t('contactNumber')}
                  id={`contactNumber-${index}`}
                  type="tel"
                  value={contact.number}
                  onChange={(e) => handleEmergencyContactChange(index, 'number', e.target.value)}
                  className="flex-grow"
                />
              </div>
            ))}
            <Button variant="outline" onClick={handleAddEmergencyContact} type="button" className="mb-6">
              {t('addEmergencyContact')}
            </Button>

            {profileMessage && <p className="text-green-600 text-sm mb-4">{profileMessage}</p>}
            {profileError && <p className="text-red-600 text-sm mb-4">{profileError}</p>}

            <Button type="submit" className="w-full" disabled={profileLoading}>
              {profileLoading ? <LoadingSpinner className="w-5 h-5" color="white" /> : t('updateProfile')}
            </Button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('updatePassword')}</h2>
          <form onSubmit={handlePasswordUpdate}>
            <InputField
              label={t('currentPassword')}
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="********"
            />
            <InputField
              label={t('newPassword')}
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="********"
            />
            <InputField
              label={t('confirmNewPassword')}
              id="confirmNewPassword"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="********"
            />

            {passwordMessage && <p className="text-green-600 text-sm mb-4">{passwordMessage}</p>}
            {passwordError && <p className="text-red-600 text-sm mb-4">{passwordError}</p>}

            <Button type="submit" className="w-full" disabled={passwordLoading}>
              {passwordLoading ? <LoadingSpinner className="w-5 h-5" color="white" /> : t('updatePassword')}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;