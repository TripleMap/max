import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HomeFadeInOut } from './fade';
import { Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

import { gsap, ScrollToPlugin, Quart } from 'gsap/all';
gsap.registerPlugin(ScrollToPlugin);

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    public active: string = 'home';
    private pages: string[] = ['home', 'galery', 'about', 'prices', 'contacts'];

    public imageIndex: number;
    public isDesktop: boolean = true;

    public onNextSub: Subject<void> = new Subject();
    public onPrevSub: Subject<void> = new Subject();

    constructor(private deviceService: DeviceDetectorService, private cdr: ChangeDetectorRef) {
        this.isDesktop = this.deviceService.isDesktop();
    }

    public ngOnInit(): void {
        new HomeFadeInOut().hideCurtain('curtain', 0, 0, 0.8);
    }

    public scrollTo(fragment): void {
        this.active = fragment;
        this.cdr.detectChanges();
        gsap.to(document.getElementById('body'), {
            duration: 0.7,
            scrollTo: `#${fragment}`,
            ease: Quart.easeInOut,
        });
    }

    public onScroll(e: boolean): void {
        e ? this.scrollNext() : this.scrollPrev();
    }

    public scrollNext(): void {
        const i = this.pages.indexOf(this.active);
        if (i === 4) return;
        this.scrollTo(this.pages[i + 1]);
    }
    public scrollPrev(): void {
        const i = this.pages.indexOf(this.active);
        if (i === 0) return;
        this.scrollTo(this.pages[i - 1]);
    }

    public showImageViewer(index) {
        this.imageIndex = index;
    }

    public hideImageViewer() {
        this.imageIndex = undefined;
    }

    public onNext() {
        this.onNextSub.next();
    }

    public onPrev() {
        this.onPrevSub.next();
    }
}
