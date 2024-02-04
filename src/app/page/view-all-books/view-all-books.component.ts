import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-all-books',
  standalone: true,
  styleUrls: ['./view-all-books.component.css'],
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './view-all-books.component.html'
})
export class ViewAllBooksComponent implements OnInit {
  private http;
  bookList: any = [];
  selectedBook: any;

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.http.get('http://localhost:8080/book/get').subscribe((data: any) => {
      this.bookList = data;
      console.log(this.bookList);
    });
  }

  deleteBook() {
    console.log("deleteBook calling.....");
    let api = "http://localhost:8080/book/" + this.selectedBook.id;
    this.http.delete(api, { responseType: "text" }).subscribe((responce: string) => {
      console.log(responce);
      this.loadBooks();
      alert("Book Deleted!");
      this.selectedBook = null;
    });
  }

  setSelectBook(book: any) {
    console.log("setSelected calling.....");
    this.selectedBook = book;
    console.log("setSelectedBook" + book.id);
  }
}
