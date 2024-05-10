import prisma from "../clients/prisma";

export const createOrGetUser = async (name: string, email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    return user;
  }

  return prisma.user.create({
    data: {
      name,
      email,
    },
  });
};
