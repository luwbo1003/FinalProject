const { getDatabase } = require("firebase-admin/database");

class User {
  constructor(name, age, addresses) {
    name, age, addresses
  }

  toJSON() {
    return {
      name: this.name,
      age: this.age,
      addresses: this.addresses.map((address) => ({
        street: address.street,
        city: address.city,
      })),
    };
  }
}
// const users = [
//   new User({
//     name: "John",
//     age: 30,
//     addresses: [
//       { street: "123 Main Street", city: "San Francisco" },
//       { street: "456 Elm Street", city: "New York City" },
//     ],
//   }),
//   new User({
//     name: "Thai",
//     age: 30,
//     addresses: [
//       { street: "123", city: "San Francisco" },
//       { street: "456 ", city: "New York City" },
//     ],
//   }),
// ];

// const Test1 = async (req, res, firebaseApp) => {
//   const db = getDatabase();
//   const result = users.map((user) => {
//     const addresses = user.addresses.map((address, addressIndex) => ({
//       [addressIndex]: address,
//     }));
//     return {
//       [user.name]: {
//         name: user.name,
//         age: user.age,
//         addresses,
//       },
//     };
//   });
//   const finalResult = {};
//   for (const obj of result) {
//     for (const key in obj) {
//       if (obj.hasOwnProperty(key)) {
//         finalResult[key] = obj[key];
//       }
//     }
//   }
//   console.log(users.name)

//   // const finalResult = Object.assign({}, ...result);
//   // console.log(finalResult);
//   try {
//     await db.ref("Test_U").push(finalResult);
//     res.status(200).send({ message: "User đã được thêm thành công" });
//   } catch (error) {
//     console.error("Error pushing times:", error);
//     res.status(500).json({ error: "An error occurred while pushing times" });
//     throw error;
//   }
// };

// const PushTime = async (req, res, firebaseApp) => {
//   const db = getDatabase();
//   const { hour, min } = req.body;
//   console.log(req.body);
//   try {
//     // Kiểm tra xem các trường cần thiết đã được cung cấp
//     if (!hour || !min) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }
//     const newTime = {
//       hour: hour,
//       min: min,
//     };
//     // Đặt thông tin nhân viên mới vào Firebase Realtime Database
//     await db.ref("Test/test").set({ newTime});

//     res.status(200).json({ message: "Push success" });
//   } catch (error) {
//     console.error("Error adding employee:", error);
//     res.status(500).json({ error: "An error occurred while adding employee" });
//     throw error;
//   }
// };

// const times = [
//   { hour: "12", min: "00" },
//   { hour: "12", min: "00" },
// ];

const PushTime = async (req, res, firebaseApp) => {
  const db = getDatabase();
  const times = req.body;
  console.log(typeof times);
  try {
    // Check if the times array is empty
    if (!times || times.length === 0) {
      return res.status(400).json({ error: "Missing required times array" });
    }
    await db.ref("MedicineCalendar/userId/MCId3").update({times});
    // await db.ref("Test_time").update({times});
  } catch (error) {
    console.error("Error pushing times:", error);
    res.status(500).json({ error: "An error occurred while pushing times" });
    throw error;
  }
};
const address = [
  [
    {
      street: "123 Main Street",
      city: "San Francisco",
    },
  ],
  [
    {
      street: "456 Elm Street",
      city: "New York City",
    },
  ],
];
const users = new User([
  {
    name: "Thai",
    age: 30,
    addresses:address
  },
]);


const TestController = async (req, res) => {
    // const users = req.body.users;
    // const addresses = req.body.addresses;

    // const newUsers = users.concat({addresses});

    const db = getDatabase();
    const result = await db.ref("Test_Data").push({users});
    console.log(users)

    res.status(200).send({ message: "Data has been pushed" });
  };


module.exports = {
  PushTime,
  TestController
};
