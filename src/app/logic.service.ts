import { Injectable } from '@angular/core';
import { CellComponent } from './cell/cell.component';

export enum State {
  None = 0,
  P1 = 1,
  P2 = 2
}

export enum GameState {
  P1Turn = 0,
  P2Turn = 1,
  Won = 2,
  Draw = 3
}

export interface ICell {
  row: number;
  col: number;
  state: State;
  winningCell: boolean;
}

export type IRow = ICell[];

@Injectable({
  providedIn: 'root'
 
})

export class LogicService {

  public rows: IRow[] = [];

  public gameState: GameState;
  public computerTurn: GameState;
  public computerWon: boolean = false;

  public winLines: IRow[] = [];
  private _cells: ICell[] = [];

  constructor() { this.reset(); }

  public reset(): void {
    while (this.rows.pop())
      ;
    while (this._cells.pop())
      ;
    while (this.winLines.pop())
      ;

    this.gameState = GameState.P1Turn;

    for (let row = 0; row < 6; row += 1) {
      let newRow = [];
      this.rows.push(newRow);
      for (let col = 0; col < 7; col += 1) {
        let newCell = {row: row, col: col, state: State.None, winningCell: false};
        newRow.push(newCell);
        this._cells.push(newCell);
      }
    }


  }

  public getEmptyCellByCol(col: number) : ICell {
    for( let row=5; row >= 0; row--) {
      let emptyCell = this.rows[row][col]; 
      if (emptyCell.state === 0) return emptyCell; 
    }
  }
 
  public changedTurn(): void {
    
    if (this.gameState===GameState.P1Turn) {
        this.gameState = GameState.P2Turn
    }
    else {
      this.gameState = GameState.P1Turn;
    }
  }

  private checkHorizontal(row: number, col:number) : boolean {
    //horizontal 
    let indexMin =0; 
    let indexMax = this.rows[row].length-1;
    
    if (col - 3 > 0) {
      indexMin = col-3; 
    }
    if (col + 3 < indexMax) {
      indexMax = col +3;
    }
    let countWin = 0; 
    for (let i=indexMin; i <= indexMax; i++) {
      if (this.rows[row][col].state == this.rows[row][i].state) {
        countWin++;
      }
      else {
        countWin =0 ; 
      }
      if (countWin == 4) return true; 
    }

    return false;
  }

  private checkVertical(row: number, col:number) : boolean {

    let indexMax = this.rows.length-1;
    
    if (row + 3 < indexMax) {
      indexMax = row+3; 
    }
    
    let countWin = 0; 
    for (let i=row+1; i <= indexMax; i++) {
      if (this.rows[row][col].state == this.rows[i][col].state) {
        countWin++;
      }
      else {
        countWin =0 ; 
      }
      if (countWin == 3) return true; 
    }

    return false;
  }
  private checkDiagonal1(row: number, col:number) : boolean {
    let MinRowLeft =-1; 
    let MinColLeft = -1;
    let MaxRowLeft =0; 
    let MaxColLeft =0;
    
    for(let i=0; i<4; i++)
    {
      MinRowLeft = row-i;
      MinColLeft= col-i;
      if (MinRowLeft ==0 || MinColLeft==0)
        break;
        
    }
   
    for(let i=0; i<4; i++)
    {
      MaxRowLeft = row+i;
      MaxColLeft= col+i;
      if (MaxColLeft ==this.rows[row].length-1|| MaxRowLeft==this.rows.length-1)
        break;
    }

    
    //Check first diagonal from left to right
    let countWin = 0; 
    for (let i=MinRowLeft, j=MinColLeft; i <= MaxRowLeft && j<=MaxColLeft; i++, j++) {
      if (this.rows[row][col].state == this.rows[i][j].state) {
        countWin++;
      }
      else {
        countWin =0 ; 
      }
      if (countWin == 4) return true; 
    }
    
    return false;
  }
  private checkDiagonal(row: number, col:number) : boolean {
    let MinRowLeft =-1; 
    let MinColLeft = -1;
    let MaxRowLeft =0; 
    let MaxColLeft =0;
    
    for(let i=0; i<4; i++)
    {
      MinRowLeft = row-i;
      MaxColLeft= col+i;
      if (MinRowLeft ==0 || MaxColLeft==this.rows[row].length-1)
        break;
        
    }
   
    for(let i=0; i<4; i++)
    {
      MaxRowLeft = row+i;
      MinColLeft= col-i;
      if (MaxColLeft ==0|| MaxRowLeft==this.rows.length-1)
        break;
    }

    
    //Check first diagonal from left to right
    let countWin = 0; 
    for (let i=MinRowLeft, j=MaxColLeft; i <= MaxRowLeft && j>=MinColLeft; i++, j--) {
      if (this.rows[row][col].state == this.rows[i][j].state) {
        countWin++;
      }
      else {
        countWin =0 ; 
      }
      if (countWin == 4) return true; 
    }
    
    return false;
  }
  public checkIsWinner(row: number, col:number) : boolean {

    let isWin: boolean = false; 
    return  this.checkHorizontal(row,col) || this.checkVertical(row,col) || this.checkDiagonal1(row,col) || this.checkDiagonal(row,col); 

  }  
}
