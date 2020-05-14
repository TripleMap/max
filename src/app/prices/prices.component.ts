import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'app-prices',
    templateUrl: './prices.component.html',
    styleUrls: ['./prices.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricesComponent {
    public isDesktop: boolean = true;
    constructor(private deviceService: DeviceDetectorService) {
        this.isDesktop = this.deviceService.isDesktop();
    }

    private ts: number;
    touchstart(e: TouchEvent) {
        this.ts = e.touches[0].clientY;
    }
    touchmove(e: TouchEvent) {
        const el = document.getElementById('prices-mobile-wrapper');
        if (el) {
            let needBottom =
                el.scrollTop === el.scrollHeight - el.offsetHeight && this.ts > e.changedTouches[0].clientY;
            let needTop = el.scrollTop === 0 && this.ts < e.changedTouches[0].clientY;
            if (!needBottom && !needTop) {
                e.stopPropagation();
            }
        }
    }
    mousewheel(e: WheelEvent) {
        const el = document.getElementById('prices-mobile-wrapper');
        if (el) {
            let needBottom = el.scrollTop === el.scrollHeight - el.offsetHeight && e.deltaY > 0;
            let needTop = el.scrollTop === 0 && e.deltaY < 0;
            if (!needBottom && !needTop) {
                e.stopPropagation();
            }
        }
    }
}
