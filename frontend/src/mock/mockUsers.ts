import { Role } from "../models/interface";

export const mockUsers = [
  {
    id: "64f2d91c9fc13a45bcde0001",
    name: "John Doe",
    type: Role.STUDENT,
    email: "johndoe@student.com",
    registration: "20240001",
    password: "123",
    createdAt: "2024-09-23T00:00:00.000Z",
    updatedAt: "2024-09-23T00:00:00.000Z",
  },
  {
    id: "64f2d91c9fc13a45bcde0002",
    name: "Jane Smith",
    type: Role.TEACHER,
    email: "janesmith@teacher.com",
    registration: "T20240001",
    password: "1234",
    createdAt: "2024-09-23T00:00:00.000Z",
    updatedAt: "2024-09-23T00:00:00.000Z",
  },
];
