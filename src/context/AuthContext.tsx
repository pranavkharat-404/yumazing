"use client";

import * as React from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  deleteUser,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { CustomerProfile } from "@/types";

export type AuthMode = "signup" | "login";

interface SignupArgs {
  name: string;
  phone: string;
  password: string;
}

interface LoginArgs {
  phone: string;
  password: string;
}

interface AuthContextValue {
  user: User | null;
  profile: CustomerProfile | null;
  loading: boolean;
  isLoginOpen: boolean;
  openLogin: (onSuccess?: () => void) => void;
  closeLogin: () => void;
  signup: (args: SignupArgs) => Promise<void>;
  login: (args: LoginArgs) => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
  logout: () => Promise<void>;
  submitting: boolean;
  updateName: (name: string) => Promise<void>;
  updatePhone: (newPhoneDigits: string, currentPassword: string) => Promise<void>;
  deleteAccount: (currentPassword: string) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

function phoneToAuthEmail(phoneDigits: string): string {
  return `${phoneDigits}@yumazing.app`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [profile, setProfile] = React.useState<CustomerProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [authError, setAuthError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const onSuccessRef = React.useRef<(() => void) | undefined>(undefined);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile(snap.data() as CustomerProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const openLogin = React.useCallback((onSuccess?: () => void) => {
    onSuccessRef.current = onSuccess;
    setAuthError(null);
    setIsLoginOpen(true);
  }, []);

  const closeLogin = React.useCallback(() => {
    setIsLoginOpen(false);
    setAuthError(null);
  }, []);

  const clearAuthError = React.useCallback(() => setAuthError(null), []);

  const signup = React.useCallback(async ({ name, phone, password }: SignupArgs) => {
    setAuthError(null);
    setSubmitting(true);
    try {
      const email = phoneToAuthEmail(phone);
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = credential.user;

      const profileData: CustomerProfile = {
        uid: firebaseUser.uid,
        name,
        phone: `+91${phone}`,
        createdAt: Date.now(),
      };

      await setDoc(doc(db, "users", firebaseUser.uid), {
        ...profileData,
        createdAt: serverTimestamp(),
      });
      setProfile(profileData);

      setIsLoginOpen(false);
      onSuccessRef.current?.();
      onSuccessRef.current = undefined;
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/email-already-in-use") {
        setAuthError("This phone number is already registered. Try logging in instead.");
      } else if (code === "auth/weak-password") {
        setAuthError("Password should be at least 6 characters.");
      } else if (code === "auth/invalid-email") {
        setAuthError("Please enter a valid 10-digit phone number.");
      } else {
        setAuthError("Something went wrong while creating your account. Please try again.");
      }
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, []);

  const login = React.useCallback(async ({ phone, password }: LoginArgs) => {
    setAuthError(null);
    setSubmitting(true);
    try {
      const email = phoneToAuthEmail(phone);
      await signInWithEmailAndPassword(auth, email, password);

      setIsLoginOpen(false);
      onSuccessRef.current?.();
      onSuccessRef.current = undefined;
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
        setAuthError("Incorrect phone number or password.");
      } else if (code === "auth/user-not-found") {
        setAuthError("No account found with this number. Please sign up first.");
      } else if (code === "auth/too-many-requests") {
        setAuthError("Too many attempts. Please wait a bit and try again.");
      } else {
        setAuthError("Couldn't log in. Please try again.");
      }
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, []);

  const logout = React.useCallback(async () => {
    await firebaseSignOut(auth);
  }, []);

  const updateName = React.useCallback(async (name: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("Not logged in");
    await updateDoc(doc(db, "users", currentUser.uid), { name });
    setProfile((prev) => (prev ? { ...prev, name } : prev));
  }, []);

  const updatePhone = React.useCallback(async (newPhoneDigits: string, currentPassword: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser || !currentUser.email) throw new Error("Not logged in");

    const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
    await reauthenticateWithCredential(currentUser, credential);

    await updateEmail(currentUser, phoneToAuthEmail(newPhoneDigits));

    const newPhone = `+91${newPhoneDigits}`;
    await updateDoc(doc(db, "users", currentUser.uid), { phone: newPhone });
    setProfile((prev) => (prev ? { ...prev, phone: newPhone } : prev));
  }, []);

  const deleteAccount = React.useCallback(async (currentPassword: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser || !currentUser.email) throw new Error("Not logged in");

    const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
    await reauthenticateWithCredential(currentUser, credential);

    await deleteDoc(doc(db, "users", currentUser.uid));
    await deleteUser(currentUser);

    setProfile(null);
    setUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    profile,
    loading,
    isLoginOpen,
    openLogin,
    closeLogin,
    signup,
    login,
    authError,
    clearAuthError,
    logout,
    submitting,
    updateName,
    updatePhone,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}