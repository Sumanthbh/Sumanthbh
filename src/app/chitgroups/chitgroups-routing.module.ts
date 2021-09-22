/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Routing Imports */
import { Route } from '../core/route/route.service';

/** Translation Imports */
import { extract } from '../core/i18n/i18n.service';

/** Custom Imports */
import { ChitGroupsComponent } from './chitgroups.component';
import { ChitGroupsViewComponent } from './chitgroups-view/chitgroups-view.component';
// import { GeneralTabComponent } from './chitgroups-view/general-tab/general-tab.component';
// import { NotesTabComponent } from './chitgroups-view/notes-tab/notes-tab.component';
// import { CommitteeTabComponent } from './chitgroups-view/committee-tab/committee-tab.component';
import { CreateChitGroupComponent } from './create-chitgroup/create-chitgroup.component';
// import { DatatableTabsComponent } from './chitgroups-view/datatable-tabs/datatable-tabs.component';
// import { AddRoleComponent } from './chitgroups-view/add-role/add-role.component';
import { ChitGroupActionsComponent } from './chitgroups-view/chitgroup-actions/chitgroup-actions.component';
import { EditChitGroupComponent } from './edit-chitgroup/edit-chitgroup.component';
import {CollectionApprovalComponent} from './collection-approval/collection-approval.component';
/** Custom Resolvers */
// import { ChitGroupViewResolver } from './common-resolvers/chitgroup-view.resolver';
// import { ChitGroupAccountsResolver } from './common-resolvers/chitgroup-account.resolver';
// import { ChitGroupSummaryResolver } from './common-resolvers/chitgroup-summary.resolver';
// import { ChitGroupNotesResolver } from './common-resolvers/chitgroup-notes.resolver';
import { OfficesResolver } from 'app/accounting/common-resolvers/offices.resolver';
import { ChitGroupViewResolver } from './common-resolvers/chitgroup-view.resolver';
import { ChitGroupDocumentResolver } from './common-resolvers/chitgroup-document.resolver';
import { ChitGroupSubscribersResolver } from './common-resolvers/chitgroup-subscribers.resolver';
// import { ChitGroupDatatablesResolver } from './common-resolvers/chitgroup-datatables.resolver';
// import { ChitGroupDatatableResolver } from './common-resolvers/chitgroup-datatable.resolver';
// import { ChitGroupDataAndTemplateResolver } from './common-resolvers/chitgroup-data-and-template.resolver';
import { ChitGroupActionsResolver } from './common-resolvers/chitgroup-actions.resolver';
import { EnterBidsComponent } from './chitgroups-view/chitgroup-actions/enter-bids/enter-bids.component';
import { ChitGroupBidsResolver } from './common-resolvers/chitgroup-bids.resolver';
import { PaymentTypesResolver } from 'app/organization/payment-types/payment-types.resolver';
import { BidderParticipationResolver } from './common-resolvers/chitgroup-bidderparticipation.resolver';
import { bidFillingDueDateResolver } from './common-resolvers/chitgroup-bidfilingduedate.resolver';
import { ApprovalComponent } from './approval/approval.component';
import { AdvanceApprovalComponent } from './advance-approval/advance-approval.component';
import { DemandSheetComponent } from './demand-sheet/demand-sheet.component';
import { CurrenciesResolver } from 'app/accounting/common-resolvers/currencies.resolver';
import { ChargeApprovalComponent } from './charge-approval/charge-approval.component';
import { SummaryTabComponent } from './chitgroups-view/summary-tab/summary-tab.component';
import { SubscribersTabComponent } from './chitgroups-view/subscribers-tab/subscribers-tab.component';
import { ChitGroupSummaryResolver } from './common-resolvers/chitgroup-summary.resolver';
import { OutviewComponent } from './chitgroups-view/outview/outview.component';
import { ChitOutstandingResolver } from './common-resolvers/chitgroup-outstanding.resolver';
import { ChitSubscribersResolver } from './common-resolvers/chit-subscribers.resolver';
import { AdvanceSubscriberComponent } from './advance-subscriber/advance-subscriber.component';
import { OutstandingViewComponent } from './chitgroups-view/outview/outstanding-view/outstanding-view.component';
import { ViewOutstandingResolver } from './common-resolvers/view-outstanding.resolver';
import { ChitProductsResolver } from '../products/chit-products-configuration/chit-products.resolver';


/** ChitGroups Routes */
const routes: Routes = [
  Route.withShell([
    {
      path: 'chitgroups',
      data: { title: extract('Chit Groups'), breadcrumb: 'Chit Groups', routeParamBreadcrumb: false },
      children: [
        {
          path: '',
          component: ChitGroupsComponent,
        },
        {
          path: 'create',
          component: CreateChitGroupComponent,
          data: { title: extract('Create Chit Group'), breadcrumb: 'Create Chit Group', routeParamBreadcrumb: false },
          resolve: {
            offices: OfficesResolver,
            product: ChitProductsResolver
          }
        },
        // {
        //   path: 'collectionApproval',
        //   component: CollectionApprovalComponent,
        //   data: { title: extract('Collection Approval'), breadcrumb: 'Collection Approval', routeParamBreadcrumb: false },
        //   resolve: {
        //     offices: OfficesResolver,
        //     paymentModes: PaymentTypesResolver

        //   }
        // },
        {
          path: 'Approval',
          data: { title: extract('Approval'), breadcrumb: 'Approval', routeParamBreadcrumb: false },
          children: [
            {
              path: '',
              component: ApprovalComponent,
            },
            {
              path: 'collectionApproval',
              component: CollectionApprovalComponent,
              data: { title: extract('Collection Approval'), breadcrumb: 'Collection Approval' },
              resolve: {
                offices: OfficesResolver,
                paymentModes: PaymentTypesResolver
              },
            },
            {
              path: 'advanceApproval',
              component: AdvanceApprovalComponent,
              data: { title: extract('Advance Approval'), breadcrumb: 'Advance Approval'},
              resolve: {
                offices: OfficesResolver,
                paymentModes: PaymentTypesResolver
              }
            },
            {
              path: 'chargeApproval',
              component: ChargeApprovalComponent,
              data: { title: extract('Charge Approval'), breadcrumb: 'Charge Approval'},
              resolve: {
                offices: OfficesResolver,
                paymentModes: PaymentTypesResolver
              }
            }
          ]
        },
        {
          path : 'demand-sheet',
          component : DemandSheetComponent,
          data: { title: extract('Demand Sheet'), breadcrumb: 'Demand Sheet', },
          resolve: {
            offices: OfficesResolver,
            paymentType : PaymentTypesResolver,
            currencies : CurrenciesResolver,
          },
        },
        {
          path: 'award-subscriber',
          component: AdvanceSubscriberComponent,
          data: { title: extract(' Subscriber Payout'), breadcrumb: 'Subscriber Payout'},
          resolve: {
            offices: OfficesResolver,
            paymentModes: PaymentTypesResolver,
          }
        },
        {
          path: ':chitgroupId',
          data: { title: extract('View ChitGroup'),  breadcrumb: 'Chit Dashboard' },
          children: [
            {
              path: '',
              component: ChitGroupsViewComponent,
              resolve: {
                chitgroupViewData: ChitGroupViewResolver,
                filling: bidFillingDueDateResolver
              },
              children: [
                {
                  path: 'summary',
                  component: SummaryTabComponent,
                  data: { title: extract('summary'),  breadcrumb: 'Summary', routeParamBreadcrumb: false },
                  resolve: {
                    summary: ChitGroupSummaryResolver
                  }
                  
                },
                {
                  path: 'subscribers',
                  component: SubscribersTabComponent,
                  data: { title: extract('subscribers'), breadcrumb: 'Subscribers', routeParamBreadcrumb: false},
                  // resolve: {
                  //   subscriberList: ChitSubscribersResolver
                  // }
                  
                },
                {
                  path: 'outview',
                  component: OutviewComponent,
                  data: { title: extract('Outstanding'), breadcrumb: 'Outstanding', routeParamBreadcrumb: false },
                  resolve: {
                    outview: ChitOutstandingResolver,
                  },
                  children: [
                    {
                      path: ':ChitId',
                      component: OutstandingViewComponent,
                    }
                  ]
                },
              ]
            },
            
            {
              path: 'edit',
              component: EditChitGroupComponent,
              data: { title: extract('Edit ChitGroup'), breadcrumb: 'Edit', routeParamBreadcrumb: false },
              resolve: {
                //chitgroupAndTemplateData: ChitGroupDataAndTemplateResolver,
                offices: OfficesResolver,
                chitgroupViewData: ChitGroupViewResolver,
                documents: ChitGroupDocumentResolver
              }
            },
            {
              path: 'actions/:name',
              data: { title: extract('ChitGroup Actions'), routeParamBreadcrumb: 'name' },
              component: ChitGroupActionsComponent,
              resolve: {
                chitgroupActionData: ChitGroupActionsResolver
              }
            },
            {
              path: 'enterbids/:currentcycle',
              component: EnterBidsComponent,
              data: { title: 'Enter Bids', breadcrumb: 'Enter Bids', routeParamBreadcrumb: '' },
              resolve: {
                //chitgroupAndTemplateData: ChitGroupDataAndTemplateResolver,
                chitgroupViewData: ChitGroupViewResolver,
                bids: ChitGroupBidsResolver,
                subscribers: ChitGroupSubscribersResolver,
                bidder: BidderParticipationResolver
              }
            },
          ]
        }
      ]
    }
  ])
];

/**
 * ChitGroups Routing Module
 *
 * Configures the chitgroups routes.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ChitGroupViewResolver,
              ChitGroupActionsResolver,
              ChitGroupDocumentResolver,
              ChitGroupBidsResolver,
              BidderParticipationResolver,
              ChitGroupSubscribersResolver,
              bidFillingDueDateResolver,
              ChitGroupSubscribersResolver,
              ChitGroupSummaryResolver,
              ChitOutstandingResolver,
              ChitSubscribersResolver,
              ViewOutstandingResolver,
              ChitProductsResolver,

  //             ChitGroupAccountsResolver,
  //             ChitGroupSummaryResolver,
  //             ChitGroupNotesResolver,
  //             ChitGroupDatatablesResolver,
  //             ChitGroupDatatableResolver,
  //             ChitGroupDataAndTemplateResolver,
]
})
export class ChitGroupsRoutingModule { }
