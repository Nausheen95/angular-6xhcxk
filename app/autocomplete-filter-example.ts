import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'autocomplete-filter-example',
  templateUrl: 'autocomplete-filter-example.html',
  styleUrls: ['autocomplete-filter-example.css']
})
export class AutocompleteFilterExample {

  myControl: FormControl = new FormControl();

  options = [
    'One',
    'Two',
    'Three'
  ];

  filteredOptions: Observable<string[]>;
  public invoiceForm: FormGroup;
  constructor(private _fb: FormBuilder) {}
  ngOnInit() {
    const vendorList = ['a', 'b', 'c'];
    this.invoiceForm = this._fb.group({
      Rows: this._fb.array([this.initRows()]),
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  get formArr() {
    return this.invoiceForm.get('Rows') as FormArray;
  }

  initRows() {
    return this._fb.group({
      name: [''],
      myControl:this.myControl
    });
  }

  addNewRow() {
    this.formArr.push(this.initRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */