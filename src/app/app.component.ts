import { Component, OnInit } from '@angular/core';
import { NomDuServiceService } from './nom-du-service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { foyer } from './universite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'foyerFront';

  form: boolean = false;
  closeResult!: string;
  listfoyers: any;
  foyer!:any;

  constructor(private foyerService: NomDuServiceService, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.getAllfoyer();
    console.log(this.listfoyers)
    this.foyer={
      idUniversite : null,
      nomUniversite: null,
      adresse:null
    }

  }

  getAllfoyer(){
    return this.foyerService.getAllfoyer().subscribe(res=>{
      this.listfoyers = res;
    });
  }
  addfoyer(p: any) {
    this.foyerService.addfoyer(p).subscribe(() => {
      this.getAllfoyer();
      this.form = false;
    });
  }


  open(content: any, action: any) {
    if (action != null)
      this.foyer = action
    else
      this.foyer = new foyer();
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