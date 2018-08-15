import { Component, Input, Inject, AfterContentInit, Output } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";

export enum ModalBoxType  {
    MESSAGE_MODAL,
    CONFIRMATION_MODAL
}

@Component({
    selector: 'modal-box',
    templateUrl: 'modalBox.component.html',
    styleUrls: ['modalBox.component.css']
})
export class ModalBoxComponent implements AfterContentInit {
    @Input() type: ModalBoxType;
    @Input() title: String;
    @Input() message: String;

    public confirmed: boolean;

    private modalBoxCheckResult: boolean;

    constructor(private dialog: MatDialog) {
    }

    ngAfterContentInit() {
        this.modalBoxCheckResult = this.type == ModalBoxType.MESSAGE_MODAL;
    }

    confirmOperation(): void {
        this.confirmed = true;
        this.dialog.closeAll();
    }

    cancelOperation(): void {
        this.confirmed = false;
        this.dialog.closeAll();
    }
}