import api from './api';

// For hackathon, these will largely be mocked on the frontend
// In a real app, they would make actual backend calls.

export const verifyPnr = async (pnr) => {
  // Simulates PNR verification with backend
  // await api.post('/pnr/verify', { pnr });
  return { success: true, message: 'PNR verified successfully!', data: { /* mock PNR data */ } };
};

export const getMatches = async (travelData) => {
  // Calls your Node.js backend which then calls the Python ML Engine
  // const response = await api.post('/matching/find', travelData);
  // return response.data;

  // Hackathon simulation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 'sim_match_1', name: 'Alok', isVerified: true, destination: 'Delhi', currentSeat: 'S5-25', desiredSeat: 'S5-23', profilePic: null, score: 95 },
        { id: 'sim_match_2', name: 'Smita', isVerified: false, destination: 'Mumbai', currentSeat: 'B2-10', desiredSeat: 'S5-23', profilePic: null, score: 88 },
      ]);
    }, 1000);
  });
};

export const createExchangeRequest = async (requestDetails) => {
  // Submits an exchange request to the backend
  // const response = await api.post('/exchange/request', requestDetails);
  // return response.data;

  // Hackathon simulation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% success rate
        resolve({ success: true, message: 'Exchange request sent successfully!' });
      } else {
        reject(new Error('Failed to send exchange request. Please try again.'));
      }
    }, 500);
  });
};

export const getExchangeRequests = async (userId) => {
  // Fetches active/past exchange requests for a user
  // const response = await api.get(`/exchange/user/${userId}`);
  // return response.data;

  // Hackathon simulation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        // Mock active requests
        { id: 'req_active_1', pnr: 'PNR123', currentSeat: 'S3-15', desiredSeat: 'S3-16', status: 'pending', matchedUser: { name: 'Priya' } },
        // Mock past requests
        { id: 'req_past_1', pnr: 'PNR456', currentSeat: 'A1-01', desiredSeat: 'A1-02', status: 'completed', matchedUser: { name: 'Rohan' }, karmaAwarded: 10 },
      ]);
    }, 500);
  });
};

export const updateExchangeRequest = async (requestId, status) => {
  // Updates the status of an exchange request (e.g., accept, decline)
  // const response = await api.put(`/exchange/${requestId}`, { status });
  // return response.data;

  // Hackathon simulation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true, message: `Request ${requestId} status updated to ${status}` });
    }, 300);
  });
};