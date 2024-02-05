'use client';
import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import useSWR from 'swr';

const CurrentUserContext = createContext(null);

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const fetcher = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Login failed');
    }

    return res.json();
  };

  const login = async (username, password) => {
    try {
      const loginResponse = await fetcher(`${process.env.NEXT_PUBLIC_WEB_URL}/auth/login`, { username, password });

      Cookies.set('currentUser', JSON.stringify(loginResponse._id));
      setCurrentUser(loginResponse);
      setIsAuthenticated(true);
    } catch (err) {
      setError('Login failed');
    }
  };

  const logout = async () => {
    try {
      Cookies.remove('currentUser');
      setCurrentUser(null);
      setUserInfo(null);
      setIsAuthenticated(false);
      router.push('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const { data: userData, error: userError, mutate: userMutate } = useSWR(
    isAuthenticated ? '/user/data' : null,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  useEffect(() => {
    if (!isAuthenticated) {
      userMutate(undefined);
    }
  }, [isAuthenticated, userMutate]);

  const getUserInfo = async (userId) => {
    try {
      const response = await newRequest.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserInfo = async () => {
    if (currentUser?._id) {
      try {
        const info = await getUserInfo(currentUser._id);
        setUserInfo(info);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const currentUserJSON = localStorage.getItem('currentUser');
    if (currentUserJSON) {
      setCurrentUser(JSON.parse(currentUserJSON));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUserInfo();
    }
  }, [currentUser, fetchUserInfo]);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    setIsAuthenticated(true);
  }, [currentUser]);

  useEffect(() => {
    console.log("currentUser", currentUser);
    console.log("userInfo", userInfo);
  }, [currentUser, userInfo]);

  useEffect(() => {
    if ((!isAuthenticated || currentUser === null) && router.pathname !== '/login') {
      // router.push('/login');
    }
  }, [isAuthenticated, currentUser, router]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        login,
        logout,
        isAuthenticated,
        error,
        setError,
        success,
        setSuccess,
        userInfo,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserProvider, CurrentUserContext };
