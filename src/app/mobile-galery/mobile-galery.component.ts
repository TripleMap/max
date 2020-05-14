import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Output,
    EventEmitter,
    Input,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-mobile-galery',
    templateUrl: './mobile-galery.component.html',
    styleUrls: ['./mobile-galery.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileGaleryComponent implements OnInit {
    @Input() onNextSub: Subject<void>;
    @Input() onPrevSub: Subject<void>;
    public imageList: string[] = [];
    @Output() imageIndex: EventEmitter<number> = new EventEmitter();
    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {}
    public ngAfterViewInit(): void {
        setTimeout(() => {
            const totalImages = 38;
            for (let i = 0; i < totalImages; i++) {
                setTimeout(() => {
                    this.imageList = [...this.imageList, `assets/galery/galery/${i + 1}.jpg`];
                    this.cdr.detectChanges();
                }, 16 * i);
            }
        }, 500);
        this.onNextSub.subscribe((data) => this.showGaleryItem('next'));
        this.onPrevSub.subscribe((data) => this.showGaleryItem('prev'));
    }

    private imageI: number = 0;
    public openFullSize(imageIndex): void {
        this.imageI = imageIndex;
        this.imageIndex.emit(imageIndex);
    }

    private showGaleryItem(direction): void {
        if (!direction || this.imageI === undefined) return;
        if (
            (this.imageI > 0 && this.imageI < 34) ||
            (this.imageI === 0 && direction === 'next') ||
            (this.imageI === 34 && direction === 'prev')
        ) {
            direction === 'next' ? this.imageI++ : this.imageI--;
            this.imageIndex.emit(this.imageI);
        }
    }

    private ts: number;
    touchstart(e: TouchEvent) {
        this.ts = e.touches[0].clientY;
    }
    touchmove(e: TouchEvent) {
        const el = document.getElementById('galery-wrapper');
        let needBottom = el.scrollTop >= el.scrollHeight - el.offsetHeight && this.ts > e.changedTouches[0].clientY;
        let needTop = el.scrollTop <= 0 && this.ts < e.changedTouches[0].clientY;
        if (!needBottom && !needTop) {
            e.stopPropagation();
        }
    }
    mousewheel(e: WheelEvent) {
        const el = document.getElementById('galery-wrapper');
        let needBottom = el.scrollTop >= el.scrollHeight - el.offsetHeight && e.deltaY > 0;
        let needTop = el.scrollTop <= 0 && e.deltaY < 0;
        if (!needBottom && !needTop) {
            e.stopPropagation();
        }
    }
}
