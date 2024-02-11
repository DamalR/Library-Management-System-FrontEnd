import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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
      Swal.fire({
        title: "Deleted!",
        text: `${this.selectedBook.title} book is Deleted.`,
        icon: "success"
      });
      this.selectedBook = null;
    });
  }

  setSelectBook(book: any) {
    console.log("setSelected calling.....");
    this.selectedBook = book;
    console.log("setSelectedBook" + book.id);
  }

  saveBook(){
    let postApi = "http://localhost:8080/book/add";
    this.http.post(postApi,this.selectedBook).subscribe(data=>{
      Swal.fire({
        title: "Update!",
        text: `${this.selectedBook.title} book is Update.`,
        icon: "success"
      });
      this.loadBooks();
      this.selectedBook={};
    });

  }
}
