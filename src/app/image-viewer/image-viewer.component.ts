import { Component, Input, EventEmitter, Output } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'app-image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent {
    public imagePath: string;
    private _imageIndex: number;
    public isDesktop: boolean = true;

    @Input() set imageIndex(i: number) {
        if (i !== undefined && i !== null) {
            this._imageIndex = i;
            this.imagePath = `assets/galery/${this.isDesktop ? 'desktop-f' : 'mobile-f'}/${i + 1}.jpg`;
        }
    }
    get imageIndex() {
        return this._imageIndex;
    }

    @Output() close: EventEmitter<void> = new EventEmitter();
    @Output() onNext: EventEmitter<void> = new EventEmitter();
    @Output() onPrev: EventEmitter<void> = new EventEmitter();

    constructor(private deviceService: DeviceDetectorService) {
        this.isDesktop = this.deviceService.isDesktop();
    }
    public closeImage() {
        this.close.emit();
    }

    public onNextClick() {
        this.onNext.emit();
    }
    public onPrevClick() {
        this.onPrev.emit();
    }
}
