import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { GenericProfile } from '../../../shared/services/generic-profile/generic-profile';
import { SharedService } from '../../../shared/services/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { AppFilter } from '../../models/filters/filter';
import { FormControl } from '@angular/forms';
import { StateProvider } from '../../providers/state';
import { SuiModalService, ModalSize } from 'ng2-semantic-ui';
import { tap, map, takeUntil } from 'rxjs/operators';
import { Victim } from '../../models/Victim';
import { ConfirmModal } from '../../../shared/container/modals/admin-model';

@Component({
    selector: 'app-nti-dashboard-victim-photos',
    templateUrl: './dashboard-victim-photos.html',
    styleUrls: ['../../admin.less'],
})

export class DashboardVictimDocumentComponent implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();

    victimParams: AppFilter
    public search = new FormControl();

    error: string | null
    message: string
    selected: boolean = true;
    pending: boolean = false
    victimPhotos: any[]
    victimId;
    victimFirst;
    victimLast;
    victimPhone;


    public baseUrl;

    searchFilter = {
        groupOp: "AND",
        rules: [
            {
                field: "FirstName",
                op: "cn",
                data: ""
            },
        ]
    }

    generalProfileStatusPercentage: any = 60;
    generalPhotoStatusPercentage: any = 40;

    constructor(
        private stateProvider: StateProvider,
        private modalService: SuiModalService,
        public roleService: SharedService,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private baseService: SharedService,
    ) {
        this.baseUrl = this.baseService.baseUrl;
        this.activatedRoute.params.pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(params => {
            this.victimId = params['id']
            this.victimFirst = params['firstName']
            this.victimLast = params['lastName']
            this.victimPhone = params['phoneNumber']
            this.getVictimPhotos();
        });
    }

    victim: Victim = {
        firstName: ""
    }

    getVictimPhotos() {
        this.error = null;
        this.pending = true
        this.stateProvider.getDashboardPhotos({ victimId: this.victimId }).pipe(
            map(res => res.Data),
            takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.pending = false
                this.victimPhotos = res
            },
                error => {
                    this.pending = false
                    this.error = error.error.error
                })
    }

    DeleteImage(event)
    {
        if(event != null)
        {
            this.DeletePhoto(event);
        }
    }

    DeletePhoto(event) {
        this.error = null;
        this.pending = true
        this.stateProvider.DeleteAdminPhotos({ victimId: this.victimId, photoTitle:event }).pipe(
            takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.pending = false
                this.successful()
            },
                error => {
                    this.pending = false
                    this.error = error.error.error
                })
    }
    
    successful() {
        const message = 'The victim can now be able to upload a new document.';
        this.modalService
            .open(new ConfirmModal('Document Removed!', message, ModalSize.Tiny))
            .onApprove(() => { this.back('event'); })
            .onDeny(() => { });
    }
    back(event) {
        if (event != null) {
            this.route.navigate(['/admin/dashboard-victim-profile']);
        }
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}

