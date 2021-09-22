import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

/** Custom Components */
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';

/** Custom Services */
import { ClientsService } from '../../clients.service';


@Component({
  selector: 'mifosx-guarantor-tab',
  templateUrl: './guarantor-tab.component.html',
  styleUrls: ['./guarantor-tab.component.scss']
})
export class GuarantorTabComponent implements OnInit {

  guarantorsData : any;
  clientTemplateData : any;

  constructor(private route: ActivatedRoute,
    private clientsService: ClientsService,
    public dialog: MatDialog) { 
      this.route.data.subscribe((data: {guarantors : any, clientTemplate:any})=>{
        this.guarantorsData = data.guarantors;
        this.clientTemplateData = data.clientTemplate
      })
      console.log(this.clientTemplateData);
      
    }

  ngOnInit(): void {
  }

  deleteGuarantor(guarantorId:any,guarantorName: string, index: number ){
    const deleteFamilyMemberDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { deleteContext: `Guarantor name : ${guarantorName} ${index}` }
    });
    deleteFamilyMemberDialogRef.afterClosed().subscribe((response: any) => {
      if (response.delete) {
        this.clientsService.deleteGuarantor(guarantorId)
          .subscribe(() => {
            this.guarantorsData.splice(index, 1);
          });
      }
    });
    
  }
}
