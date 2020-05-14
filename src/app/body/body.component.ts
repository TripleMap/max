import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyComponent implements OnInit {
    @Input() onNextSub: Subject<void>;
    @Input() onPrevSub: Subject<void>;
    public isDesktop: boolean = true;

    @Output() onScroll: EventEmitter<boolean> = new EventEmitter();
    @Output() imageIndex: EventEmitter<number> = new EventEmitter();

    constructor(private deviceService: DeviceDetectorService) {
        this.isDesktop = this.deviceService.isDesktop();
    }

    public ngOnInit(): void {}

    public emit(event) {
        this.imageIndex.emit(event);
    }
}
