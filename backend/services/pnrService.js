const { encrypt, decrypt } = require('../utils/helpers');

class PNRService {
  static async verifyPNR(pnrNumber) {
    try {
      // Simulate PNR verification - In real app, integrate with IRCTC API
      const mockPNRData = this.generateMockPNRData(pnrNumber);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        data: mockPNRData
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  static generateMockPNRData(pnr) {
    // Mock train data
    const trains = [
      { number: '12345', name: 'Rajdhani Express' },
      { number: '12951', name: 'Mumbai Rajdhani' },
      { number: '12302', name: 'Howrah Rajdhani' },
      { number: '12434', name: 'Chennai Rajdhani' },
      { number: '12615', name: 'Grand Trunk Express' }
    ];

    const stations = [
      { code: 'NDLS', name: 'New Delhi' },
      { code: 'BOM', name: 'Mumbai Central' },
      { code: 'HWH', name: 'Howrah' },
      { code: 'MAS', name: 'Chennai Central' },
      { code: 'BLR', name: 'Bangalore' },
      { code: 'HYD', name: 'Hyderabad' },
      { code: 'CCU', name: 'Kolkata' },
      { code: 'AMD', name: 'Ahmedabad' }
    ];

    const classes = ['SL', '3A', '2A', '1A', 'CC'];
    const seatTypes = ['window', 'aisle', 'middle'];

    const randomTrain = trains[Math.floor(Math.random() * trains.length)];
    const fromStation = stations[Math.floor(Math.random() * stations.length)];
    let toStation = stations[Math.floor(Math.random() * stations.length)];
    while (toStation.code === fromStation.code) {
      toStation = stations[Math.floor(Math.random() * stations.length)];
    }

    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    const coachNumber = randomClass + Math.floor(Math.random() * 10 + 1);
    const seatNumber = Math.floor(Math.random() * 72 + 1);

    const journeyDate = new Date();
    journeyDate.setDate(journeyDate.getDate() + Math.floor(Math.random() * 30 + 1));

    const departureTime = new Date(journeyDate);
    departureTime.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));

    const arrivalTime = new Date(departureTime);
    arrivalTime.setHours(arrivalTime.getHours() + Math.floor(Math.random() * 24 + 4));

    return {
      pnr: pnr,
      trainNumber: randomTrain.number,
      trainName: randomTrain.name,
      from: {
        station: fromStation.name,
        code: fromStation.code,
        departure: departureTime
      },
      to: {
        station: toStation.name,
        code: toStation.code,
        arrival: arrivalTime
      },
      date: journeyDate,
      currentSeat: {
        coach: coachNumber,
        seatNumber: seatNumber.toString(),
        class: randomClass,
        type: seatTypes[Math.floor(Math.random() * seatTypes.length)]
      },
      passengerDetails: {
        name: 'PASSENGER NAME',
        age: Math.floor(Math.random() * 50 + 20),
        gender: Math.random() > 0.5 ? 'male' : 'female'
      },
      bookingStatus: 'CNF',
      chartStatus: 'Chart Not Prepared'
    };
  }

  static encryptPNR(pnr) {
    return encrypt(pnr);
  }

  static decryptPNR(encryptedPNR) {
    return decrypt(encryptedPNR);
  }
}

module.exports = PNRService;
