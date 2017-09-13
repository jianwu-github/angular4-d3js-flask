import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appTitle = 'Distributed DQN Dashboard';
  currActionId = 1;
  currAction = 'Processing Data';
  currActionDetail = 'Processing Training Data';

  selectAction(actionId: number, action: string, detail: string) {
    this.currActionId = actionId;
    this.currAction = action;
    this.currActionDetail = detail;
  }

  hasChartComp(): boolean {
    return this.currActionId === 2 || this.currActionId === 3 || this.currActionId === 4;
  }

  drawNNChart(): boolean {
    return this.currActionId === 2;
  }

  drawLineChart(): boolean {
    return this.currActionId === 3;
  }

  drawBarChart(): boolean {
    return this.currActionId === 4;
  }
}
