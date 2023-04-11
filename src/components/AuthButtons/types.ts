export type AuthButtonsProps = {
  canGuest?: boolean;
  callbackUrl?: string;
};

export type Provider = "google" | "github" | "visitor";

export type ProviderMapping = {
  [key in Provider]: () => Promise<void>;
};
