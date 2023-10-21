const { v4: uuidv4 } = require("uuid");
const { getDatabase } = require("firebase-admin/database");


const twilio = require('twilio');

const accountSid = process.env.ACCOUNT_ID;
const authToken = process.env.AUTH_TOKEN;
const twilioPhoneNumber = process.env.PHONE;
console.log(authToken);
console.log(twilioPhoneNumber);
console.log(accountSid);


const client = twilio(accountSid, authToken);

const generateOTP = (req, res) => {
  const { phoneNumber } = req.body;

  // Kiểm tra số điện thoại có hợp lệ không
  if (!phoneNumber) {
    return res.status(400).json({ message: "Missing phone number" });
  }

  // Tạo mã OTP ngẫu nhiên
  const otpCode = Math.floor(100000 + Math.random() * 900000);

  // Lưu mã OTP vào Firebase Realtime Database
  const otpId = uuidv4();
  const db = getDatabase();
  const otpRef = db.ref("otp").child(otpId);
  otpRef
    .set({ phoneNumber, otpCode })
    .then(() => {
      // Gửi mã OTP đến số điện thoại người dùng
      client.messages
        .create({
          body: `Mã OTP để đăng nhập của bạn là: ${otpCode}`,
          from: twilioPhoneNumber,
          to: "+84" + phoneNumber
        })
        .then((message) => {
          console.log(`OTP sent to ${phoneNumber}: ${otpCode}`);
          res.status(200).json({ otpId });
        })
        .catch((error) => {
          console.error("Error sending OTP:", error);
          res.status(500).json({ message: "Failed to send OTP" });
        });
    })
    .catch((error) => {
      console.error("Error creating OTP:", error);
      res.status(500).json({ message: "Failed to create OTP" });
    });
};


const verifyOTP = async (req, res) => {
  const db = getDatabase();
  const { otpId, otpCode } = req.body;
  // Kiểm tra thông tin xác nhận OTP
  if (!otpId || !otpCode) {
    return res.status(400).json({ message: "Missing OTP information" });
  }

  const otpRef = db.ref("otp").child(otpId);
  otpRef.once("value")
  .then(function(snapshot) {
    // Access the snapshot data
    var data = snapshot.val();

    const { phoneNumber, otpCode: storedOtpCode, verified } = data;

    // Check if the entered OTP code matches the stored OTP code
    if (otpCode == storedOtpCode) {
    if (verified) {
        // OTP has already been verified
        return res.status(200).json({ message: "OTP already verified" });
    }

    // Update the "verified" status in the Firebase Realtime Database
    otpRef.update({ verified: true })
        .then(() => {
        // OTP is valid, proceed with your logic here
        console.log(`OTP verified for ${phoneNumber}`);
        res.status(200).json({ message: "OTP verified" });
        })
        .catch((error) => {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Failed to verify OTP" });
        });
    } else {
    // Invalid OTP code
    res.status(401).json({ message: "Invalid OTP" });
    }
  })
  .catch(function(error) {
    console.error(error);
  });
};
module.exports = { generateOTP, verifyOTP };