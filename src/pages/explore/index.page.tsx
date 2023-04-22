import { ReactElement, useState } from "react";
import { Binoculars, MagnifyingGlass } from "phosphor-react";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@prisma/client";
import { api } from "@/lib/axios";

import { DefaultLayout } from "@/layouts/DefaultLayout";
import { PageTitle } from "@/components/PageTitle";
import { Form } from "@/components/Form";
import { Tag } from "./components/Tag";
import { BookCard } from "@/components/BookCard";

import { BooksGrid, ExploreContainer, TagsContainer } from "./styles";

import { BookWithAvgRating } from "@/components/BookCard/types";
import type { NextPageWithLayout } from "../_app.page";

const Explore: NextPageWithLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [inputSearchBook, setInputSearchBook] = useState<string | null>(null);

  const { data: categories } = useQuery<Category[]>(
    ["categories"],
    async () => {
      const { data } = await api.get("/books/categories");
      return data?.categories || [];
    }
  );

  const { data: books } = useQuery<BookWithAvgRating[]>(
    ["books", selectedCategory, inputSearchBook],
    async () => {
      const { data } = await api.get(
        `/books?category=${selectedCategory}&name=${inputSearchBook}`
      );
      return data?.books || [];
    }
  );

  const handleSelectCategory = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();

      const text =
        event.currentTarget.value.length === 0
          ? null
          : event.currentTarget.value;

      setInputSearchBook(text);
      handleSelectCategory(null);
    }
  };

  return (
    <ExploreContainer>
      <header>
        <PageTitle title="Explorar" icon={<Binoculars size={32} />} />
        <Form.Input
          placeholder="Buscar livro ou autor"
          icon={<MagnifyingGlass size={20} />}
          onKeyDown={handleSearch}
          css={{ maxWidth: 433 }}
        />
      </header>

      <TagsContainer>
        <Tag
          active={!selectedCategory}
          onClick={() => handleSelectCategory(null)}
        >
          Todas
        </Tag>
        {categories?.map((category) => (
          <Tag
            key={category.id}
            active={category.id === selectedCategory}
            onClick={() => handleSelectCategory(category.id)}
          >
            {category.name}
          </Tag>
        ))}
      </TagsContainer>

      <BooksGrid>
        {books?.map((book) => (
          <BookCard key={book.id} book={book} size="lg" />
        ))}
      </BooksGrid>
    </ExploreContainer>
  );
};

Explore.getLayout = (page: ReactElement) => {
  return <DefaultLayout title="Explorar">{page}</DefaultLayout>;
};

export default Explore;
