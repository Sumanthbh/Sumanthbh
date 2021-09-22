/** Angular Imports */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * ChitGroup actions component.
 */
@Component({
  selector: 'mifosx-chitgroup-actions',
  templateUrl: './chitgroup-actions.component.html',
  styleUrls: ['./chitgroup-actions.component.scss']
})
export class ChitGroupActionsComponent {

  /** Flag object to store possible actions and render appropriate UI to the user */
  actions: {
    'Close': boolean
    'Activate': boolean
    'Manage Subscribers': boolean
  } = {
    'Close': false,
    'Activate': false,
    'Manage Subscribers': false
  };

  /**
   * @param {ActivatedRoute} route Activated Route
   * @param {Router} router Router
   */
  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const name = this.route.snapshot.params['name'];
    this.actions[name] = true;
  }

}
