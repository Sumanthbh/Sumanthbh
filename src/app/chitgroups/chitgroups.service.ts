/** Angular Imports */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

/** rxjs Imports */
import { Observable } from 'rxjs';

/**
 * ChitGroups service.
 */
@Injectable({
    providedIn: 'root'
})
export class ChitGroupsService {

  /**
   * @param {HttpClient} http Http Client to send requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * @param {any} filterBy Properties by which entries should be filtered.
   * @param {string} orderBy Property by which entries should be sorted.
   * @param {string} sortOrder Sort order: ascending or descending.
   * @param {number} offset Page offset.
   * @param {number} limit Number of entries within the page.
   * @returns {Observable<any>} ChitGroups.
   */
  getChitGroups(filterBy: any, orderBy: string, sortOrder: string, offset?: number, limit?: number): Observable<any> {
    let httpParams = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString())
      .set('sortOrder', sortOrder)
      .set('orderBy', orderBy)
      .set('paged', 'true');
    // filterBy: name
    filterBy.forEach(function (filter: any) {
      if (filter.value) {
        httpParams = httpParams.set(filter.type, filter.value);
      }
    });
    return this.http.get('/chitgroup', { params: httpParams });
  }
  getClientsByStaffId(sqlSearch : any, staffId : any){
    let httpParams = new HttpParams()
      .set('paged', 'true')
      .set('status','300')
      .set('sqlSearch', sqlSearch)
      .set('staffId', staffId);
       return this.http.get(`/clients`, { params: httpParams });
  }
  getChitDemandForClient(clientId: string, date: string ){
    let httpParams = new HttpParams()
      .set('clientId', clientId)
      .set('date', date);
        return this.http.get(`/chitdemand`, { params : httpParams});
  }
  addChitDemand(demandSheet : string) : Observable<any>{
    console.log("in service"+ demandSheet)
    return this.http.post('/chitdemand',demandSheet)
  }

  /**
   * @param {string} orderBy Property by which entries should be sorted.
   * @param {string} sortOrder Sort order: ascending or descending.
   * @param {string} name Filter value for chitgroups names.
   * @param {any} officeId? Office Id.
   * @param {any} orphansOnly? Orphans Only.
   * @returns {Observable<any>} ChitGroups.
   */
  getFilteredChitGroups(orderBy: string, sortOrder: string, name: string, officeId?: any, orphansOnly?: any): Observable<any> {
    let httpParams = new HttpParams()
      .set('name', name)
      .set('sortOrder', sortOrder)
      .set('orderBy', orderBy);
    if (officeId) {
      httpParams = httpParams.set('officeId', officeId);
    }
    httpParams = orphansOnly ? httpParams.set('orphansOnly', orphansOnly) : httpParams;
    return this.http.get('/chitgroup', { params: httpParams });
  }

  /**
   * @param {number} officeId Office Id of office to get chitgroups for.
   * @returns {Observable<any>}
   */
  getChitGroupsByOfficeId(officeId: number): Observable<any> {
    let httpParams = new HttpParams()
    .set('officeId', officeId.toString())
    .set('paged', 'true');
    return this.http.get('/chitgroup', { params: httpParams } );
  }

  /**
   * @param {string} chitgroupId ChitGroup Id of chitgroup to get data for.
   * @param {string} template? Is template data required.
   * @returns {Observable<any>} ChitGroup data.
   */
  getChitGroupData(chitgroupId: string, template?: string): Observable<any> {
    let httpParams = new HttpParams().set('associations', 'all');
    httpParams = template ? httpParams.set('template', template) : httpParams;
    return this.http.get(`/chitgroup/${chitgroupId}`, { params: httpParams });
  }

  /**
   * @param {string} chitgroupId ChitGroup Id
   * @param {string} command Command
   * @param {any} data Command payload
   * @returns {Observable<any>}
   */
  executeChitGroupCommand(chitgroupId: string, command: string, data: any): Observable<any> {
    const httpParams = new HttpParams().set('command', command);
    return this.http.post(`/chitgroup/${chitgroupId}`, data, { params: httpParams });
  }

  getAllSubscribersOfChitGroup(chitgroupId: string){
    return this.http.get(`/chitgroup/${chitgroupId}/subscribers`);
  }

  getAllSubscribersPaidAdvances(clientlist: string){
    return this.http.get(`/chitgroup/chitsubscribers/advances?clientlist=${clientlist}`);
  }

  addSubscriber2ChitGroup (chitgroupId: string, clientid: number, chitnumber: number){
    const data = {      
      "clientid": clientid,
      "chitnumber":chitnumber};    
    console.log(data.toString);
    return this.http.post(`/chitgroup/${chitgroupId}/subscribers`, data);
  }

  removeSubscriberOfChitGroup (chitgroupId: string, chitgroupsubscriberid: number){
    return this.http.delete(`/chitgroup/${chitgroupId}/subscribers/${chitgroupsubscriberid}`);
  }

  /**
   * @param {any} formData having ChitGroup to be created.
   * @returns {Observable<any>}
   */
  createChitGroup(formData: any): Observable<any> {
    //console.log(formData);
    return this.http.post('/chitgroup', formData);
  }

  /**
   * @param {any} formData having ChitGroup to be updated.
   * @param {any} chitgroupId ChitGroup Id
   * @returns {Observable<any>}
   */
  updateChitGroup(formData: any, chitgroupId: any): Observable<any> {
    return this.http.put(`/chitgroup/${chitgroupId}`, formData);
  }

  /**
   * @param {string} chitgroupId chitgroup Id
   * @returns {Observable<any>}
   */
  deleteChitGroup(chitgroupId: string): Observable<any> {
    return this.http.delete(`/chitgroup/${chitgroupId}`);
  }
  // Fetch Documents of this Chit Group
  getChitGroupDocuments(chitgroupId: string) {
    return this.http.get(`/chitgroups/${chitgroupId}/documents`);
  }

  getChitGroupSummary(chitgroupId: string) {
    console.log("in service"+chitgroupId);
    return this.http.get(`/chitgroup/dashboard/${chitgroupId}`);
  }

  getBidderParticipation() {
    return this.http.get(`/chitgroup/1/bids/templates/BidderParticipation`);
  }

  getbidfilingduedate(id:string) {
    return this.http.get(`/chitgroup/1/bids/ChitGroupCycle/${id}`);
  }
  // Download individual documents of this chit group
  downloadChitgroupDocument(parentEntityId: string, documentId: string) {
    return this.http.get(`/chitgroups/${parentEntityId}/documents/${documentId}/attachment`, { responseType: 'blob' });
  }

  // Delete individual document of this chit group
  deleteClientDocument(parentEntityId: string, documentId: string) {
    return this.http.delete(`/chitgroups/${parentEntityId}/documents/${documentId}`);
  }
  
  // Get All Bids of the given Chit and Cycle
  getAllBidsOfChitGroupCurCycle(chitgroupId: string, currentCycle: string){
    return this.http.get(`/chitgroup/${chitgroupId}/bids/cycle/${currentCycle}`);
  }
  
  // Save a Bid for Given Chit 
  createBidForChitGroupCycle (chitgroupId: string, currentcycle: string, data: any) {
    return this.http.post(`/chitgroup/${chitgroupId}/bids/cycle/${currentcycle}`, data);
  }

  firstauction(data :any) {
    console.log('in service '+data);
    return this.http.post(`/chitgroup/firstAuctionToCompany/${data}`,null);
  }  

  movetonextcycle(chitgroupId :any) {
    console.log('in service '+chitgroupId);
    return this.http.put(`/chitgroup/movetonextcycle/${chitgroupId}`,null);
  }
  
  closechitcycle(chitgroupId :any, data:any){
    return this.http.put(`/chitgroup/closechitgroup/${chitgroupId}`,data);
  }

  // Delete a Bid for Given Chit
  deleteBidForChitGroup (chitgroupId: string, bidId: string) {
    return this.http.delete(`/chitgroup/${chitgroupId}/bids/${bidId}`);
  }

  // Update a Bid values 
  updateBidForChitGroup (chitgroupId: string, bidId: string, data: any) {
    return this.http.put(`/chitgroup/${chitgroupId}/bids/${bidId}`, data);
  }
  
  // Get All Accounting GL entires for dropdowns in Chit Accounting Configuration
  getAllAccountingGLListForDropDown(){
    return this.http.get(`/chitgroup/acccountingtemplate`);
  }

  // Get Accounting GL entires for Chit Accounting Configuration
  getAllChitToAccountingGLMapping(){
    return this.http.get(`/chitgroup/glaccount`);
  }

  // Create Accounting GL entries mapping
  createChitToAccountingGLMapping(data: any){
    return this.http.post(`/chitgroup/glaccount`, data);
  }

  // Update Accounting GL entries mapping
  updateChitToAccountingGLMapping(data: any){
    return this.http.put(`/chitgroup/glaccount`, data);
  }

  /**
   * @param {number} id Office Id of office to get staff for.
   * @returns {Observable<any>} Staff Data for chitgroup.
   */
  getStaff(id: number): Observable<any> {
    const httpParams = new HttpParams()
        .set('officeId', id.toString());
    return this.http.get('/staff', { params: httpParams });
  }

  // get Collections of Agent
  getCollectionbyAgent (agentId: number, date: string) {
    const httpParams = new HttpParams().set('date', date);
    return this.http.get(`/chitsubscriptionTransaction/agentcollections/${agentId}`, { params: httpParams });
  }

  // get advance of client 
  getAdvancebyClient (agentId: number, date: string) {
    const httpParams = new HttpParams().set('date', date);
    return this.http.get(`/clients/0/transactions/getclientTransactionsforapproval/${agentId}`, { params: httpParams });
  }

  //get Charge by Client
  getChargebyClient (agentId: number, date: string){
    const httpParams = new HttpParams().set('date', date);
    return this.http.get(`/chitsubscriptionTransaction/agentcollectionsforcharges/${agentId}`, { params: httpParams});
  }
  
  // call collection processing. 
  processCollection (data: any){
    return this.http.post(`/chitsubscriptionTransaction/collectionprocessing`, data);
  }

  // call advance processing. 
  processAdvance (data: any){
    return this.http.put(`/clients/0/transactions/bulkapproval`, data);
  }

  //call charge processing.
  processCharge (data: any){
    return this.http.post(`/chitsubscriptionTransaction/collectionprocessing`, data);
  }

  getbidderwon(chitgroupId :number, currentcycle: number) {
    // console.log('in service '+chitgroupId);
    return this.http.get(`/chitgroup/${chitgroupId}/bids/cycle/${currentcycle}/winner`);
    
  }

  getOutstanding(chitgroupId :any) {
    return this.http.get(`/chitgroup/getactivesubs/${chitgroupId}`);  
  }

  getPayOutClient(chitgroupId :any) {
    return this.http.get(`/chitgroup/winnerspayable/${chitgroupId}`);  
  }

  getViewOutstanding(chitgroupId :any) {
    return this.http.get(`/chitgroup/getactivesubs/${chitgroupId}`);  
  }

  getChitSubscriberList(chitgroupId: any){
    return this.http.get(`/chitgroup/`);
  }

  postPayout( SubscriberId:any, bidId: any, transactionDate: any, SubscriptionPayable: any, accId:any, paymentinfo:any){
    let httpParams = new HttpParams()
    .set('bidId', bidId)
    .set('date', transactionDate) 
    .set('SubscriptionPayable', SubscriptionPayable)
    .set('accId',accId);
    console.log(bidId);
    console.log(SubscriptionPayable);
    console.log(accId);
    return this.http.post(`/chitgroup/winnerspayable/${SubscriberId}`, paymentinfo, { params: httpParams } );
  }

  allotPrize(chitGroupId: any, currentCycle: any,allotPrize : any):Observable<any>{
    return this.http.post(`/chitgroup/${chitGroupId}/prizeCalculations/${currentCycle}`, allotPrize)
  }
  // getPayOutChitGroupList(officeId: string){
  //   const httpParams = new HttpParams().set('officeId', officeId);
  //   return this.http.get(`/chitgroup`);
  // }
}
