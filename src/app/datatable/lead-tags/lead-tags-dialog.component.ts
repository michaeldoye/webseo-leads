import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LeadsService } from '../../leads.service';

@Component({
  selector: 'lead-tags-dialog',
  templateUrl: 'lead-tags-dialog.component.html',
})
export class LeadTagsComponent implements OnInit {

  allTags: Array<any> = ['website', 'seo', 'ppc', 'social', 'have contacted', 'to contact', 'needs info'];
  currentId: number;
  selectedTags: any;

  constructor(
    public dialogRef: MatDialogRef<LeadTagsComponent>,
    private api: LeadsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.currentId = this.data.data.id;
    this.selectedTags = this.data.data.tags.replace(/['"]+/g, '').split(',');
  } 

  addTagToLead(tags: any, id: number) {
    let tag = tags.selectedOptions.selected.map(item => item.value);
    this.api.dbAddTagToLead(tag.toString(), id).subscribe(res => console.log(res));
  }

}