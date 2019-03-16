import {Component, Input, Output, OnInit, OnChanges, EventEmitter} from '@angular/core';
import {State} from '../logic.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {


  constructor() {
    this.id = CellComponent._counter;
    CellComponent._counter += 1;
  }

  ngOnInit() {
  }

  private static _counter: number = 1;

  public id: number;

  @Input() public row: number;

  @Input() public col: number;

  @Input() public cellState: State;

  @Input() public validTurn: boolean;

  @Input() public winningCell: boolean;

  @Output() public stateChangeRequested: EventEmitter<boolean> = new EventEmitter<boolean>();


  public score: number = 0;

  
  public set(): void {
      if (this.cellState === State.None) {
      if (this.validTurn) {
          this.stateChangeRequested.emit(true);
      }
    }
  }
}
