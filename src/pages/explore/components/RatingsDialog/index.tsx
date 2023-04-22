import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { BookOpen, BookmarkSimple, X } from "phosphor-react";

import { Typography } from "@/components/Typography";
import { RatingStars } from "@/components/RatingStars";
import { Info } from "@/components/Info";
import { BookRatings } from "../BookRatings";

import {
  BookContent,
  BookDetailsContainer,
  BookDetailsWrapper,
  BookImage,
  BookInfos,
  DialogClose,
  DialogContent,
  DialogOverlay,
} from "./styles";

import { BookDetails, RatingsDialogProps } from "./types";

export const RatingsDialog = ({ bookId, children }: RatingsDialogProps) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const paramBookId = router.query.book as string;

  useEffect(() => {
    if (paramBookId === bookId) {
      setOpen(true);
    }
  }, [bookId, paramBookId]);

  const { data: book } = useQuery<BookDetails>(
    ["book", bookId],
    async () => {
      const { data } = await api.get(`/books/details/${bookId}`);
      return data.book ?? {};
    },
    {
      enabled: open,
    }
  );

  const ratingsLength = book?.ratings?.length ?? 0;
  const ratingsPlural = ratingsLength === 1 ? "avaliação" : "avaliações";
  const ratings = `${ratingsLength} ${ratingsPlural}`;
  const bookAvgRating = book?.avgRating ?? 0;

  const categories =
    book?.categories?.map((x) => x?.category?.name)?.join(", ") ?? "";

  const onOpenChange = (open: boolean) => {
    if (open) {
      router.push(`/explore?book=${bookId}`, undefined, { shallow: true });
    } else {
      router.push("/explore", undefined, { shallow: true });
    }

    setOpen(open);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogClose>
            <X size={24} />
          </DialogClose>
          {!book ? (
            <p>Carregando...</p>
          ) : (
            <>
              <BookDetailsWrapper>
                <BookDetailsContainer>
                  <BookImage
                    width={171}
                    height={242}
                    alt={book.name}
                    src={book.cover_url}
                  />
                  <BookContent>
                    <div>
                      <Typography.Heading size="sm">
                        {book.name}
                      </Typography.Heading>
                      <Typography.Text
                        color="gray-300"
                        css={{ marginTop: "$2" }}
                      >
                        {book.author}
                      </Typography.Text>
                    </div>

                    <div>
                      <RatingStars rating={bookAvgRating} size="md" />
                      <Typography.Text
                        color="gray-400"
                        size="sm"
                        css={{ marginTop: "$1" }}
                      >
                        {ratings}
                      </Typography.Text>
                    </div>
                  </BookContent>
                </BookDetailsContainer>

                <BookInfos>
                  <Info
                    icon={<BookmarkSimple />}
                    title="Categorias"
                    info={categories}
                  />
                  <Info
                    icon={<BookOpen />}
                    title="Páginas"
                    info={String(book.total_pages)}
                  />
                </BookInfos>
              </BookDetailsWrapper>

              <BookRatings
                bookId={bookId}
                ratings={book.ratings}
                canRate={book.canRate}
              />
            </>
          )}
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
