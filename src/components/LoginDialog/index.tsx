import { PropsWithChildren } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import { X } from "phosphor-react";

import {
  LoginDialogClose,
  LoginDialogContent,
  LoginDialogOverlay,
} from "./styles";

import { Typography } from "@/components/Typography";
import { AuthButtons } from "@/components/AuthButtons";

export const LoginDialog = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const paramBookId = router.query.book as string;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <LoginDialogOverlay />
        <LoginDialogContent>
          <LoginDialogClose>
            <X size={24} />
          </LoginDialogClose>

          <div>
            <Typography.Heading
              size="xs"
              color="gray-200"
              css={{ marginBottom: 40 }}
            >
              Faça login para deixar sua avaliação
            </Typography.Heading>
            <AuthButtons
              callbackUrl={
                !!paramBookId ? `/explore?book=${paramBookId}` : "/explore"
              }
            />
          </div>
        </LoginDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
