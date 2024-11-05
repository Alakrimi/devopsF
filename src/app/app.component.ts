import { Component, OnInit } from '@angular/core';
import { NomDuServiceService } from './nom-du-service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { universite } from './universite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'universiteFront';

  form: boolean = false;
  closeResult!: string;
  listuniversites: any;
  universite!:any;

  constructor(private universiteService: NomDuServiceService, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.getAlluniversite();
    console.log(this.listuniversites)
    this.universite={
      idUniversite : null,
      nomUniversite: null,
      adresse:null
    }

  }

  getAlluniversite(){
    return this.universiteService.getAlluniversite().subscribe(res=>{
      this.listuniversites = res;
    });
  }
  adduniversite(p: any) {
    this.universiteService.adduniversite(p).subscribe(() => {
      this.getAlluniversite();
      this.form = false;
    });
  }


  open(content: any, action: any) {
    if (action != null)
      this.universite = action
    else
      this.universite = new universite();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  cancel() {
    this.form = false;
  }
}