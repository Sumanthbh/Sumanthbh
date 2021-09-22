/** Angular Imports */
import { CollectionViewer, DataSource } from '@angular/cdk/collections';

/** rxjs Imports */
import { Observable, BehaviorSubject } from 'rxjs';

/** Custom Services */
import { ChitGroupsService } from './chitgroups.service';

/**
 * ChitGroups custom data source to implement server side filtering, pagination and sorting.
 */
export class ChitGroupsDataSource implements DataSource<any> {

  /** chitgroups behavior subject to represent loaded chitgroups page. */
  private chitgroupsSubject = new BehaviorSubject<any[]>([]);
  /** Records subject to represent total number of filtered chitgroups records. */
  private recordsSubject = new BehaviorSubject<number>(0);
  /** Records observable which can be subscribed to get the value of total number of filtered chitgroups records. */
  public records$ = this.recordsSubject.asObservable();

  /**
   * @param {ChitGroupsService} chitgroupsService ChitGroups Service
   */
  constructor(private chitgroupsService: ChitGroupsService) { }

  /**
   * Gets chitgroups on the basis of provided parameters and emits the value.
   * @param {any} filterBy Properties by which entries should be filtered.
   * @param {string} orderBy Property by which entries should be sorted.
   * @param {string} sortOrder Sort order: ascending or descending.
   * @param {number} pageIndex Page number.
   * @param {number} limit Number of entries within the page.
   */
  getChitGroups(filterBy: any, orderBy: string = '', sortOrder: string = '', pageIndex: number = 0, limit: number = 10) {
    this.chitgroupsSubject.next([]);
    this.chitgroupsService.getChitGroups(filterBy, orderBy, sortOrder, pageIndex * limit, limit)
      .subscribe((chitgroups: any) => {
        console.log(chitgroups);
        //chitgroups.pageItems = (chitgroupActive) ? (chitgroups.pageItems.filter((chitgroup: any) => chitgroup.active)) : chitgroups.pageItems;
        chitgroups.pageItems = chitgroups.pageItems
        this.recordsSubject.next(chitgroups.totalFilteredRecords);
        this.chitgroupsSubject.next(chitgroups.pageItems);
      });
  }

  /**
   * @param {CollectionViewer} collectionViewer
   */
  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.chitgroupsSubject.asObservable();
  }

  /**
   * @param {CollectionViewer} collectionViewer
   */
  disconnect(collectionViewer: CollectionViewer): void {
    this.chitgroupsSubject.complete();
    this.recordsSubject.complete();
  }

}
