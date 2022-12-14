import { useSession, signOut } from "next-auth/react";

const useUser = () => {
  const { data } = useSession();

  const getInitials = () => {
    if (data?.user) {
      const names = data.user.name?.split(" ") || [];
      return names.map((name) => name.charAt(0).toUpperCase());
    }
  };

  return {
    user: data?.user,
    initials: getInitials() || [],
  };
};

export default useUser;
