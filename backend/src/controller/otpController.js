const { v4: uuidv4 } = require("uuid");
const { getDatabase } = require("firebase-admin/database");

const twilio = require("twilio");

const accountSid = process.env.ACCOUNT_ID;
const authToken = process.env.AUTH_TOKEN;
const twilioPhoneNumber = process.env.PHONE;

const client = twilio(accountSid, authToken);

const generateOTP = (req, res) => {
  const { phoneNumber } = req.body;

  // Kiểm tra số điện thoại có hợp lệ không
  if (!phoneNumber) {
    return res.status(400).json({ message: "Missing phone number" });
  }

  // Tạo mã OTP ngẫu nhiên
  const otpCode = Math.floor(100000 + Math.random() * 900000);

  // Lưu mã OTP và userId vào Firebase Realtime Database
  const otpId = uuidv4();
  const db = getDatabase();
  const otpRef = db.ref("user").child(phoneNumber);
  let userId;
  otpRef
    .once("value")
    .then((snapshot) => {
      const userData = snapshot.val();
      // Kiểm tra xem đã tồn tại userId cho số điện thoại này hay chưa
      if (!userData || !userData.userId) {
        // Nếu chưa tồn tại, tạo mới userId và lưu vào Firebase
        userId = uuidv4();
        otpRef.set({ userId });
      } else {
        userId = userData.userId;
      }

      // Lưu mã OTP vào Firebase
      otpRef
        .child("otpCode")
        .set(otpCode)
        .then(() => {
          console.log(`OTP sent to ${phoneNumber}: ${otpCode}`);
          res.status(200).json({ userId });
          // Gửi mã OTP đến số điện thoại người dùng
          // client.messages
          //   .create({
          //     body: `Mã OTP để đăng nhập của bạn là: ${otpCode}`,
          //     from: twilioPhoneNumber,
          //     to: "+84" + phoneNumber
          //   })
          //   .then((message) => {
          //     console.log(`OTP sent to ${phoneNumber}: ${otpCode}`);
          //     res.status(200).json({ userId });
          //   })
          //   .catch((error) => {
          //     console.error("Error sending OTP:", error);
          //     res.status(500).json({ message: "Failed to send OTP" });
          //   });
        })
        .catch((error) => {
          console.error("Error creating OTP:", error);
          res.status(500).json({ message: "Failed to create OTP" });
        });
    })
    .catch((error) => {
      console.error("Error accessing user data:", error);
      res.status(500).json({ message: "Failed to access user data" });
    });
};

const verifyOTP = async (req, res) => {
  const db = getDatabase();
  const { phoneNumber, otpCode } = req.body;
  // Kiểm tra thông tin xác nhận OTP
  if (!phoneNumber || !otpCode) {
    return res.status(400).json({ message: "Missing OTP information" });
  }

  const otpRef = db.ref("user").child(phoneNumber);
  otpRef
    .once("value")
    .then(function (snapshot) {
      // Access the snapshot data
      var data = snapshot.val();

      const { otpCode: storedOtpCode, verified, userId } = data;

      // Check if the entered OTP code matches the stored OTP code
      if (otpCode == storedOtpCode) {
        if (verified) {
          // OTP has already been verified
          return res.status(200).json({ message: "OTP already verified" });
        }

        // Update the "verified" status in the Firebase Realtime Database
        otpRef
          .update({ verified: true })
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
    .catch(function (error) {
      console.error(error);
    });
};

const setSession = async (req, res) => {
  const sessionId = req.body.sessionId;
  const userId = req.body.userId;
  const phoneNumber = req.body.phoneNumber; // Giả sử bạn đã có sẵn user ID
  // Giả sử bạn đã có sẵn user ID

  const db = getDatabase();
  const sessionsRef = db.ref("sessions");

  // Tạo một đối tượng session mới với sessionId và userId
  const newSession = {
    phoneNumber: phoneNumber,
    userId: userId,
    sessionId: sessionId,
  };

  sessionsRef
    .child(userId)
    .set(newSession)
    .then(() => {
      res
        .status(200)
        .json({ sessionId: sessionId, message: "Session saved successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to save session" });
    });
};

module.exports = { generateOTP, verifyOTP, setSession };
