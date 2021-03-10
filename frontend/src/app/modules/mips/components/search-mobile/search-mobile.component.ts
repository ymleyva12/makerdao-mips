import { Component, OnInit, Output, EventEmitter, ViewChild, Input, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-search-mobile',
  templateUrl: './search-mobile.component.html',
  styleUrls: ['./search-mobile.component.scss']
})
export class SearchMobileComponent implements OnInit {

  @Output() send = new EventEmitter();
  @Output() open = new EventEmitter<boolean>();
  timeout: any = null;
  @ViewChild('search') inputSearch;
  showClose = false;
  showInput = false;
  text = '';
  @Input() showListSearch = false;
  @Input() listSearchItems = [];
  @Output() clickSearchItem = new Subject<any>();

  constructor() { }

  onKeySearch(event: any): void {
    this.showClose = this.inputSearch.nativeElement.value === '' ? false : true;
    clearTimeout(this.timeout);
    const $this = this;
    this.timeout = setTimeout(() => {
        $this.onChange(this.inputSearch.nativeElement.value);
    }, 1000);
  }

  onChange(value: string): void {
    this.text = value;
    this.send.emit(value);
  }

  clear(): void {
    this.showClose = false;
    this.inputSearch.nativeElement.value = '';
    this.text = '';
    this.onChange(this.inputSearch.nativeElement.value);
    this.onOpenCloseInput();
  }

  ngOnInit(): void {
  }

  onOpenCloseInput(): void {
    this.showInput = !this.showInput;
    this.open.emit(this.showInput);
  }

  onClickSearchItem(element) {
    this.clickSearchItem.next(element);
  }

  @HostBinding('class.spread')
  get spread() {
    return this.showInput;
  }

}
