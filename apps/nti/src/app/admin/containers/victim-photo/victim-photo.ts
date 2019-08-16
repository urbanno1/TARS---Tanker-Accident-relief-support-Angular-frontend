import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { GenericProfile } from '../../../shared/services/generic-profile/generic-profile';
import { StateProvider } from '../../providers/state';
import { SuiModalService, ModalSize } from 'ng2-semantic-ui';
import { ConfirmModal } from '../../../shared/container/modals/admin-model';
import { SharedService } from '../../../shared/services/shared';
import { Observable } from '../../../../../../../node_modules/rxjs/Observable';
import { ISize } from 'selenium-webdriver';

export interface fileUpload {
    filesName: Array<string>
    files: Array<string>
}

@Component({
    selector: 'app-nti-victim-photo',
    templateUrl: './victim-photo.html',
    styleUrls: ['../../admin.less'],
})

export class VictimPhotoComponent implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();

    loadingScroll = false;
    formSubmitAttempt: boolean;

    victimPhotoForm: FormGroup;
    // Add Registering details
    error: string | null;
    pending: boolean;
    files: string[] = [];
    filesName: string[] = [];
    selectedFile: fileUpload[] = [];
    message
    messageTitle

    victimPhoto: any[];
    victimPhotoRecord: any
    public baseUrl;

    constructor(private fb: FormBuilder,
        private modalService: SuiModalService,
        private route: Router,
        private _genericProfile: GenericProfile,
        private stateProvider: StateProvider,
        private baseService: SharedService) {

        this.victimPhotoForm = this.fb.group({
            fileName: [''],
            file: ['', Validators.required],
        });

        // this._genericProfile.getProfile();
        this.getVictimPhoto();
        this.baseUrl = this.baseService.baseUrl;
        this.filesName = [];
        this.files = [];
    }

    get user(): any {
        return this._genericProfile.user;
    }
    set user(value: any) {
        this._genericProfile.user = value;
    }

    isFieldValid(field: string) {
        return (
            (!this.victimPhotoForm.get(field).valid &&
                this.victimPhotoForm.get(field).touched)
            || (!this.victimPhotoForm.get(field).valid && this.formSubmitAttempt)
        );
    }

    displayFieldCss(field: string) {
        return {
            error: this.isFieldValid(field)
        };
    }

    uploadImageChange(event, name) {
        this.error = null;
        if (event != null && this.files.length + 1 <= 5) {
            const file = event.target.files;
            var fileValid = this.getLastIndexExtension(file);
            if (fileValid) {
                this.error = null;
                for (let i = 0; i < event.target.files.length; i++) {
                    this.filesName.push(name);
                    this.files.push(event.target.files[i]);
                }
                return
            }
            this.error = 'Only the file formats jpg, jpeg, png, gif allowed!';
        } else {
            this.error = 'Only five documents can be uploaded!';
        }
    }

    getLastIndexExtension(event) {
        var fileName = event[0].name;
        var nameSplit = fileName.split('.');
        var splitedNames = nameSplit[nameSplit.length - 1];
        return this.checkExtension(splitedNames);
    }

    checkExtension(event) {
        if (event.length > 0) {
            switch (event) {
                case 'jpg':
                case 'jpeg':
                case 'gif':
                case 'png':
                    return true;
            }
            return false;
        }
    }

    back(event) {
        if (event != null) {
            this.route.navigate(['/admin/dashboard']);
        }
    }

    getVictimPhoto() {
        this.error = null;
        this.pending = true;
        this.stateProvider.getPhoto().pipe(
            takeUntil(this.unsubscribe$))
            .subscribe((res: any) => {
                this.pending = false;
                this.victimPhoto = res.Data;
            },
                error => {
                    this.pending = false;
                    this.error = error.error;
                });
    }


    submit() {
        this.error = null;
        this.pending = true;
        if (this.victimPhotoForm.valid) {
            const formData: FormData = new FormData();
            for (let i = 0; i < this.files.length && this.filesName.length; i++) {
                formData.append("file", this.files[i], this.filesName[i]);

            }
            this.stateProvider.uploadImage({ body: formData }).pipe(
                takeUntil(this.unsubscribe$))
                .subscribe((res: any) => {
                    this.pending = false;
                    this.victimPhotoForm.reset();
                    this.message = 'Ensure your status is 100% completed. Thank you.';
                    this.messageTitle = 'Thanks for updating your proof status!';
                    this.successful();
                },
                    error => {
                        this.pending = false;
                        this.message = error.error;
                        this.messageTitle = 'Confirm image file size!'
                        this.successful();
                        // this.error = error.error;
                    });
        } else {
            this.pending = false;
        }
    }

    successful() {

        this.modalService
            .open(new ConfirmModal(this.messageTitle, this.message, ModalSize.Tiny))
            .onApprove(() => { this.redirect(); })
            .onDeny(() => { });
    }
    redirect() {
        this.route.navigate(['/admin/dashboard']);
    }

    register() {
        this.loadingScroll = true;
        this.route.navigate(['/users']);
    }

    ngOnDestroy() {
    }
}
