"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  LogOut,
  Phone,
  User as UserIcon,
  ShieldCheck,
  MessageCircle,
  Instagram,
  Pencil,
  Lock,
  Loader2,
  Check,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetHeader, SheetTitle, SheetBody, SheetFooter } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/shared/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { CAFE } from "@/lib/constants";
import { buildWhatsAppChatUrl } from "@/lib/whatsapp";

export default function ProfilePage() {
  const { user, profile, loading, openLogin, logout, updateName, updatePhone, deleteAccount } = useAuth();

  const [editOpen, setEditOpen] = React.useState(false);
  const [name, setName] = React.useState(profile?.name ?? "");
  const [nameSaving, setNameSaving] = React.useState(false);
  const [nameSaved, setNameSaved] = React.useState(false);
  const [nameError, setNameError] = React.useState<string | null>(null);

  const [phoneMode, setPhoneMode] = React.useState(false);
  const [newPhone, setNewPhone] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [phoneSaving, setPhoneSaving] = React.useState(false);
  const [phoneSaved, setPhoneSaved] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState<string | null>(null);

  const [deleteMode, setDeleteMode] = React.useState(false);
  const [deletePassword, setDeletePassword] = React.useState("");
  const [deleteSubmitting, setDeleteSubmitting] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (editOpen) {
      setName(profile?.name ?? "");
      setNameSaved(false);
      setNameError(null);
      setPhoneMode(false);
      setNewPhone("");
      setCurrentPassword("");
      setPhoneSaved(false);
      setPhoneError(null);
      setDeleteMode(false);
      setDeletePassword("");
      setDeleteError(null);
    }
  }, [editOpen, profile?.name]);

  if (loading) {
    return <div className="px-4 pt-8 text-center text-sm text-forest-400">Loading profile…</div>;
  }

  if (!user) {
    return (
      <div className="animate-fade-up pt-6">
        <EmptyState
          icon={UserIcon}
          title="You're not logged in"
          description="Log in with your phone number to view your profile and track orders."
          action={
            <Button variant="gold" size="lg" onClick={() => openLogin()}>
              Login Now
            </Button>
          }
        />
      </div>
    );
  }

  const currentPhoneDigits = (profile?.phone ?? "").replace(/\D/g, "").slice(-10);
  const isNameValid = name.trim().length >= 2;
  const nameChanged = name.trim() !== (profile?.name ?? "").trim();

  const handleSaveName = async () => {
    if (!isNameValid || !nameChanged) return;
    setNameSaving(true);
    setNameError(null);
    try {
      await updateName(name.trim());
      setNameSaved(true);
      setTimeout(() => setNameSaved(false), 2000);
    } catch {
      setNameError("Couldn't update your name. Please try again.");
    } finally {
      setNameSaving(false);
    }
  };

  const newPhoneDigits = newPhone.replace(/\D/g, "");
  const canSavePhone = newPhoneDigits.length === 10 && currentPassword.length >= 6 && !phoneSaving;

  const handleSavePhone = async () => {
    if (!canSavePhone) return;
    setPhoneSaving(true);
    setPhoneError(null);
    try {
      await updatePhone(newPhoneDigits, currentPassword);
      setPhoneSaved(true);
      setPhoneMode(false);
      setNewPhone("");
      setCurrentPassword("");
      setTimeout(() => setPhoneSaved(false), 2000);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/wrong-password" || code === "auth/invalid-credential") {
        setPhoneError("Incorrect password.");
      } else if (code === "auth/email-already-in-use") {
        setPhoneError("This number is already linked to another account.");
      } else {
        setPhoneError("Couldn't update your number. Please try again.");
      }
    } finally {
      setPhoneSaving(false);
    }
  };

  const canDelete = deletePassword.length >= 6 && !deleteSubmitting;

  const handleDeleteAccount = async () => {
    if (!canDelete) return;
    setDeleteSubmitting(true);
    setDeleteError(null);
    try {
      await deleteAccount(deletePassword);
      setEditOpen(false);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/wrong-password" || code === "auth/invalid-credential") {
        setDeleteError("Incorrect password.");
      } else if (code === "auth/requires-recent-login") {
        setDeleteError("For security, please log out and log back in, then try again.");
      } else {
        setDeleteError("Couldn't delete your account. Please try again.");
      }
    } finally {
      setDeleteSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-up px-4 pt-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-forest-gradient p-6 text-cream-50 shadow-soft"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient font-display text-2xl font-bold text-forest-900">
              {(profile?.name ?? "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-display text-lg font-bold">{profile?.name ?? "Customer"}</p>
              <p className="flex items-center gap-1.5 text-sm text-cream-200/80">
                <Phone className="h-3.5 w-3.5" /> {profile?.phone}
              </p>
            </div>
          </div>
          <button
            onClick={() => setEditOpen(true)}
            aria-label="Edit profile"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition hover:bg-cream-50/20"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 flex items-center gap-1.5 rounded-full bg-cream-50/10 px-3 py-1.5 text-xs font-semibold w-fit">
          <ShieldCheck className="h-3.5 w-3.5 text-gold-300" /> Verified customer
        </div>
      </motion.div>

      <div className="mt-6 space-y-3">
        <a
          href={buildWhatsAppChatUrl("Hi Yumazing, I have a question about my order.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card"
        >
          <span className="flex items-center gap-3 text-sm font-semibold text-forest-800">
            <MessageCircle className="h-5 w-5 text-forest-600" /> Chat with us on WhatsApp
          </span>
        </a>
        <a
          href={CAFE.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card"
        >
          <span className="flex items-center gap-3 text-sm font-semibold text-forest-800">
            <Instagram className="h-5 w-5 text-forest-600" /> Follow us on Instagram
          </span>
        </a>
      </div>

      <button
        onClick={() => logout()}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-red-100 bg-red-50 py-4 text-sm font-bold text-red-500"
      >
        <LogOut className="h-4.5 w-4.5" /> Logout
      </button>

      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
        </SheetHeader>

        <SheetBody>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-forest-400">Full name</label>
            <div className="relative">
              <UserIcon className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-forest-300" />
              <Input value={name} onChange={(e) => setName(e.target.value)} className="pl-11 pr-24" />
              <Button
                size="sm"
                variant={nameSaved ? "cream" : "gold"}
                className="absolute right-1.5 top-1.5 h-9"
                disabled={!isNameValid || !nameChanged || nameSaving}
                onClick={handleSaveName}
              >
                {nameSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : nameSaved ? (
                  <Check className="h-4 w-4" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
            {nameError && <p className="text-xs font-medium text-red-500">{nameError}</p>}
          </div>

          <div className="mt-6 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-forest-400">Phone number</label>

            {!phoneMode ? (
              <div className="flex items-center justify-between rounded-2xl border border-forest-100 bg-white px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-forest-800">
                  <Phone className="h-4 w-4 text-forest-400" /> +91 {currentPhoneDigits}
                </div>
                <button
                  onClick={() => setPhoneMode(true)}
                  className="text-xs font-bold text-forest-600 underline-offset-2 hover:underline"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="space-y-3 rounded-2xl border border-forest-100 bg-white p-4">
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-forest-300" />
                  <span className="absolute left-11 top-1/2 -translate-y-1/2 text-sm font-medium text-forest-400">
                    +91
                  </span>
                  <Input
                    inputMode="numeric"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="New 10-digit number"
                    className="pl-[4.5rem]"
                  />
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-forest-300" />
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Current password"
                    className="pl-11"
                  />
                </div>
                {phoneError && <p className="text-xs font-medium text-red-500">{phoneError}</p>}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => setPhoneMode(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="gold"
                    size="sm"
                    className="flex-1"
                    disabled={!canSavePhone}
                    onClick={handleSavePhone}
                  >
                    {phoneSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                  </Button>
                </div>
              </div>
            )}

            {phoneSaved && (
              <p className="flex items-center gap-1.5 text-xs font-semibold text-veg">
                <Check className="h-3.5 w-3.5" /> Phone number updated
              </p>
            )}
          </div>

          <Separator className="my-6" />

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-red-400">Danger zone</label>

            {!deleteMode ? (
              <button
                onClick={() => setDeleteMode(true)}
                className="flex w-full items-center justify-between rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-500"
              >
                <span className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" /> Delete Account
                </span>
              </button>
            ) : (
              <div className="space-y-3 rounded-2xl border border-red-100 bg-red-50 p-4">
                <p className="text-xs text-red-500">
                  This permanently deletes your account and profile. This can't be undone. Enter your password
                  to confirm.
                </p>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-red-300" />
                  <Input
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    placeholder="Current password"
                    className="border-red-200 bg-white pl-11 focus:border-red-400 focus:ring-red-100"
                  />
                </div>
                {deleteError && <p className="text-xs font-medium text-red-600">{deleteError}</p>}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setDeleteMode(false);
                      setDeletePassword("");
                      setDeleteError(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-red-500 text-white hover:bg-red-600"
                    disabled={!canDelete}
                    onClick={handleDeleteAccount}
                  >
                    {deleteSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Permanently Delete"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SheetBody>

        <SheetFooter>
          <Button variant="outline" size="lg" className="w-full" onClick={() => setEditOpen(false)}>
            Done
          </Button>
        </SheetFooter>
      </Sheet>
    </div>
  );
}