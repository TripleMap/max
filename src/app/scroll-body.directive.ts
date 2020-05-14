import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
    selector: '[appScrollBody]',
})
export class ScrollBodyDirective {
    @Input() appScrollBody: string;
    private ts: number;
    private upDown: boolean = false;
    private scroll: Subject<any> = new Subject();

    @HostListener('touchstart', ['$event']) touchstart(e: TouchEvent) {
        this.ts = e.touches[0].clientY;
    }

    @HostListener('touchmove', ['$event']) touchmove(e: TouchEvent) {
        e.stopPropagation();
        e.preventDefault();
        this.upDown = this.ts > e.changedTouches[0].clientY ? true : false;
        this.scroll.next();
    }

    @HostListener('mousewheel', ['$event'])
    wait(e: any) {
        e.stopPropagation();
        e.preventDefault();
        this.upDown = e.deltaY > 0 ? true : false;
        this.scroll.next();
    }

    @Output() onScroll: EventEmitter<boolean> = new EventEmitter();
    constructor() {}

    public ngOnInit(): void {
        this.scroll.pipe(debounceTime(50)).subscribe((e) => (this.upDown ? this.scrollNext() : this.scrollPrev()));
    }

    public scrollNext(): void {
        this.onScroll.emit(true);
    }

    public scrollPrev(): void {
        this.onScroll.emit(false);
    }
}
