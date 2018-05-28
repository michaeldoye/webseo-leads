import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Leads } from '../../leads/leads.service';

@Component({
  selector: 'app-input-add-tag',
  templateUrl: './input-add-tag.component.html',
  styleUrls: ['./input-add-tag.component.css']
})
export class InputAddTagComponent {

  @Input() currentTags: Array<any>;
  @Output() onAddTag = new EventEmitter< Array<any> >();

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.currentTags.push(value.trim());
    }

    // Emit tags
    this.onAddTag.emit(this.currentTags);

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: any): void {
    let index = this.currentTags.indexOf(tag);

    if (index >= 0) {
      this.currentTags.splice(index, 1);
    }

    // Emit tags
    this.onAddTag.emit(this.currentTags);    
  }

}
