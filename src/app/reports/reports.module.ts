/** Angular Imports */
import { NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';

/** Custom Modules */
import { SharedModule } from '../shared/shared.module';
import { ReportsRoutingModule } from 'app/reports/reports-routing.module';

/** Custom Components */
import { ReportsComponent } from './reports.component';
import { RunReportComponent } from './run-report/run-report.component';
import { TableAndSmsComponent } from './run-report/table-and-sms/table-and-sms.component';
import { ChartComponent } from './run-report/chart/chart.component';
import { PentahoComponent } from './run-report/pentaho/pentaho.component';
import { XBRLComponent } from './xbrl/xbrl.component';
import { XBRLReportComponent } from './xbrl-report/xbrl-report.component';
import { CustomReportsComponent } from './custom-reports/custom-reports.component';
import { DailyCollectionReportComponent } from './custom-reports/daily-collection-report/daily-collection-report.component';
import { NonStartedGroupDailyCollectionComponent } from './custom-reports/non-started-group-daily-collection/non-started-group-daily-collection.component';
import { PsBucketwiseComponent } from './custom-reports/ps-bucketwise/ps-bucketwise.component';
import { NpsBucketwiseComponent } from './custom-reports/nps-bucketwise/nps-bucketwise.component';

/**
 * Reports Module
 *
 * Reports components should be declared here.
 */
@NgModule({
  imports: [
    SharedModule,
    ReportsRoutingModule
  ],
  declarations: [
    ReportsComponent,
    RunReportComponent,
    TableAndSmsComponent,
    ChartComponent,
    PentahoComponent,
    XBRLComponent,
    XBRLReportComponent,
    CustomReportsComponent,
    DailyCollectionReportComponent,
    NonStartedGroupDailyCollectionComponent,
    PsBucketwiseComponent,
    NpsBucketwiseComponent
  ],
  providers: [ DecimalPipe ]
})
export class ReportsModule { }
