/** Angular Imports */
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

/** Custom Modules */
import { ChitGroupsRoutingModule } from './chitgroups-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../directives/directives.module';

/** Custom Components */
import { ChitGroupsComponent } from './chitgroups.component';
import { ChitGroupsViewComponent } from './chitgroups-view/chitgroups-view.component';
import { CreateChitGroupComponent } from './create-chitgroup/create-chitgroup.component';
import { EditChitGroupComponent } from './edit-chitgroup/edit-chitgroup.component';
import { ChitGroupActionsComponent } from './chitgroups-view/chitgroup-actions/chitgroup-actions.component';
import { ActivateChitGroupComponent } from './chitgroups-view/chitgroup-actions/activate-group/activate-chitgroup.component';
import { ManageChitGroupMembersComponent } from './chitgroups-view/chitgroup-actions/manage-chitgroup-members/manage-chitgroup-members.component';
import { EnterBidsComponent } from './chitgroups-view/chitgroup-actions/enter-bids/enter-bids.component';
import {CollectionApprovalComponent} from './collection-approval/collection-approval.component';
import { ApprovalComponent } from './approval/approval.component';
import { AdvanceApprovalComponent } from './advance-approval/advance-approval.component';

import { DemandSheetComponent } from './demand-sheet/demand-sheet.component';
import { ChargeApprovalComponent } from './charge-approval/charge-approval.component';
import { SummaryTabComponent } from './chitgroups-view/summary-tab/summary-tab.component'; 
import { SubscribersTabComponent } from './chitgroups-view/subscribers-tab/subscribers-tab.component';
import { OutviewComponent } from './chitgroups-view/outview/outview.component';
import { AdvanceSubscriberComponent } from './advance-subscriber/advance-subscriber.component';
import { OutstandingViewComponent } from './chitgroups-view/outview/outstanding-view/outstanding-view.component';
import { ViewPayoutEntryComponent } from './view-payout-entry/view-payout-entry.component';
// import { GeneralTabComponent } from './chitgroups-view/general-tab/general-tab.component';
// import { NotesTabComponent } from './chitgroups-view/notes-tab/notes-tab.component';
// import { CommitteeTabComponent } from './chitgroups-view/committee-tab/committee-tab.component';
// import { DatatableTabsComponent } from './chitgroups-view/datatable-tabs/datatable-tabs.component';
// import { SingleRowComponent } from './chitgroups-view/datatable-tabs/single-row/single-row.component';
// import { MultiRowComponent } from './chitgroups-view/datatable-tabs/multi-row/multi-row.component';
// import { AddRoleComponent } from './chitgroups-view/add-role/add-role.component';
// import { UnassignRoleDialogComponent } from './chitgroups-view/custom-dialogs/unassign-role-dialog/unassign-role-dialog.component';
// import { ChitGroupAssignStaffComponent } from './chitgroups-view/chitgroup-actions/chitgroup-assign-staff/chitgroup-assign-staff.component';
// import { UnassignStaffDialogComponent } from './chitgroups-view/custom-dialogs/unassign-staff-dialog/unassign-staff-dialog.component';
// import { CloseChitGroupComponent } from './chitgroups-view/chitgroup-actions/close-chitgroup/close-chitgroup.component';
// import { EditChitGroupComponent } from './edit-chitgroup/edit-chitgroup.component';
// import { AttachChitGroupMeetingComponent } from './chitgroups-view/chitgroup-actions/attach-chitgroup-meeting/attach-chitgroup-meeting.component';
// import { ChitGroupAttendanceComponent } from './chitgroups-view/chitgroup-actions/chitgroup-attendance/chitgroup-attendance.component';
// import { ManageChitGroupMembersComponent } from './chitgroups-view/chitgroup-actions/manage-chitgroup-members/manage-chitgroup-members.component';
// import { EditChitGroupMeetingComponent } from './chitgroups-view/chitgroup-actions/edit-chitgroup-meeting/edit-chitgroup-meeting.component';
// import { EditChitGroupMeetingScheduleComponent } from './chitgroups-view/chitgroup-actions/edit-chitgroup-meeting-schedule/edit-chitgroup-meeting-schedule.component';
// import { ChitGroupTransferClientsComponent } from './chitgroups-view/chitgroup-actions/chitgroup-transfer-clients/chitgroup-transfer-clients.component';

/**
 * ChitGroups Module
 *
 * All components related to ChitGroups should be declared here.
 */
@NgModule({
  imports: [
    SharedModule,
    PipesModule,
    DirectivesModule,
    ChitGroupsRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ChitGroupsComponent,
    ChitGroupsViewComponent,
    CreateChitGroupComponent,
    ChitGroupActionsComponent,
    ActivateChitGroupComponent,
    ManageChitGroupMembersComponent,
    EditChitGroupComponent,
    EnterBidsComponent,
    CollectionApprovalComponent,
    ApprovalComponent,
    AdvanceApprovalComponent,
    DemandSheetComponent,
    ChargeApprovalComponent,
    SummaryTabComponent,
    SubscribersTabComponent,
    OutviewComponent,
    AdvanceSubscriberComponent,
    OutstandingViewComponent,
    ViewPayoutEntryComponent,
    
    // GeneralTabComponent,
    // NotesTabComponent,
    // CommitteeTabComponent,
    // DatatableTabsComponent,
    // SingleRowComponent,
    // MultiRowComponent,
    // CloseChitGroupComponent,
  ],
  providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-IN' }]
})
export class ChitGroupsModule { }
