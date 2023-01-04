import { BOOKS } from "./books.mocks";
import { Injectable, HttpException } from "@nestjs/common";

@Injectable()
export class BooksService {
  books = BOOKS;

  getBooks(): Promise<any> {
    console.log("mircoservice");

    return new Promise((resolve) => {
      resolve(this.books);
    });
  }

  async getAllBookData(query) {
    console.log("microservice query", { query });
    const { bookId } = query;
    if (bookId) {
      const book = this.books.find((i) => i.id === +bookId);
      if (!book) {
        return {
          book: null,
        };
      }
      return {
        book,
      };
    }

    return {
      docs: this.books,
      total: this.books.length,
    };
  }

  getBook(bookID): Promise<any> {
    const id = Number(bookID);
    return new Promise((resolve) => {
      const book = this.books.find(($book) => $book.id === id);
      if (!book) {
        throw new HttpException("Book does not exist!", 404);
      }
      resolve(book);
    });
  }

  addBook(book): Promise<any> {
    return new Promise((resolve) => {
      book.id = Number(book.id);
      this.books.push(book);
      resolve(this.books);
    });
  }

  deleteBook(bookID): Promise<any> {
    const id = Number(bookID);
    return new Promise((resolve) => {
      const index = this.books.findIndex(($book) => $book.id === id);
      if (index === -1) {
        throw new HttpException("Book does not exist!", 404);
      }
      this.books.splice(index, 1);
      resolve(this.books);
    });
  }
}
