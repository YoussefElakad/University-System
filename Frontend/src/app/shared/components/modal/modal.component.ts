import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements AfterViewInit {

  @Input() title = '';
  @Input() message = '';

  @Output() confirm = new EventEmitter<void>();

  @ViewChild('modal')
  modalElement!: ElementRef;

  private modal: any;

  ngAfterViewInit(): void {
    this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
  }

  open() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

  onConfirm() {
    this.confirm.emit();
    this.close();
  }
}