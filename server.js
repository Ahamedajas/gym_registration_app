import express from "express";
import { PrismaClient } from "@prisma/client"; 
import moment from "moment"; 
import cors from "cors";

const prisma = new PrismaClient(); 
const app = express();

app.use(cors()); 

app.use(express.json());

const getNextMonthDueDate = () => {
  const nextMonth = moment().add(1, 'months').startOf('month');
  return nextMonth.toDate();
};

app.post("/register", async (req, res) => {
  const { name, email, batch } = req.body;
  if (!name || !email || !batch) {
    return res.status(400).json({ error: "All fields (name, email, batch) are required." });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(409).json({ error: "Email already exists." });
  }
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
app.get("/unpaid-fees", async (req, res) => {
  try {
    const unpaidStudents = await prisma.user.findMany({
      where: {
        paymentStatus: false,
      },
    });
    res.json(unpaidStudents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch unpaid students" });
  }
});
app.post("/pay-fee", async (req, res) => {
  const { userId } = req.body;

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
      data: { paymentStatus: true }, 
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
