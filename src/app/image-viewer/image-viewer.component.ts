import { Component, Input, EventEmitter, Output, HostListener } from '@angular/core';
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
            this.imagePath = `assets/galery/${this.isDesktop ? 'galery-d' : 'galery-m'}/${i}.jpg`;
            window['imageViewer'] = true;
        }
    }
    get imageIndex() {
        return this._imageIndex;
    }

    @Output() close: EventEmitter<void> = new EventEmitter();
    @Output() onNext: EventEmitter<void> = new EventEmitter();
    @Output() onPrev: EventEmitter<void> = new EventEmitter();

    @HostListener('document:keydown', ['$event']) keyPress(e: any) {
        e.stopPropagation();
        e.preventDefault();
        if (!window['imageViewer']) return;
        if (e.keyCode === 39 || e.keyCode === 40) {
            this.onNextClick();
        }
        if (e.keyCode === 37 || e.keyCode === 38) {
            this.onPrevClick();
        }

        if (e.keyCode === 27) {
            this.closeImage();
        }
    }
    constructor(private deviceService: DeviceDetectorService) {
        this.isDesktop = this.deviceService.isDesktop();
    }
    public closeImage() {
        window['imageViewer'] = false;
        this.close.emit();
    }

    public onNextClick() {
        this.onNext.emit();
    }
    public onPrevClick() {
        this.onPrev.emit();
    }
}
