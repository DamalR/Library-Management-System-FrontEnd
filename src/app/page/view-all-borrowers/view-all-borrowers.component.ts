import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-all-borrowers',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './view-all-borrowers.component.html',
  styleUrl: './view-all-borrowers.component.css'
})
export class ViewAllBorrowersComponent implements OnInit{
  private http;;
  borrowerList: any = [];
  selectedBorrower: any;

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  ngOnInit(): void {
    this.loadBorrowers();
  }

  loadBorrowers() {
    this.http.get('http://localhost:8080/borrower/get').subscribe((data: any) => {
      this.borrowerList = data;
      console.log(this.borrowerList);
    });
  }

  deleteBorrower() {
    let api = "http://localhost:8080/borrower/" + this.selectedBorrower.id;
    this.http.delete(api, { responseType: "text" }).subscribe((responce: string) => {
      console.log(responce);
      this.loadBorrowers();
      Swal.fire({
        title: "Deleted!",
        text: `${this.selectedBorrower.name} borrower is Deleted.`,
        icon: "success"
      });
      this.selectedBorrower = null;
    });
  }

  setSelectBorrower(borrower: any) {
    this.selectedBorrower = borrower;
    console.log("setSelectedBorrower" + borrower.id);
  }

  saveBook(){
    let postApi = "http://localhost:8080/borrower/add";
    this.http.post(postApi,this.selectedBorrower).subscribe(data=>{
      Swal.fire({
        title: "Update!",
        text: `${this.selectedBorrower.name} borrower is Update.`,
        icon: "success"
      });
      this.loadBorrowers();
      this.selectedBorrower={};
    });

  }
}
