import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

import { Typography } from "@/components/Typography";
import { LinkButton } from "@/components/LinkButton";
import { BookCard } from "@/components/BookCard";

import { Container } from "./styles";

import { BookWithAvgRating } from "@/components/BookCard/types";

export const PopularBooks = () => {
  const { data: popularBooks } = useQuery<BookWithAvgRating[]>(
    ["popular-books"],
    async () => {
      const { data } = await api.get("/books/popular");
      return data?.popularBooks || [];
    }
  );

  return (
    <Container>
      <header>
        <Typography.Text size="sm">Livros populares</Typography.Text>
        <LinkButton href="/explore" text="Ver todos" />
      </header>

      <section>
        {popularBooks?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </section>
    </Container>
  );
};
