import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BoardsService} from "../../../services/boards.service";
import {Board} from "../board/board";

@Component({
  selector: 'board-add-form',
  templateUrl: './board-add-form.component.html',
  styleUrls: ['./board-add-form.component.less', '../../../styles/alert.less']
})
export class BoardAddFormComponent implements OnInit {
  @Input() newBoard: boolean;
  @Output() newBoardChange = new EventEmitter<boolean>();
  titleForm: FormGroup;
  spacesValidation:boolean = false;

  constructor(private boardsService: BoardsService,
              private formBuilder: FormBuilder) {
    this.titleForm = this.formBuilder.group({
      title: ['',
        [Validators.required,
          Validators.maxLength(50)
        ]]
    });
  }

  ngOnInit() {
  }

  createBoard() {

    if ( /\S/.test(this.titleForm.value.title) ) {
      this.spacesValidation = false;
      this.newBoard = false
      this.newBoardChange.emit(false);
      let changeSpaces = this.titleForm.value.title.replace(/\s{2,}/g, ' ');
      let board: Board = {
        id: '',
        date: new Date,
        title: changeSpaces
      }
      this.boardsService.addBoard(board)
    } else {
      this.spacesValidation = true;
      console.log('Spacesss')
    }
  }

  hideBoardTitle() {
    this.newBoard = false;
    this.spacesValidation = false;
    this.newBoardChange.emit(false);
  }

}
