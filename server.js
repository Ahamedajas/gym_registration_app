import express from "express";
import { PrismaClient } from "@prisma/client"; // Import PrismaClient
import moment from "moment"; // To validate and handle date
import cors from "cors";  // Import CORS package

const prisma = new PrismaClient(); // Create a new instance of PrismaClient
const app = express();

// Enable CORS for all origins (you can restrict this if needed)
app.use(cors());  // Add this middleware to allow cross-origin requests

app.use(express.json());

// Utility function to get the 1st of the next month
const getNextMonthDueDate = () => {
  const nextMonth = moment().add(1, 'months').startOf('month');
  return nextMonth.toDate();  // This returns the Date object for the 1st of next month
};

// Create a user (registration)
app.post("/register", async (req, res) => {
  const { name, email, batch } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !batch) {
    return res.status(400).json({ error: "All fields (name, email, batch) are required." });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  // Check for duplicate email
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(409).json({ error: "Email already exists." });
  }

  // Get the next month's 1st date
  const dueDate = getNextMonthDueDate();

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        batch,
        dueDate,
      },
    });
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Fetch unpaid students
app.get("/unpaid-fees", async (req, res) => {
  try {
    const unpaidStudents = await prisma.user.findMany({
      where: {
        paymentStatus: false, // Payment status is false for unpaid students
      },
    });
    res.json(unpaidStudents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch unpaid students" });
  }
});

// Handle fee payment
app.post("/pay-fee", async (req, res) => {
  const { userId } = req.body; // Assume student ID is sent in the body

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.paymentStatus) {
      return res.status(400).json({ error: "Fee already paid" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { paymentStatus: true }, // Mark the user as having paid
    });

    res.status(200).json({ message: "Fee payment successful", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Payment processing failed" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
