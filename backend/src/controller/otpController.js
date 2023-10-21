const { v4: uuidv4 } = require("uuid");
const { getDatabase,ref } = require("firebase-admin/database");
const crypto = require("crypto");

const generateOTP = async (req, res) => {
  const db = getDatabase();
  const { phoneNumber } = req.body;

  // Kiểm tra số điện thoại có hợp lệ không
  if (!phoneNumber) {
    return res.status(400).json({ message: "Missing phone number" });
  }

  // Tạo mã OTP ngẫu nhiên
  const otpCode = Math.floor(100000 + Math.random() * 900000);

  // Tạo otpId từ số điện thoại
  const otpId = crypto.createHash("md5").update(phoneNumber).digest("hex");

  // Lưu mã OTP và trạng thái xác minh vào Firebase Realtime Database
  const otpRef = await db.ref("otp").child(otpId);
  otpRef
    .set({ phoneNumber, otpCode, verified: false }) // Đánh dấu ban đầu là chưa xác minh
    .then(() => {
      // Gửi mã OTP đến người dùng (thông qua SMS, email, hoặc cách khác)
      console.log(`OTP sent to ${phoneNumber}: ${otpCode}`);

      res.status(200).json({ otpId });
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