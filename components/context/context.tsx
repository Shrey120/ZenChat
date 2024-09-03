"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AppContext = createContext<any>(null);

interface User {
  name: string;
  email: string;
  password: string;
  profileImage: string;
  status: string;
  _id: string;
  state: string;
  city: string;
  phone: number;
  dob: Date;
  friends: string[];
  friendRequests: string[];
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();
  const [imgPublicId, setImgPublicId] = useState("");
  const [userFetchIndex, setUserFetchIndex] = useState(true);
  const [currentChatId, setCurrentChatId] = useState("");
  const [userData, setUserData] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [requestSendRefresher, setRequestSendRefresher] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (pathName === "/" || pathName === "/login" || pathName === "/register") {
      localStorage.clear();
    }
  }, [pathName]);

  useEffect(() => {
    let isTabClosing = false;

    const handleBeforeUnload = () => {
      if (isTabClosing) localStorage.clear();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        isTabClosing = true;
      } else {
        isTabClosing = false;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const current = storedUser && JSON.parse(storedUser);
    setCurrentUser(current);
  }, [userFetchIndex]);

  const getCurrentUser = async () => {
    const storedId = localStorage.getItem("currentId");
    const currentId = storedId && JSON.parse(storedId);
    try {
      const res = await fetch(`/api/users/${currentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await res.json();
      if (res.status === 200) {
        localStorage.setItem("currentUser", JSON.stringify(responseData.user));
        setUserFetchIndex(!userFetchIndex);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch user data");
    }
  };

  const loginHandler = async (data: any) => {
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });
      const responseData = await res.json();
      if (res.status === 201) {
        localStorage.setItem(
          "currentId",
          JSON.stringify(responseData.User._id)
        );
        localStorage.setItem("currentUser", JSON.stringify(responseData.User));
        setUserFetchIndex(!userFetchIndex);

        router.push("/home");
        toast.success(responseData.message);
      } else {
        setLoading(false);
        toast.error(responseData.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Server Error Occurred");
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      setUserData(response.users);
    } catch (error) {
      console.log(error);
    }
  };

  const settingChatId = (userId: string, friendId: string) => {
    const chatId = [userId, friendId].sort().join("-");
    setCurrentChatId(chatId);
    getMessages(chatId);
  };

  const getMessages = async (id: any) => {
    try {
      const res = await fetch(`/api/sendMessage/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await res.json();
      if (res.status === 201) {
        setMessages(responseData.messages);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sentMessage = async (message: string, senderId: string) => {
    try {
      const res = await fetch(`/api/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, currentChatId, senderId }),
      });
      const responseData = await res.json();
      if (res.status === 201) {
        console.log(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message");
    }
  };

  const timeCal = () => {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <AppContext.Provider
      value={{
        userData,
        currentChatId,
        fetchUsers,
        currentUser,
        setCurrentUser,
        loading,
        loginHandler,
        getCurrentUser,
        setLoading,
        requestSendRefresher,
        setRequestSendRefresher,
        userFetchIndex,
        setUserFetchIndex,
        setCurrentChatId,
        imgPublicId,
        setImgPublicId,
        messages,
        getMessages,
        sentMessage,
        settingChatId,
        setMessages,
        timeCal,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useContextApi = () => useContext(AppContext);
