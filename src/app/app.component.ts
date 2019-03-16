import { Component, Directive } from '@angular/core';
import {CellComponent} from './cell/cell.component';
import {LogicService, IRow, ICell, State, GameState} from './logic.service';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'four-in-a-row';
  public rows: IRow[] = [];
  public yourTurn: boolean;

  constructor(private matrix: LogicService) {
    this.rows = matrix.rows;
  }

  ngOnInit(): void {
    this.updateStats();
  }

  private updateStats(): void {
    this.yourTurn = true;    
  }

  public stateChange(cell: ICell) {    
    cell = this.matrix.getEmptyCellByCol(cell.col);       
    cell.state = this.matrix.gameState === GameState.P1Turn ? State.P1 : State.P2;

    this.matrix.changedTurn();
    //check for win 
    if (this.matrix.checkIsWinner(cell.row,cell.col)) {
      cell.winningCell = true; 
      alert('winner');
      this.matrix.gameState = GameState.Won;
    }
  
  }

  public getPlayerName() : String {
    if (this.matrix.gameState === GameState.Won) {
      return "We have a winner!";
    }
    return (this.matrix.gameState === GameState.P1Turn )? 'player 1 turn': 'player 2 turn';
  }

  public reset() {
    this.matrix.reset();
    this.updateStats();
  }
}
