import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { ConfigBranchDetails } from './config-branch-details';

@Component({
  selector: 'mifosx-branch-specific-accounting-config',
  templateUrl: './branch-specific-accounting-config.component.html',
  styleUrls: ['./branch-specific-accounting-config.component.scss']
})
export class BranchSpecificAccountingConfigComponent implements OnInit {
  /**Configured branches */
  configBranchesData : any;

  /**Branch Name */
  branchName : any = [] ;
  cashData: any = [];
  bankData: any = [];

  cb: ConfigBranchDetails;

  displayData: any = [];
  /** Data source for offices table. */
  dataSource: MatTableDataSource<any>;

  /**Column names to display */
  displayedColumns : string[] = ['id', 'cashName', 'bankName'];

  /** Paginator for configuredBranch table. */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  /**
   * Retrieves the configuredBranches data from `resolve`.
   * @param {ActivatedRoute} route Activated Route.
   */
   constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(( data: { office: any, configuredBranches: any, cash: any, bank:any}) => {
      this.configBranchesData = data.configuredBranches;
      this.branchName = data.office;
      this.bankData = data.bank;
      this.cashData = data.cash;
      this.configBranchesData.forEach((each : any ) => {
        this.setData(each.branchId, each.cashglAccountId, each.bankglAccountId)
      this.displayData.push(this.cb);
      });
    });
  }
  ngOnInit(){
    this.setConfiguredBranches();
  }

  setData(branchId : any, cashglAccountId : any, bankglAccountId: any ){
    // var test= this.branchName.find( (x: any) => x.id == branchId))?.name;
      let branch= this.branchName.find( (x: any) => x.id == branchId).name;
      let cash= this.cashData.find( (x: any) => x.id == cashglAccountId).name;
      let bank = this.bankData.find( (x: any) => x.id == bankglAccountId).name;

     this.cb = new ConfigBranchDetails(branchId, branch, cash, bank);
     };

  setConfiguredBranches(){
    this.dataSource = new MatTableDataSource(this.displayData);
    this.dataSource.paginator = this.paginator;
  }
  
}
