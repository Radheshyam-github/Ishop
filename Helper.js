function generateOTP() {
    // Generate a random 5-digit number
    const otp = Math.floor(10000 + Math.random() * 90000);
    return otp;
  }
  module.exports={
    generateOTP
  }
  