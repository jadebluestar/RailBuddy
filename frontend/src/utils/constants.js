// Application-wide constants go here

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  GET_USER_PROFILE: '/users/me',
  UPDATE_USER_PROFILE: '/users/', // append userId
  UPDATE_PASSWORD: '/users/password',
  VERIFY_PNR: '/pnr/verify',
  FIND_MATCHES: '/matching/find',
  CREATE_EXCHANGE_REQUEST: '/exchange/request',
  GET_EXCHANGE_REQUESTS: '/exchange/user', // append userId
  UPDATE_EXCHANGE_REQUEST: '/exchange/', // append requestId
  GET_KARMA_POINTS: '/karma/points',
  REDEEM_KARMA_POINTS: '/karma/redeem',
  SEND_CHAT_MESSAGE: '/chat/send', // Example if you also save chat to DB
  GET_CHAT_HISTORY: '/chat/history', // Example
};

export const KARMA_POINT_COSTS = {
  EXTRA_EXCHANGE: 50,
  // Add other karma redemption costs
};

export const KARMA_POINT_REWARDS = {
  SUCCESSFUL_EXCHANGE: 10,
  HELPFUL_REVIEW: 5,
  // Add other karma earning rewards
};

export const SUBSCRIPTION_PLANS = {
  BASIC: 'basic',
  PREMIUM: 'premium',
};