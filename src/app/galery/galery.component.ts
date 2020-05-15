import {
    Component,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    EventEmitter,
    Output,
    Input,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-galery',
    templateUrl: './galery.component.html',
    styleUrls: ['./galery.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GaleryComponent implements AfterViewInit {
    @Input() onNextSub: Subject<void>;
    @Input() onPrevSub: Subject<void>;

    public imageList: string[] = [];
    public reach: { start: boolean; end: boolean } = {
        start: true,
        end: false,
    };

    @Output() imageIndex: EventEmitter<number> = new EventEmitter();

    constructor(private cdr: ChangeDetectorRef) {}

    public ngAfterViewInit(): void {
        setTimeout(() => {
            const totalImages = 39;
            for (let i = 0; i < totalImages; i++) {
                setTimeout(() => {
                    this.imageList = [...this.imageList, `assets/galery/galery/${i}.jpg`];
                    this.cdr.detectChanges();
                }, 0);
            }
        }, 500);
        this.onNextSub.subscribe((data) => this.showGaleryItem('next'));
        this.onPrevSub.subscribe((data) => this.showGaleryItem('prev'));
    }

    public enableArrow(e: { start: boolean; end: boolean }) {
        this.reach = e;
    }
    private imageI: number = 0;
    public openFullSize(imageIndex): void {
        this.imageI = imageIndex;
        this.imageIndex.emit(imageIndex);
    }

    private showGaleryItem(direction): void {
        if (!direction || this.imageI === undefined) return;
        if (
            (this.imageI > 0 && this.imageI < 38) ||
            (this.imageI === 0 && direction === 'next') ||
            (this.imageI === 38 && direction === 'prev')
        ) {
            direction === 'next' ? this.imageI++ : this.imageI--;
            this.imageIndex.emit(this.imageI);
        }
    }
}
