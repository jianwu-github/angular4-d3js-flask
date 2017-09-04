import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appTitle = 'Distributed DQN Dashboard';
  currAction = 'Processing Data';
  currActionDetail = 'Processing Training Data';

  selectAction(action: string, detail: string) {
    this.currAction = action;
    this.currActionDetail = detail;
  }
}
