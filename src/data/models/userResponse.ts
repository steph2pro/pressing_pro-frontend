

type UserResponse = {
  id: number;
  img: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  createdAt: string; // ou Date si tu le convertis
  verified: boolean;
};

export default UserResponse;
